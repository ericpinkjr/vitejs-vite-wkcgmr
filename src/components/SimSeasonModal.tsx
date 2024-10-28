import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Trophy, FastForward, DollarSign } from 'lucide-react';

interface SimSeasonModalProps {
  gamesRemaining: number;
  onSimulate: (targetWins: number, madePlayoffs: boolean) => void;
  onEndPlayoffs: (wonChampionship: boolean) => void;
  onNewContract: (years: number, salary: number) => void;
  onClose: () => void;
  currentWins?: number;
  isPlayoffs?: boolean;
  needsNewContract?: boolean;
}

const SimSeasonModal: React.FC<SimSeasonModalProps> = ({ 
  gamesRemaining, 
  onSimulate, 
  onEndPlayoffs,
  onNewContract,
  onClose,
  currentWins = 0,
  isPlayoffs = false,
  needsNewContract = false
}) => {
  const [targetWins, setTargetWins] = useState(Math.floor(gamesRemaining * 0.6) + currentWins);
  const [madePlayoffs, setMadePlayoffs] = useState(false);
  const [wonChampionship, setWonChampionship] = useState(false);
  const [contractYears, setContractYears] = useState(2);
  const [contractSalary, setContractSalary] = useState(10);

  const expectedLosses = gamesRemaining - (targetWins - currentWins);
  const winPercentage = ((targetWins / 82) * 100).toFixed(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (needsNewContract) {
      onNewContract(contractYears, contractSalary);
    } else if (isPlayoffs) {
      onEndPlayoffs(wonChampionship);
    } else {
      onSimulate(targetWins, madePlayoffs);
    }
  };

  if (needsNewContract) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-xl p-6 max-w-md w-full mx-4"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">New Contract</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contract Duration (Years)
              </label>
              <input
                type="number"
                value={contractYears}
                onChange={(e) => setContractYears(Math.min(7, Math.max(1, parseInt(e.target.value) || 1)))}
                min="1"
                max="7"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Annual Salary (in millions)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <DollarSign className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  value={contractSalary}
                  onChange={(e) => setContractSalary(Math.max(1, parseFloat(e.target.value) || 1))}
                  min="1"
                  step="0.1"
                  className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <DollarSign className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-blue-900">Contract Details</span>
              </div>
              <div className="space-y-1 text-sm text-blue-700">
                <p>Total Value: ${(contractSalary * contractYears).toFixed(2)}M</p>
                <p>Annual Salary: ${contractSalary.toFixed(2)}M</p>
                <p>Duration: {contractYears} {contractYears === 1 ? 'year' : 'years'}</p>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Sign Contract
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    );
  }

  if (isPlayoffs) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-xl p-6 max-w-md w-full mx-4"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">End Playoffs</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={wonChampionship}
                  onChange={(e) => setWonChampionship(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500 h-5 w-5"
                />
                <div className="flex items-center space-x-2">
                  <Trophy className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-blue-900">Won Championship</span>
                </div>
              </label>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
              >
                <FastForward className="w-4 h-4" />
                <span>End Playoffs</span>
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-xl p-6 max-w-md w-full mx-4"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Simulate Regular Season</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Target Wins (out of 82 games)
            </label>
            <input
              type="number"
              value={targetWins}
              onChange={(e) => setTargetWins(Math.min(82, Math.max(currentWins, parseInt(e.target.value) || 0)))}
              min={currentWins}
              max="82"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="space-y-2 text-sm text-gray-600">
            <p>Games to simulate: {gamesRemaining}</p>
            <p>Expected losses: {expectedLosses}</p>
            <p>Win percentage: {winPercentage}%</p>
          </div>

          <div className="bg-blue-50 rounded-lg p-4">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={madePlayoffs}
                onChange={(e) => setMadePlayoffs(e.target.checked)}
                className="rounded text-blue-600 focus:ring-blue-500 h-5 w-5"
              />
              <div className="flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">Made Playoffs</span>
              </div>
            </label>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
            >
              <FastForward className="w-4 h-4" />
              <span>Simulate Season</span>
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default SimSeasonModal;