import React from 'react';
import { motion } from 'framer-motion';
import { attributeCategories } from '../data/attributes';
import AttributeSlider from './AttributeSlider';

interface AttributesStepProps {
  attributes: Record<string, Record<string, number>>;
  onChange: (category: string, attribute: string, value: number) => void;
}

const AttributesStep: React.FC<AttributesStepProps> = ({ attributes, onChange }) => {
  return (
    <div className="space-y-8">
      {Object.entries(attributeCategories).map(([category, { name, attributes: attrs }], index) => (
        <motion.div
          key={category}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-lg p-6 shadow-sm"
        >
          <h3 className="text-lg font-semibold mb-4 text-gray-900">{name}</h3>
          <div className="space-y-4">
            {attrs.map((attr) => (
              <AttributeSlider
                key={attr}
                name={attr}
                value={attributes[category]?.[attr] || 25}
                onChange={(value) => onChange(category, attr, value)}
              />
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default AttributesStep;