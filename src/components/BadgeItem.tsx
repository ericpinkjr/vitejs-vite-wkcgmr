import React from 'react';
import { motion } from 'framer-motion';
import { ChevronUp, Lock, Check } from 'lucide-react';
import { Badge, BadgeTier } from '../types';

interface BadgeItemProps {
  badge: Badge;
  currentTier: BadgeTier;
  onUpgrade: () => void;
  xpBalance: number;
}

const BadgeItem: React.FC<BadgeItemProps> = ({ badge, currentTier, onUpgrade, xpBalance }) => {
  const tierConfig = {
    'Locked': { color: 'gray', bg: 'bg-gray-100', text: 'text-gray-500' },
    'Bronze': { color: 'amber-700', bg: 'bg-amber-100', text: 'text-amber-700' },
    'Silver': { color: 'zinc-400', bg: 'bg-zinc-100', text: 'text-zinc-500' },
    'Gold': { color: 'yellow-500', bg: 'bg-yellow-100', text: 'text-yellow-600' },
    'Hall of Fame': { color: 'purple-600', bg: 'bg-purple-100', text: 'text-purple-600' },
    'Legend': { color: 'red-600', bg: 'bg-red-100', text: 'text-red-600' }
  };

  const getNextTier = (currentTier: BadgeTier): BadgeTier | null => {
    const tiers: BadgeTier[] = ['Locked', 'Bronze', 'Silver', 'Gold', 'Hall of Fame', 'Legend'];
    const currentIndex = tiers.indexOf(currentTier);
    return currentIndex < tiers.length - 1 ? tiers[currentIndex + 1] : null;
  };

  const getUpgradeCost = (tier: BadgeTier): number => {
    switch (tier) {
      case 'Bronze': return 1000;
      case 'Silver': return 2000;
      case 'Gold': return 4000;
      case 'Hall of Fame': return 8000;
      case 'Legend': return 16000;
      default: return 0;
    }
  };

  const nextTier = getNextTier(currentTier);
  const upgradeCost = nextTier ? getUpgradeCost(nextTier) : 0;
  const canAfford = xpBalance >= upgradeCost;
  const config = tierConfig[currentTier];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 border-b last:border-b-0"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className={`w-12 h-12 rounded-xl ${config.bg} flex items-center justify-center`}>
            <span className={`text-xl font-bold ${config.text}`}>
              {currentTier === 'Locked' ? <Lock className="w-5 h-5" /> : currentTier[0]}
            </span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{badge.name}</h3>
            <p className="text-sm text-gray-500">{badge.description}</p>
          </div>
        </div>

        {nextTier ? (
          <motion.button
            whileHover={{ scale: canAfford ? 1.05 : 1 }}
            whileTap={{ scale: canAfford ? 0.95 : 1 }}
            onClick={onUpgrade}
            disabled={!canAfford}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
              canAfford
                ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            {canAfford ? (
              <>
                <ChevronUp className="w-4 h-4" />
                <span>{upgradeCost.toLocaleString()} XP</span>
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                <span>{upgradeCost.toLocaleString()} XP</span>
              </>
            )}
          </motion.button>
        ) : (
          <div className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-green-100 text-green-700">
            <Check className="w-4 h-4" />
            <span>Maxed</span>
          </div>
        )}
      </div>

      <div className="mt-4">
        <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(getTierProgress(currentTier) / 5) * 100}%` }}
            className={`h-full bg-${config.color}`}
          />
        </div>
      </div>
    </motion.div>
  );
};

const getTierProgress = (tier: BadgeTier): number => {
  const tiers: BadgeTier[] = ['Locked', 'Bronze', 'Silver', 'Gold', 'Hall of Fame', 'Legend'];
  return tiers.indexOf(tier);
};

export default BadgeItem;