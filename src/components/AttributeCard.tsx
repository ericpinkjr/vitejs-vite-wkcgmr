import React from 'react';
import { motion } from 'framer-motion';
import { ChevronUp, Lock } from 'lucide-react';

interface AttributeCardProps {
  name: string;
  value: number;
  cost: number;
  canAfford: boolean;
  onUpgrade: () => void;
  category: string;
}

const AttributeCard: React.FC<AttributeCardProps> = ({
  name,
  value,
  cost,
  canAfford,
  onUpgrade,
  category
}) => {
  const getColorScheme = () => {
    switch (category) {
      case 'Shooting':
        return { bg: 'from-red-50 to-red-100', text: 'text-red-700', accent: 'bg-red-200' };
      case 'Playmaking':
        return { bg: 'from-blue-50 to-blue-100', text: 'text-blue-700', accent: 'bg-blue-200' };
      case 'Defense':
        return { bg: 'from-green-50 to-green-100', text: 'text-green-700', accent: 'bg-green-200' };
      case 'Physical':
        return { bg: 'from-purple-50 to-purple-100', text: 'text-purple-700', accent: 'bg-purple-200' };
      default:
        return { bg: 'from-gray-50 to-gray-100', text: 'text-gray-700', accent: 'bg-gray-200' };
    }
  };

  const colors = getColorScheme();

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`bg-gradient-to-br ${colors.bg} rounded-xl p-6 shadow-sm`}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className={`font-semibold ${colors.text}`}>{name}</h3>
          <p className="text-sm text-gray-600">Current Level</p>
        </div>
        <div className={`${colors.accent} rounded-full px-3 py-1`}>
          <span className={`text-lg font-bold ${colors.text}`}>{value}</span>
        </div>
      </div>

      <div className="mb-4">
        <div className="h-2 bg-gray-200 rounded-full">
          <div
            className={`h-2 rounded-full ${colors.accent}`}
            style={{ width: `${(value / 99) * 100}%` }}
          />
        </div>
      </div>

      <motion.button
        whileHover={{ scale: canAfford ? 1.05 : 1 }}
        whileTap={{ scale: canAfford ? 0.95 : 1 }}
        onClick={onUpgrade}
        disabled={!canAfford || value >= 99}
        className={`w-full py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors ${
          canAfford && value < 99
            ? `${colors.accent} ${colors.text} hover:opacity-90`
            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
        }`}
      >
        {value >= 99 ? (
          <span>Maxed Out</span>
        ) : (
          <>
            {canAfford ? <ChevronUp className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
            <span>{cost.toLocaleString()} XP</span>
          </>
        )}
      </motion.button>
    </motion.div>
  );
};

export default AttributeCard;