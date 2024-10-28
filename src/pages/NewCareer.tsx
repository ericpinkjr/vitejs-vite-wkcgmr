import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, DollarSign } from 'lucide-react';
import useStore from '../store';
import { attributeCategories } from '../data/attributes';
import { rookieContracts, undraftedContract, secondRoundContract } from '../data/contracts';
import AttributesStep from '../components/AttributesStep';

const positions = ['Point Guard', 'Shooting Guard', 'Small Forward', 'Power Forward', 'Center'];

const NewCareer: React.FC = () => {
  const navigate = useNavigate();
  const setPlayerInfo = useStore((state) => state.setPlayerInfo);
  const [step, setStep] = useState(1);
  const [playerInfo, setInfo] = useState({
    name: '',
    age: 19,
    height: 75,
    weight: 185,
    position: '',
    college: '',
    number: '',
    draftStatus: 'undrafted',
    draftPick: 0,
    contract: undraftedContract,
    attributes: Object.fromEntries(
      Object.entries(attributeCategories).map(([category, { attributes }]) => [
        category,
        Object.fromEntries(attributes.map(attr => [attr, 25]))
      ])
    )
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'draftStatus') {
      let newContract = undraftedContract;
      if (value === 'drafted') {
        // If switching to drafted status, set contract based on current pick
        if (playerInfo.draftPick > 0 && playerInfo.draftPick <= 30) {
          newContract = rookieContracts[playerInfo.draftPick - 1];
        } else if (playerInfo.draftPick > 30) {
          newContract = secondRoundContract;
        }
      }
      
      setInfo(prev => ({
        ...prev,
        [name]: value,
        contract: newContract
      }));
    } else if (name === 'draftPick') {
      const pick = parseInt(value);
      // Find the correct contract for the pick number
      const newContract = pick > 0 && pick <= 30 
        ? rookieContracts[pick - 1] 
        : pick > 30 
          ? secondRoundContract 
          : undraftedContract;

      setInfo(prev => ({
        ...prev,
        draftPick: pick,
        contract: newContract
      }));
    } else {
      setInfo(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      handleCreate();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleCreate = () => {
    const newPlayer = {
      ...playerInfo,
      xp: 1000,
      fanBase: 12000,
      bankBalance: 50000,
      completedGames: [],
      createdAt: new Date().toISOString()
    };

    setPlayerInfo(newPlayer);
    navigate('/dashboard');
  };

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount * 1000000);
  };

  const handleAttributeChange = (category: string, attribute: string, value: number) => {
    setInfo(prev => ({
      ...prev,
      attributes: {
        ...prev.attributes,
        [category]: {
          ...prev.attributes[category],
          [attribute]: value
        }
      }
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-2xl mx-auto px-4 py-8"
    >
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Create New Career</h1>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`w-1/4 h-2 rounded-full mx-1 ${
                  i <= step ? 'bg-blue-500' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-gray-500 text-center">
            Step {step} of 4: {
              step === 1 ? 'Basic Info' : 
              step === 2 ? 'Position' : 
              step === 3 ? 'Draft Status' :
              'Attributes'
            }
          </p>
        </div>

        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={playerInfo.name}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Age</label>
                <input
                  type="number"
                  name="age"
                  value={playerInfo.age}
                  onChange={handleChange}
                  min="18"
                  max="40"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Height</label>
                <input
                  type="range"
                  name="height"
                  value={playerInfo.height}
                  onChange={handleChange}
                  min="65"
                  max="91"
                  className="mt-1 block w-full"
                />
                <p className="mt-1 text-sm text-gray-500">
                  {Math.floor(playerInfo.height / 12)}'{playerInfo.height % 12}"
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Weight (lbs)</label>
                <input
                  type="number"
                  name="weight"
                  value={playerInfo.weight}
                  onChange={handleChange}
                  min="150"
                  max="350"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Position</label>
                <select
                  name="position"
                  value={playerInfo.position}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Select a position</option>
                  {positions.map(pos => (
                    <option key={pos} value={pos}>{pos}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">College</label>
                <input
                  type="text"
                  name="college"
                  value={playerInfo.college}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Jersey Number</label>
                <input
                  type="number"
                  name="number"
                  value={playerInfo.number}
                  onChange={handleChange}
                  min="0"
                  max="99"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Draft Status</label>
                <select
                  name="draftStatus"
                  value={playerInfo.draftStatus}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="undrafted">Undrafted</option>
                  <option value="drafted">First Round Pick</option>
                  <option value="second_round">Second Round Pick</option>
                </select>
              </div>

              {playerInfo.draftStatus !== 'undrafted' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Draft Pick</label>
                  <select
                    name="draftPick"
                    value={playerInfo.draftPick}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="">Select pick number</option>
                    {playerInfo.draftStatus === 'drafted' ? (
                      // First round picks (1-30)
                      Array.from({ length: 30 }, (_, i) => i + 1).map(pick => (
                        <option key={pick} value={pick}>Pick #{pick}</option>
                      ))
                    ) : (
                      // Second round picks (31-60)
                      Array.from({ length: 30 }, (_, i) => i + 31).map(pick => (
                        <option key={pick} value={pick}>Pick #{pick}</option>
                      ))
                    )}
                  </select>
                </div>
              )}

              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <DollarSign className="w-5 h-5 mr-2 text-blue-600" />
                  Contract Details
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Duration</p>
                    <p className="text-lg font-semibold">{playerInfo.contract.years} years</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Value</p>
                    <p className="text-lg font-semibold">{formatMoney(playerInfo.contract.total)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Annual Salary</p>
                    <p className="text-lg font-semibold">{formatMoney(playerInfo.contract.average)}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <AttributesStep
              attributes={playerInfo.attributes}
              onChange={handleAttributeChange}
            />
          )}
        </motion.div>

        <div className="mt-8 flex justify-between">
          <button
            onClick={handleBack}
            className={`flex items-center px-4 py-2 rounded-md ${
              step === 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
            disabled={step === 1}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>
          <button
            onClick={handleNext}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            {step === 4 ? 'Create Career' : 'Next'}
            {step !== 4 && <ArrowRight className="w-5 h-5 ml-2" />}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default NewCareer;