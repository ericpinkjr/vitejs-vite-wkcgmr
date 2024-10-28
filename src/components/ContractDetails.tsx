import React from 'react';
import { DollarSign, Calendar, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { Contract } from '../data/contracts';
import { formatMoney } from '../data/contracts';

interface ContractDetailsProps {
  contract: Contract;
}

const ContractDetails: React.FC<ContractDetailsProps> = ({ contract }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-blue-50 p-6 rounded-lg shadow-sm"
    >
      <h3 className="text-lg font-semibold mb-4 flex items-center text-blue-900">
        <DollarSign className="w-5 h-5 mr-2 text-blue-600" />
        Contract Details
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex items-center space-x-3">
          <Calendar className="w-5 h-5 text-blue-600" />
          <div>
            <p className="text-sm text-gray-600">Duration</p>
            <p className="text-lg font-semibold">{contract.years} years</p>
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
        <div className="mt-4 pt-4 border-t border-blue-200">
          <p className="text-sm text-blue-700">
            First Round Pick #{contract.pick} - Rookie Scale Contract
          </p>
        </div>
      )}
      {contract.pick > 30 && (
        <div className="mt-4 pt-4 border-t border-blue-200">
          <p className="text-sm text-blue-700">
            Second Round Pick - Standard Contract
          </p>
        </div>
      )}
      {contract.pick === 0 && (
        <div className="mt-4 pt-4 border-t border-blue-200">
          <p className="text-sm text-blue-700">
            Undrafted - Minimum Contract
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default ContractDetails;