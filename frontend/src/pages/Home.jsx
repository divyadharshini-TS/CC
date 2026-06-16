import { Link } from 'react-router-dom';
import { HeartPulse, Users, Bot, Zap } from 'lucide-react';

const Home = () => {
  return (
    <div className="space-y-16 py-8 animate-fade-in">
      {/* Hero Section */}
      <section className="text-center max-w-4xl mx-auto space-y-6">
        <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
          Connecting Patients With <span className="text-brand-blue">Support</span> Faster
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Helping NGOs manage healthcare requests efficiently through smart prioritization and volunteer matching.
        </p>
        <div className="flex justify-center gap-4 pt-4">
          <Link to="/support" className="btn-primary text-lg px-8 py-3">
            Request Support
          </Link>
          <Link to="/volunteer" className="btn-secondary text-lg px-8 py-3 bg-white text-brand-blue border border-brand-blue hover:bg-blue-50 dark:bg-gray-800 dark:hover:bg-gray-700">
            Become Volunteer
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-4 gap-6">
        <div className="card text-center space-y-4">
          <div className="mx-auto w-12 h-12 bg-blue-100 dark:bg-blue-900 text-brand-blue dark:text-blue-300 rounded-full flex items-center justify-center">
            <HeartPulse className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-semibold">Patient Assistance</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Direct support requests for those in medical need.</p>
        </div>
        <div className="card text-center space-y-4">
          <div className="mx-auto w-12 h-12 bg-green-100 dark:bg-green-900 text-brand-green dark:text-green-300 rounded-full flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-semibold">Volunteer Network</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Connect with skilled volunteers ready to help.</p>
        </div>
        <div className="card text-center space-y-4">
          <div className="mx-auto w-12 h-12 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 rounded-full flex items-center justify-center">
            <Bot className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-semibold">AI FAQ Assistant</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Instant answers to common queries 24/7.</p>
        </div>
        <div className="card text-center space-y-4">
          <div className="mx-auto w-12 h-12 bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-300 rounded-full flex items-center justify-center">
            <Zap className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-semibold">Smart Priority</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Automated triaging ensures critical cases get handled first.</p>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 dark:border-gray-700">
        <h2 className="text-3xl font-bold text-center mb-10">How It Works</h2>
        <div className="grid md:grid-cols-4 gap-8 relative">
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 dark:bg-gray-700 -z-10"></div>
          
          {[
            { step: 1, title: 'Submit Request', desc: 'Patient fills out the form' },
            { step: 2, title: 'AI Summary', desc: 'System processes data' },
            { step: 3, title: 'NGO Review', desc: 'Dashboard triaging' },
            { step: 4, title: 'Assignment', desc: 'Volunteer matched' },
          ].map((item) => (
            <div key={item.step} className="flex flex-col items-center text-center space-y-3 bg-white dark:bg-gray-800">
              <div className="w-10 h-10 rounded-full bg-brand-blue text-white flex items-center justify-center font-bold text-lg ring-4 ring-white dark:ring-gray-800">
                {item.step}
              </div>
              <h4 className="font-semibold text-lg">{item.title}</h4>
              <p className="text-gray-500 dark:text-gray-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-700 pt-8 mt-16 flex flex-col md:flex-row justify-between items-center text-gray-500 dark:text-gray-400 text-sm">
        <p>&copy; 2026 CareConnect NGO Mission. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <Link to="#" className="hover:text-brand-blue">About</Link>
          <Link to="#" className="hover:text-brand-blue">Contact</Link>
          <Link to="#" className="hover:text-brand-blue">Privacy Policy</Link>
        </div>
      </footer>
    </div>
  );
};

export default Home;
