import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

interface XPHeaderProps {
  xp: number;
}

const XPHeader: React.FC<XPHeaderProps> = ({ xp }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg p-6 mb-8 text-white"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Upgrade Attributes</h1>
          <p className="text-blue-100">Improve your player's abilities</p>
        </div>
        <div className="flex items-center bg-blue-500 rounded-lg px-4 py-2">
          <Zap className="w-6 h-6 mr-2" />
          <div>
            <p className="text-sm opacity-75">Available XP</p>
            <p className="text-xl font-bold">{xp.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default XPHeader;