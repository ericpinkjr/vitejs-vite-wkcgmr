import React, { useState } from 'react';
import { ArrowUp } from 'lucide-react';

interface AttributeUpgradeProps {
  name: string;
  currentLevel: number;
  upgradeCost: number;
  onUpgrade: (quantity: number) => void;
  canAfford: boolean;
  isSelected: boolean;
}

const AttributeUpgrade: React.FC<AttributeUpgradeProps> = ({
  name,
  currentLevel,
  upgradeCost,
  onUpgrade,
  canAfford,
  isSelected
}) => {
  const [quantity, setQuantity] = useState(1);
  const totalCost = upgradeCost * quantity;

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, Math.min(99 - currentLevel, parseInt(e.target.value) || 1));
    setQuantity(value);
  };

  const handleUpgrade = () => {
    if (canAfford && currentLevel < 99) {
      onUpgrade(quantity);
      setQuantity(1);
    }
  };

  return (
    <div className={`flex items-center justify-between mb-4 p-4 rounded-lg shadow ${isSelected ? 'bg-blue-100' : 'bg-white'}`}>
      <div className="flex-1">
        <p className="font-medium text-lg">{name}</p>
        <p className="text-sm text-gray-600">Current Level: {currentLevel}</p>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
          <div
            className="bg-green-500 h-2 rounded-full"
            style={{ width: `${(currentLevel / 99) * 100}%` }}
          />
        </div>
      </div>
      <div className="flex items-center ml-4">
        <input
          type="number"
          value={quantity}
          onChange={handleQuantityChange}
          min="1"
          max={99 - currentLevel}
          className="w-16 border rounded px-2 mr-2"
        />
        <button
          onClick={handleUpgrade}
          disabled={!canAfford || currentLevel >= 99}
          className={`flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
            canAfford && currentLevel < 99
              ? 'bg-green-500 text-white hover:bg-green-600'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <ArrowUp className="w-4 h-4 mr-1" />
          <span>{currentLevel < 99 ? `${totalCost.toLocaleString()} XP` : 'MAXED'}</span>
        </button>
      </div>
    </div>
  );
};

export default AttributeUpgrade;