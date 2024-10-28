import React from 'react';
import { motion } from 'framer-motion';
import BadgeItem from './BadgeItem';
import { BadgeCategory as BadgeCategoryType, Badge, BadgeTier } from '../types';
import useStore from '../store';

interface BadgeCategoryProps {
  category: BadgeCategoryType;
}

const BadgeCategory: React.FC<BadgeCategoryProps> = ({ category }) => {
  const { playerInfo, updateBadges } = useStore();

  if (!category || !category.badges || !Array.isArray(category.badges)) {
    return null;
  }

  const handleUpgrade = (badge: string) => {
    if (playerInfo) {
      const currentTier = (playerInfo.badges?.[category.name]?.[badge] || 'Locked') as BadgeTier;
      const nextTier = getNextTier(currentTier);
      if (nextTier) {
        const cost = getUpgradeCost(nextTier);
        if (playerInfo.xp >= cost) {
          updateBadges(category.name, badge, nextTier, cost);
        }
      }
    }
  };

  return (
    <div className="divide-y divide-gray-100">
      {category.badges.map((badge, index) => (
        <motion.div
          key={badge.name}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <BadgeItem
            badge={badge}
            currentTier={(playerInfo?.badges?.[category.name]?.[badge.name] || 'Locked') as BadgeTier}
            onUpgrade={() => handleUpgrade(badge.name)}
            xpBalance={playerInfo?.xp || 0}
          />
        </motion.div>
      ))}
    </div>
  );
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

export default BadgeCategory;