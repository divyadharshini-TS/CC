import { useLocation, Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const Confirmation = () => {
  const location = useLocation();
  const type = location.state?.type; // 'patient' or 'volunteer'

  return (
    <div className="max-w-md mx-auto text-center mt-16 animate-fade-in">
      <div className="card p-10 flex flex-col items-center">
        <CheckCircle className="w-20 h-20 text-brand-green mb-6" />
        <h2 className="text-3xl font-bold mb-4">Request Successful!</h2>
        {type === 'volunteer' ? (
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Thank you for registering as a volunteer. Our team will review your profile and contact you soon.
          </p>
        ) : (
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Your support request has been submitted. We are processing it and will reach out to you shortly.
          </p>
        )}
        <Link to="/" className="btn-primary">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default Confirmation;
