import React from 'react';
import { motion } from 'framer-motion';
import { DraftStatus, rookieContracts, getContractByPick } from '../data/contracts';
import ContractDetails from './ContractDetails';

interface DraftSelectorProps {
  draftStatus: DraftStatus;
  draftPick: number;
  onStatusChange: (status: DraftStatus) => void;
  onPickChange: (pick: number) => void;
}

const DraftSelector: React.FC<DraftSelectorProps> = ({
  draftStatus,
  draftPick,
  onStatusChange,
  onPickChange,
}) => {
  const contract = getContractByPick(draftPick);

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Draft Status</label>
        <select
          value={draftStatus}
          onChange={(e) => onStatusChange(e.target.value as DraftStatus)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="undrafted">Undrafted</option>
          <option value="first_round">First Round Pick</option>
          <option value="second_round">Second Round Pick</option>
        </select>
      </div>

      {draftStatus === 'first_round' && (
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

      <ContractDetails contract={contract} />
    </div>
  );
};

export default DraftSelector;