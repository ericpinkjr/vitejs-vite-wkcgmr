import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import AttributeCategory from '../components/AttributeCategory';
import { attributeCategories } from '../data/attributes';
import useStore from '../store';

const Upgrade: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const playerInfo = useStore((state) => state.playerInfo);
  const updateAttributes = useStore((state) => state.updateAttributes);

  const calculateUpgradeCost = (currentLevel: number) => {
    const baseCost = 100;
    const multiplier = 1.5;
    return Math.round(baseCost * Math.pow(multiplier, currentLevel / 10));
  };

  const handleUpgrade = (category: string, attribute: string) => {
    if (!playerInfo?.attributes?.[category]) {
      return;
    }
    
    const currentLevel = playerInfo.attributes[category][attribute] || 25;
    const upgradeCost = calculateUpgradeCost(currentLevel);

    if (playerInfo.xp >= upgradeCost && currentLevel < 99) {
      updateAttributes(category, attribute, currentLevel + 1, upgradeCost);
    }
  };

  const calculateCategoryProgress = (category: keyof typeof attributeCategories) => {
    if (!playerInfo?.attributes?.[category]) return 0;
    const attributes = attributeCategories[category].attributes;
    const totalLevels = attributes.reduce((sum: number, attr: string) => 
      sum + (playerInfo.attributes[category][attr] || 25), 0);
    return Math.round((totalLevels / (attributes.length * 99)) * 100);
  };

  if (!playerInfo) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">No player data found. Please create a player.</p>
          <button
            onClick={() => navigate('/new-career')}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Create New Career
          </button>
        </div>
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
              <h1 className="text-3xl font-bold mb-2">Upgrade Attributes</h1>
              <p className="text-blue-100">Improve your player's abilities</p>
            </div>
            <div className="flex items-center bg-blue-500 rounded-lg px-4 py-2">
              <Zap className="w-6 h-6 mr-2" />
              <div>
                <p className="text-sm opacity-75">Available XP</p>
                <p className="text-xl font-bold">{playerInfo.xp?.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Category Selection */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {(Object.keys(attributeCategories) as Array<keyof typeof attributeCategories>).map((category) => {
            const progress = calculateCategoryProgress(category);
            const isSelected = selectedCategory === category;

            return (
              <motion.button
                key={category}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedCategory(category)}
                className={`p-4 rounded-lg transition-all ${
                  isSelected 
                    ? 'bg-blue-500 text-white shadow-lg' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <h3 className="text-lg font-semibold mb-2">{attributeCategories[category].name}</h3>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      isSelected ? 'bg-white' : 'bg-blue-500'
                    }`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className={`text-sm mt-1 ${isSelected ? 'text-blue-100' : 'text-gray-500'}`}>
                  {progress}% Complete
                </p>
              </motion.button>
            );
          })}
        </div>

        {/* Attributes Display */}
        <div className="mt-8">
          {selectedCategory ? (
            <AttributeCategory
              name={attributeCategories[selectedCategory as keyof typeof attributeCategories].name}
              attributes={attributeCategories[selectedCategory as keyof typeof attributeCategories].attributes}
              category={selectedCategory}
              currentLevels={playerInfo.attributes?.[selectedCategory] || {}}
              onUpgrade={(attribute) => handleUpgrade(selectedCategory, attribute)}
              calculateUpgradeCost={calculateUpgradeCost}
              availableXP={playerInfo.xp || 0}
            />
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-xl shadow-sm p-12 text-center"
            >
              <p className="text-xl text-gray-600">
                Select a category to start upgrading attributes
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Upgrade;