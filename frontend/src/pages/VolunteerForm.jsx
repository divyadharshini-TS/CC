import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import { Loader2 } from 'lucide-react';

const VolunteerForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', city: '', skills: '', availability: ''
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
      await API.post('/api/volunteers', formData);
      navigate('/confirmation', { state: { type: 'volunteer' } });
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="card">
        <h2 className="text-3xl font-bold text-center mb-2">Become a Volunteer</h2>
        <p className="text-center text-gray-500 mb-8">Join our network and make a difference.</p>
        
        {error && <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-6">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Full Name *</label>
            <input type="text" name="name" required value={formData.name} onChange={handleChange} className="input-field" placeholder="Jane Doe" />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Email *</label>
              <input type="email" name="email" required value={formData.email} onChange={handleChange} className="input-field" placeholder="jane@example.com" />
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
            <label className="block text-sm font-medium mb-2">Skills *</label>
            <input type="text" name="skills" required value={formData.skills} onChange={handleChange} className="input-field" placeholder="Medical, Driving, Counseling, etc." />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Availability *</label>
            <select name="availability" required value={formData.availability} onChange={handleChange} className="input-field">
              <option value="">Select Availability</option>
              <option value="Weekdays">Weekdays</option>
              <option value="Weekends">Weekends</option>
              <option value="Evenings">Evenings</option>
              <option value="Anytime">Anytime</option>
            </select>
          </div>

          <button type="submit" disabled={loading} className="btn-secondary w-full py-3 text-lg flex justify-center items-center">
            {loading ? <Loader2 className="animate-spin h-6 w-6" /> : "Register as Volunteer"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VolunteerForm;
