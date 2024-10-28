import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Lock } from 'lucide-react';

interface AttributeItemProps {
  name: string;
  currentLevel: number;
  upgradeCost: number;
  onUpgrade: () => void;
  canAfford: boolean;
}

const AttributeItem: React.FC<AttributeItemProps> = ({
  name,
  currentLevel,
  upgradeCost,
  onUpgrade,
  canAfford,
}) => {
  const getColorByLevel = (level: number) => {
    if (level >= 90) return 'text-purple-600';
    if (level >= 80) return 'text-blue-600';
    if (level >= 70) return 'text-green-600';
    if (level >= 60) return 'text-yellow-600';
    return 'text-gray-600';
  };

  const getProgressColor = (level: number) => {
    if (level >= 90) return 'bg-purple-500';
    if (level >= 80) return 'bg-blue-500';
    if (level >= 70) return 'bg-green-500';
    if (level >= 60) return 'bg-yellow-500';
    return 'bg-gray-500';
  };

  return (
    <div className="bg-white rounded-lg border border-gray-100 p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-medium text-gray-900">{name}</h3>
          <div className="flex items-center mt-1">
            <span className={`text-2xl font-bold ${getColorByLevel(currentLevel)}`}>
              {currentLevel}
            </span>
            <span className="text-sm text-gray-500 ml-1">/99</span>
          </div>
        </div>
      </div>

      <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden mb-3">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(currentLevel / 99) * 100}%` }}
          className={`absolute top-0 left-0 h-full ${getProgressColor(currentLevel)}`}
          transition={{ duration: 0.3 }}
        />
      </div>

      <button
        onClick={onUpgrade}
        disabled={!canAfford || currentLevel >= 99}
        className={`w-full py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors ${
          currentLevel >= 99
            ? 'bg-purple-100 text-purple-600 cursor-not-allowed'
            : canAfford
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
        }`}
      >
        {currentLevel >= 99 ? (
          <span>Maxed</span>
        ) : (
          <>
            {canAfford ? (
              <>
                <Zap className="w-4 h-4" />
                <span>{upgradeCost.toLocaleString()} XP</span>
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                <span>{upgradeCost.toLocaleString()} XP</span>
              </>
            )}
          </>
        )}
      </button>
    </div>
  );
};

export default AttributeItem;