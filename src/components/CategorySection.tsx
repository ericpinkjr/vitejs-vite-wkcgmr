import React from 'react';
import { motion } from 'framer-motion';
import AttributeCard from './AttributeCard';

interface CategorySectionProps {
  category: string;
  attributes: string[];
  currentLevels: Record<string, number>;
  onUpgrade: (attribute: string) => void;
  calculateUpgradeCost: (currentLevel: number) => number;
  availableXP: number;
}

const CategorySection: React.FC<CategorySectionProps> = ({
  category,
  attributes,
  currentLevels,
  onUpgrade,
  calculateUpgradeCost,
  availableXP,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <h2 className="text-2xl font-bold mb-4">{category}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {attributes.map((attr) => {
          const currentLevel = currentLevels[attr] || 25;
          const upgradeCost = calculateUpgradeCost(currentLevel);
          
          return (
            <AttributeCard
              key={attr}
              name={attr}
              value={currentLevel}
              cost={upgradeCost}
              canAfford={availableXP >= upgradeCost}
              onUpgrade={() => onUpgrade(attr)}
              category={category}
            />
          );
        })}
      </div>
    </motion.div>
  );
};

export default CategorySection;