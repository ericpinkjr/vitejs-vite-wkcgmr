import React from 'react';
import { motion } from 'framer-motion';
import { rookieContracts, undraftedContract } from '../data/contracts';
import ContractDetails from './ContractDetails';

interface ContractSelectorProps {
  draftStatus: 'undrafted' | 'drafted';
  draftPick: number;
  onStatusChange: (status: 'undrafted' | 'drafted') => void;
  onPickChange: (pick: number) => void;
}

const ContractSelector: React.FC<ContractSelectorProps> = ({
  draftStatus,
  draftPick,
  onStatusChange,
  onPickChange,
}) => {
  const currentContract = draftStatus === 'drafted' 
    ? rookieContracts.find(c => c.pick === draftPick) || undraftedContract
    : undraftedContract;

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Draft Status</label>
        <select
          value={draftStatus}
          onChange={(e) => onStatusChange(e.target.value as 'undrafted' | 'drafted')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="undrafted">Undrafted</option>
          <option value="drafted">First Round Pick</option>
        </select>
      </div>

      {draftStatus === 'drafted' && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <label className="block text-sm font-medium text-gray-700">Draft Pick</label>
          <select
            value={draftPick}
            onChange={(e) => onPickChange(Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Select pick number</option>
            {rookieContracts.map(contract => (
              <option key={contract.pick} value={contract.pick}>
                Pick #{contract.pick}
              </option>
            ))}
          </select>
        </motion.div>
      )}

      <ContractDetails contract={currentContract} />
    </div>
  );
};

export default ContractSelector;