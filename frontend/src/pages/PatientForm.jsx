import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import { Loader2 } from 'lucide-react';

const PatientForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '', age: '', gender: '', email: '', phone: '',
    city: '', medicalConcern: '', supportNeeded: '', notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await API.post('/api/patients', formData);
      navigate('/confirmation', { state: { type: 'patient' } });
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <div className="card">
        <h2 className="text-3xl font-bold text-center mb-2">Request Support</h2>
        <p className="text-center text-gray-500 mb-8">Fill out this form and our team will get back to you shortly.</p>
        
        {error && <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-6">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Full Name *</label>
              <input type="text" name="name" required value={formData.name} onChange={handleChange} className="input-field" placeholder="John Doe" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Age *</label>
                <input type="number" name="age" required min="1" max="120" value={formData.age} onChange={handleChange} className="input-field" placeholder="30" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Gender *</label>
                <select name="gender" required value={formData.gender} onChange={handleChange} className="input-field">
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Email *</label>
              <input type="email" name="email" required value={formData.email} onChange={handleChange} className="input-field" placeholder="john@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Phone Number *</label>
              <input type="tel" name="phone" required pattern="[0-9]{10,15}" value={formData.phone} onChange={handleChange} className="input-field" placeholder="1234567890" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">City *</label>
            <input type="text" name="city" required value={formData.city} onChange={handleChange} className="input-field" placeholder="New York" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Medical Concern *</label>
            <input type="text" name="medicalConcern" required value={formData.medicalConcern} onChange={handleChange} className="input-field" placeholder="e.g., Diabetes, Heart Condition" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Support Needed *</label>
            <select name="supportNeeded" required value={formData.supportNeeded} onChange={handleChange} className="input-field">
              <option value="">Select Support Type</option>
              <option value="Consultation">Consultation</option>
              <option value="Medication">Medication</option>
              <option value="Transport">Transport</option>
              <option value="Financial">Financial</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Additional Notes</label>
            <textarea name="notes" rows="4" value={formData.notes} onChange={handleChange} className="input-field" placeholder="Any other details..."></textarea>
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full py-3 text-lg flex justify-center items-center">
            {loading ? <Loader2 className="animate-spin h-6 w-6" /> : "Request Support"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PatientForm;
