import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, AlertCircle } from 'lucide-react';
import useStore from '../store';
import Button from '../components/Button';

const Login: React.FC = () => {
  const [savedCareers, setSavedCareers] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const setPlayerInfo = useStore((state) => state.setPlayerInfo);

  useEffect(() => {
    // Load saved careers from localStorage
    const careers = localStorage.getItem('savedCareers');
    if (careers) {
      setSavedCareers(JSON.parse(careers));
    }
  }, []);

  const handleLoadCareer = (career: any) => {
    try {
      setPlayerInfo(career);
      navigate('/dashboard');
    } catch (error) {
      setError('Failed to load career data');
    }
  };

  if (savedCareers.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">No Saved Careers</h2>
            <p className="mt-2 text-gray-600">You don't have any saved careers yet.</p>
          </div>

          <div className="mt-8">
            <Link
              to="/new-career"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Create New Career
            </Link>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="mx-auto h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center"
          >
            <User className="h-6 w-6 text-blue-600" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-center text-3xl font-extrabold text-gray-900"
          >
            Load Career
          </motion.h2>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border-l-4 border-red-500 p-4 rounded"
          >
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </motion.div>
        )}

        <div className="mt-8 space-y-4">
          {savedCareers.map((career, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleLoadCareer(career)}
              className="w-full p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <h3 className="font-semibold text-gray-900">{career.name}</h3>
              <p className="text-sm text-gray-600">
                {career.position} • Overall: {career.overallRating}
              </p>
              <p className="text-xs text-gray-500">
                Created: {new Date(career.createdAt).toLocaleDateString()}
              </p>
            </motion.button>
          ))}
        </div>

        <div className="mt-6">
          <Link
            to="/new-career"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Create New Career
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;