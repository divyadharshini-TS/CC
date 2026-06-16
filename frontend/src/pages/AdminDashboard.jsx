import { useState, useEffect } from 'react';
import API from '../api';
import { Users, Activity, HeartPulse, Search, UserPlus, CheckCircle, X } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ totalPatients: 0, totalVolunteers: 0, highPriorityRequests: 0 });
  const [patients, setPatients] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterPriority, setFilterPriority] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  // Assignment modal state
  const [assignModal, setAssignModal] = useState({ open: false, patient: null });
  const [assigning, setAssigning] = useState(false);
  const [toast, setToast] = useState(null);

  const fetchData = async () => {
    try {
      const [statsRes, patientsRes, volRes] = await Promise.all([
        API.get('/api/dashboard/stats'),
        API.get('/api/patients'),
        API.get('/api/volunteers')
      ]);
      setStats(statsRes.data);
      setPatients(patientsRes.data);
      setVolunteers(volRes.data);
    } catch (error) {
      console.error("Failed to fetch dashboard data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleAssign = async (volunteerId) => {
    setAssigning(true);
    try {
      const res = await API.post(`/api/patients/${assignModal.patient._id}/assign`, { volunteerId });
      showToast(res.data.message);
      setAssignModal({ open: false, patient: null });
      fetchData(); // refresh data
    } catch (err) {
      showToast(err.response?.data?.error || 'Assignment failed', 'error');
    } finally {
      setAssigning(false);
    }
  };

  const getPriorityBadge = (priority) => {
    switch(priority) {
      case 'HIGH': return <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold">HIGH</span>;
      case 'MEDIUM': return <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold">MEDIUM</span>;
      default: return <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">LOW</span>;
    }
  };

  const getStatusBadge = (status) => {
    if (status === 'assigned') return <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">Assigned</span>;
    if (status === 'completed') return <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">Completed</span>;
    return <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-bold">Pending</span>;
  };

  const filteredPatients = patients.filter(p => {
    const matchesPriority = filterPriority === 'ALL' || p.priority === filterPriority;
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.medicalConcern.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesPriority && matchesSearch;
  });

  if (loading) {
    return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-blue"></div></div>;
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-20 right-6 z-50 px-6 py-3 rounded-lg shadow-lg text-white text-sm font-medium transition-all ${toast.type === 'error' ? 'bg-red-500' : 'bg-green-500'}`}>
          {toast.message}
        </div>
      )}

      {/* Assign Volunteer Modal */}
      {assignModal.open && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center p-5 border-b dark:border-gray-700">
              <h3 className="text-lg font-bold">Assign Volunteer</h3>
              <button onClick={() => setAssignModal({ open: false, patient: null })} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5">
              <p className="text-sm text-gray-500 mb-4">
                Assign a volunteer to <strong>{assignModal.patient?.name}</strong> ({assignModal.patient?.medicalConcern})
              </p>
              {volunteers.length === 0 ? (
                <p className="text-gray-400 text-center py-6">No volunteers registered yet.</p>
              ) : (
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {volunteers.map(v => (
                    <button 
                      key={v._id} 
                      onClick={() => handleAssign(v._id)}
                      disabled={assigning}
                      className="w-full flex items-center justify-between p-3 rounded-lg border dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors text-left"
                    >
                      <div>
                        <p className="font-medium text-sm">{v.name}</p>
                        <p className="text-xs text-gray-500">{v.skills} • {v.city}</p>
                      </div>
                      <UserPlus className="w-4 h-4 text-brand-blue" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="card flex items-center p-6 border-l-4 border-blue-500">
          <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
            <HeartPulse className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-semibold uppercase">Total Patients</p>
            <p className="text-3xl font-bold">{stats.totalPatients}</p>
          </div>
        </div>
        <div className="card flex items-center p-6 border-l-4 border-green-500">
          <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
            <Users className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-semibold uppercase">Total Volunteers</p>
            <p className="text-3xl font-bold">{stats.totalVolunteers}</p>
          </div>
        </div>
        <div className="card flex items-center p-6 border-l-4 border-red-500">
          <div className="p-3 rounded-full bg-red-100 text-red-600 mr-4">
            <Activity className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-semibold uppercase">High Priority</p>
            <p className="text-3xl font-bold">{stats.highPriorityRequests}</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Patient Requests</h2>
            <div className="flex space-x-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-1 border rounded-lg text-sm dark:bg-gray-700 dark:border-gray-600 outline-none"
                />
              </div>
              <select 
                value={filterPriority} 
                onChange={(e) => setFilterPriority(e.target.value)}
                className="border rounded-lg text-sm px-2 py-1 dark:bg-gray-700 dark:border-gray-600 outline-none"
              >
                <option value="ALL">All Priorities</option>
                <option value="HIGH">High</option>
                <option value="MEDIUM">Medium</option>
                <option value="LOW">Low</option>
              </select>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                <tr>
                  <th className="px-3 py-3 rounded-tl-lg">Name</th>
                  <th className="px-3 py-3">Concern</th>
                  <th className="px-3 py-3">Priority</th>
                  <th className="px-3 py-3">Status</th>
                  <th className="px-3 py-3 rounded-tr-lg">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {filteredPatients.length === 0 ? (
                  <tr><td colSpan="5" className="text-center py-4 text-gray-500">No patients found</td></tr>
                ) : filteredPatients.map(p => (
                  <tr key={p._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="px-3 py-3 font-medium">{p.name}</td>
                    <td className="px-3 py-3">{p.medicalConcern}</td>
                    <td className="px-3 py-3">{getPriorityBadge(p.priority)}</td>
                    <td className="px-3 py-3">{getStatusBadge(p.status)}</td>
                    <td className="px-3 py-3">
                      {p.status === 'assigned' ? (
                        <span className="flex items-center gap-1 text-green-600 text-xs font-medium">
                          <CheckCircle className="w-4 h-4" /> Assigned
                        </span>
                      ) : (
                        <button
                          onClick={() => setAssignModal({ open: true, patient: p })}
                          className="flex items-center gap-1 text-xs font-medium text-brand-blue hover:underline"
                        >
                          <UserPlus className="w-4 h-4" /> Assign
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold mb-6">Registered Volunteers</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                <tr>
                  <th className="px-4 py-3 rounded-tl-lg">Name</th>
                  <th className="px-4 py-3">Skills</th>
                  <th className="px-4 py-3 rounded-tr-lg">City</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {volunteers.length === 0 ? (
                  <tr><td colSpan="3" className="text-center py-4 text-gray-500">No volunteers found</td></tr>
                ) : volunteers.map(v => (
                  <tr key={v._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="px-4 py-3 font-medium">{v.name}</td>
                    <td className="px-4 py-3">{v.skills}</td>
                    <td className="px-4 py-3">{v.city}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
