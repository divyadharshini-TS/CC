import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import FaqChatbot from './components/FaqChatbot';
import Home from './pages/Home';
import PatientForm from './pages/PatientForm';
import VolunteerForm from './pages/VolunteerForm';
import Confirmation from './pages/Confirmation';
import AdminDashboard from './pages/AdminDashboard';
import { useState, useEffect } from 'react';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <Router>
      <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/support" element={<PatientForm />} />
            <Route path="/volunteer" element={<VolunteerForm />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path="/dashboard" element={<AdminDashboard />} />
          </Routes>
        </main>
        <FaqChatbot />
      </div>
    </Router>
  );
}

export default App;
