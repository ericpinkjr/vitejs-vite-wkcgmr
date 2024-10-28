import React from 'react';
import { motion } from 'framer-motion';
import AttributeItem from './AttributeItem';

interface AttributeCategoryProps {
  name: string;
  attributes: string[];
  category: string;
  currentLevels: Record<string, number>;
  onUpgrade: (attribute: string) => void;
  calculateUpgradeCost: (currentLevel: number) => number;
  availableXP: number;
}

const AttributeCategory: React.FC<AttributeCategoryProps> = ({
  name,
  attributes,
  category,
  currentLevels,
  onUpgrade,
  calculateUpgradeCost,
  availableXP,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">{name}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {attributes.map((attribute, index) => (
            <motion.div
              key={attribute}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <AttributeItem
                name={attribute}
                currentLevel={currentLevels[attribute] || 25}
                upgradeCost={calculateUpgradeCost(currentLevels[attribute] || 25)}
                onUpgrade={() => onUpgrade(attribute)}
                canAfford={availableXP >= calculateUpgradeCost(currentLevels[attribute] || 25)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AttributeCategory;