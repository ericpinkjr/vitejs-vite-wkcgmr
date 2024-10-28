import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Activity, BarChart2, Award, Users, Zap, CheckCircle, DollarSign, TrendingUp } from 'lucide-react';

const LandingPage: React.FC = () => {
  const features = [
    {
      icon: <BarChart2 className="w-6 h-6 text-blue-500" />,
      title: 'Career Stats Tracking',
      description: 'Track your progress with detailed statistics and performance metrics'
    },
    {
      icon: <Award className="w-6 h-6 text-purple-500" />,
      title: 'Badge Progress',
      description: 'Monitor and upgrade your player badges as you improve'
    },
    {
      icon: <DollarSign className="w-6 h-6 text-green-500" />,
      title: 'Contract Management',
      description: 'Handle endorsements and track your earnings'
    },
    {
      icon: <Users className="w-6 h-6 text-indigo-500" />,
      title: 'Fan Base Growth',
      description: 'Build your following and track fan engagement'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Activity className="w-8 h-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">2K Career Companion</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                to="/login"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6"
          >
            Elevate Your NBA 2K Career
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 mb-8"
          >
            Track, analyze, and improve your MyCareer journey with advanced stats and tools
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center space-x-4"
          >
            <Link
              to="/new-career"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium"
            >
              Start New Career
            </Link>
            <Link
              to="/login"
              className="bg-gray-100 text-gray-800 px-8 py-3 rounded-lg hover:bg-gray-200 transition-colors text-lg font-medium"
            >
              Continue Career
            </Link>
          </motion.div>
        </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * (index + 1) }}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full"
          >
            <CheckCircle className="w-5 h-5" />
            <span>No account required to start</span>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;