import React from 'react';
import { motion } from 'framer-motion';

interface AttributeSliderProps {
  name: string;
  value: number;
  onChange: (value: number) => void;
}

const AttributeSlider: React.FC<AttributeSliderProps> = ({ name, value, onChange }) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm font-medium text-gray-700">{name}</label>
        <span className="text-sm font-medium text-blue-600">{value}</span>
      </div>
      <div className="relative">
        <input
          type="range"
          min="25"
          max="85"
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <motion.div
          className="absolute top-0 left-0 h-2 bg-blue-500 rounded-lg"
          style={{ width: `${((value - 25) / 60) * 100}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${((value - 25) / 60) * 100}%` }}
          transition={{ duration: 0.2 }}
        />
      </div>
    </div>
  );
};

export default AttributeSlider;