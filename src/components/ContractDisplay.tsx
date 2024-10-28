import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Calendar, TrendingUp } from 'lucide-react';
import { Contract } from '../data/contracts';

interface ContractDisplayProps {
  contract: Contract;
  yearsRemaining: number;
}

const ContractDisplay: React.FC<ContractDisplayProps> = ({ contract, yearsRemaining }) => {
  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount * 1000000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm p-6"
    >
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <DollarSign className="w-5 h-5 mr-2 text-blue-600" />
        Contract Details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex items-center space-x-3">
          <Calendar className="w-5 h-5 text-blue-600" />
          <div>
            <p className="text-sm text-gray-600">Years Remaining</p>
            <p className="text-lg font-semibold">{yearsRemaining} of {contract.years}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <DollarSign className="w-5 h-5 text-green-600" />
          <div>
            <p className="text-sm text-gray-600">Total Value</p>
            <p className="text-lg font-semibold">{formatMoney(contract.total)}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <TrendingUp className="w-5 h-5 text-purple-600" />
          <div>
            <p className="text-sm text-gray-600">Annual Salary</p>
            <p className="text-lg font-semibold">{formatMoney(contract.average)}</p>
          </div>
        </div>
      </div>

      {contract.pick > 0 && contract.pick <= 30 && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-sm text-blue-600">
            First Round Pick #{contract.pick} - Rookie Scale Contract
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default ContractDisplay;