const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const Patient = require('./models/Patient');
const Volunteer = require('./models/Volunteer');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/careconnect')
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB connection error:", err.message));

// AI Simulation Functions
const detectPriority = (concern) => {
  const text = concern.toLowerCase();
  if (/(heart|stroke|emergency|accident|critical)/i.test(text)) {
    return 'HIGH';
  } else if (/(diabetes|asthma|blood pressure)/i.test(text)) {
    return 'MEDIUM';
  }
  return 'LOW';
};

const generateSummary = (name, city, supportNeeded, concern) => {
  return `${name} from ${city} requires ${supportNeeded.toLowerCase()} support regarding ${concern.toLowerCase()}.`;
};

// Routes
app.post('/api/patients', async (req, res) => {
  try {
    const { name, age, gender, email, phone, city, medicalConcern, supportNeeded, notes } = req.body;
    
    const priority = detectPriority(medicalConcern + " " + notes);
    const summary = generateSummary(name, city, supportNeeded, medicalConcern);

    const newPatient = new Patient({
      name, age, gender, email, phone, city, medicalConcern, supportNeeded, notes,
      priority, summary
    });

    await newPatient.save();
    res.status(201).json({ message: "Patient request created", patient: newPatient });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/patients', async (req, res) => {
  try {
    const patients = await Patient.find().sort({ createdAt: -1 });
    res.json(patients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/patients/:id', async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ message: "Patient not found" });
    res.json(patient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/volunteers', async (req, res) => {
  try {
    const newVolunteer = new Volunteer(req.body);
    await newVolunteer.save();
    res.status(201).json({ message: "Volunteer registered", volunteer: newVolunteer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/volunteers', async (req, res) => {
  try {
    const volunteers = await Volunteer.find().sort({ createdAt: -1 });
    res.json(volunteers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Assign a volunteer to a patient and send email notification
app.post('/api/patients/:id/assign', async (req, res) => {
  try {
    const { volunteerId } = req.body;
    const patient = await Patient.findById(req.params.id);
    const volunteer = await Volunteer.findById(volunteerId);

    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    if (!volunteer) return res.status(404).json({ message: 'Volunteer not found' });

    patient.assignedVolunteer = volunteer._id;
    patient.status = 'assigned';
    await patient.save();

    // Send email notification to volunteer
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.ethereal.email',
        port: process.env.SMTP_PORT || 587,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: '"CareConnect" <noreply@careconnect.org>',
        to: volunteer.email,
        subject: `New Assignment: ${patient.name} needs ${patient.supportNeeded} support`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:20px;">
            <h2 style="color:#2563EB;">CareConnect - New Assignment</h2>
            <p>Hello <strong>${volunteer.name}</strong>,</p>
            <p>You have been assigned to a new patient request:</p>
            <table style="width:100%;border-collapse:collapse;margin:16px 0;">
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Patient</td><td style="padding:8px;border:1px solid #ddd;">${patient.name}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">City</td><td style="padding:8px;border:1px solid #ddd;">${patient.city}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Concern</td><td style="padding:8px;border:1px solid #ddd;">${patient.medicalConcern}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Support Needed</td><td style="padding:8px;border:1px solid #ddd;">${patient.supportNeeded}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Priority</td><td style="padding:8px;border:1px solid #ddd;color:${patient.priority === 'HIGH' ? 'red' : patient.priority === 'MEDIUM' ? 'orange' : 'green'};font-weight:bold;">${patient.priority}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Summary</td><td style="padding:8px;border:1px solid #ddd;">${patient.summary}</td></tr>
            </table>
            <p>Please reach out to the patient at your earliest convenience.</p>
            <p style="color:#888;font-size:12px;">— CareConnect NGO</p>
          </div>
        `,
      });
      console.log(`Email notification sent to ${volunteer.email}`);
    } catch (emailErr) {
      console.log('Email sending failed (non-critical):', emailErr.message);
    }

    res.json({ message: `Volunteer ${volunteer.name} assigned to patient ${patient.name}`, patient });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/dashboard/stats', async (req, res) => {
  try {
    const totalPatients = await Patient.countDocuments();
    const totalVolunteers = await Volunteer.countDocuments();
    const highPriorityRequests = await Patient.countDocuments({ priority: 'HIGH' });

    res.json({ totalPatients, totalVolunteers, highPriorityRequests });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
