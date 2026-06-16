import { Link } from 'react-router-dom';
import { Heart, Sun, Moon } from 'lucide-react';

const Navbar = ({ darkMode, setDarkMode }) => {
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-100 dark:border-gray-700 sticky top-0 z-50 transition-colors duration-300">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 text-brand-blue dark:text-blue-400">
          <Heart className="h-8 w-8 fill-current" />
          <span className="text-2xl font-bold tracking-tight">CareConnect</span>
        </Link>
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-brand-blue dark:hover:text-blue-400 font-medium transition-colors">Home</Link>
          <Link to="/support" className="text-gray-600 dark:text-gray-300 hover:text-brand-blue dark:hover:text-blue-400 font-medium transition-colors">Support</Link>
          <Link to="/volunteer" className="text-gray-600 dark:text-gray-300 hover:text-brand-blue dark:hover:text-blue-400 font-medium transition-colors">Volunteers</Link>
          <Link to="/dashboard" className="text-gray-600 dark:text-gray-300 hover:text-brand-blue dark:hover:text-blue-400 font-medium transition-colors">Dashboard</Link>
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <Link to="/support" className="btn-primary">
            Request Support
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
