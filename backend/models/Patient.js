const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  city: { type: String, required: true },
  medicalConcern: { type: String, required: true },
  supportNeeded: { type: String, required: true },
  notes: { type: String },
  summary: { type: String },
  priority: { type: String, enum: ['HIGH', 'MEDIUM', 'LOW'], default: 'LOW' },
  status: { type: String, enum: ['pending', 'assigned', 'completed'], default: 'pending' },
  assignedVolunteer: { type: mongoose.Schema.Types.ObjectId, ref: 'Volunteer', default: null },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Patient', patientSchema);
