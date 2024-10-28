import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import BadgeCategory from './BadgeCategory';
import { badgeCategories } from '../data/badges';
import useStore from '../store';

const Badges: React.FC = () => {
  const navigate = useNavigate();
  const { playerInfo } = useStore();

  if (!playerInfo) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-lg text-gray-700">No player data available. Please start a new career or load an existing one.</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 w-48 h-12 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition duration-300"
        >
          Go to Home
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* XP Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg p-6 mb-8 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Badge Progress</h1>
              <p className="text-blue-100">Unlock and upgrade your player's badges</p>
            </div>
            <div className="flex items-center bg-blue-500 rounded-lg px-4 py-2">
              <div>
                <p className="text-sm opacity-75">Available XP</p>
                <p className="text-xl font-bold">{playerInfo.xp?.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Badge Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {badgeCategories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (index + 1) }}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <div className="p-6 bg-gradient-to-r from-gray-50 to-gray-100">
                <h2 className="text-xl font-bold text-gray-900">{category.name}</h2>
              </div>
              <BadgeCategory category={category} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Badges;