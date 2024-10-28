import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, AlertCircle } from 'lucide-react';
import useStore from '../store';
import Button from '../components/Button';

const SignUp: React.FC = () => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const setPlayerInfo = useStore((state) => state.setPlayerInfo);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      setError('Please enter a username');
      return;
    }

    setLoading(true);
    try {
      // Create a new player profile
      const newPlayer = {
        username,
        xp: 1000,
        fanBase: 12000,
        bankBalance: 50000,
        completedGames: [],
        attributes: {},
        badges: {},
        createdAt: new Date().toISOString()
      };

      setPlayerInfo(newPlayer);
      navigate('/create-player');
    } catch (error) {
      setError('An error occurred during sign up');
    } finally {
      setLoading(false);
    }
  };

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
            Create Your Career
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

        <form className="mt-8 space-y-6" onSubmit={handleSignUp}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            fullWidth
            loading={loading}
            disabled={loading}
          >
            {loading ? 'Creating Career...' : 'Create Career'}
          </Button>
        </form>

        <div className="text-sm text-center">
          <p className="text-gray-600">
            Already have a career?{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Continue Career
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default SignUp;