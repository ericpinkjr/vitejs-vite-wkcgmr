import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Users, Award, TrendingUp } from 'lucide-react';
import { Endorsement } from '../data/endorsements';
import { ActiveEndorsement } from '../types';

interface EndorsementStatsProps {
  activeEndorsements: ActiveEndorsement[];
  endorsements: Endorsement[];
  totalEarnings: number;
  totalFans: number;
  totalXP: number;
}

const EndorsementStats: React.FC<EndorsementStatsProps> = ({
  activeEndorsements,
  endorsements,
  totalEarnings,
  totalFans,
  totalXP
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-sm p-6"
      >
        <div className="flex items-center mb-2">
          <Award className="w-8 h-8 text-yellow-500 mr-3" />
          <h3 className="text-lg font-semibold">Active Deals</h3>
        </div>
        <p className="text-3xl font-bold">{activeEndorsements.length}</p>
        <p className="text-sm text-gray-600 mt-1">Current endorsements</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-lg shadow-sm p-6"
      >
        <div className="flex items-center mb-2">
          <DollarSign className="w-8 h-8 text-green-500 mr-3" />
          <h3 className="text-lg font-semibold">Total Earnings</h3>
        </div>
        <p className="text-3xl font-bold">${totalEarnings.toLocaleString()}</p>
        <p className="text-sm text-gray-600 mt-1">From endorsements</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-lg shadow-sm p-6"
      >
        <div className="flex items-center mb-2">
          <Users className="w-8 h-8 text-blue-500 mr-3" />
          <h3 className="text-lg font-semibold">Fan Growth</h3>
        </div>
        <p className="text-3xl font-bold">{totalFans.toLocaleString()}</p>
        <p className="text-sm text-gray-600 mt-1">Fans gained</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-lg shadow-sm p-6"
      >
        <div className="flex items-center mb-2">
          <TrendingUp className="w-8 h-8 text-purple-500 mr-3" />
          <h3 className="text-lg font-semibold">XP Earned</h3>
        </div>
        <p className="text-3xl font-bold">{totalXP.toLocaleString()}</p>
        <p className="text-sm text-gray-600 mt-1">From endorsements</p>
      </motion.div>
    </div>
  );
};

export default EndorsementStats;