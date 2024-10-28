import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import useStore from '../store';
import { attributeCategories } from '../data/attributes';
import { PlayerInfo } from '../types';

const CreatePlayer: React.FC = () => {
  const navigate = useNavigate();
  const setPlayerInfo = useStore((state) => state.setPlayerInfo);
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create initial player data
    const initialPlayerData: PlayerInfo = {
      name,
      position,
      overallRating: 60,
      xp: 1000,
      fanBase: 12000,
      bankBalance: 50000,
      completedGames: [],
      teamRecord: { wins: 0, losses: 0 },
      winStreak: 0,
      activeEndorsements: [],
      endorsementCooldowns: [],
      attributes: Object.fromEntries(
        Object.entries(attributeCategories).map(([category, { attributes }]) => [
          category,
          Object.fromEntries(attributes.map(attr => [attr, 25]))
        ])
      ),
      badges: {},
      createdAt: new Date().toISOString()
    };

    // Update store with player data
    setPlayerInfo(initialPlayerData);

    // Navigate to dashboard with player info
    navigate('/dashboard', { 
      state: { playerInfo: initialPlayerData },
      replace: true 
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-5 text-center">Create Your Player</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1 font-medium">Player Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="position" className="block mb-1 font-medium">Position</label>
          <select
            id="position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a position</option>
            <option value="PG">Point Guard</option>
            <option value="SG">Shooting Guard</option>
            <option value="SF">Small Forward</option>
            <option value="PF">Power Forward</option>
            <option value="C">Center</option>
          </select>
        </div>
        <motion.button 
          type="submit" 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
        >
          Create Player
        </motion.button>
      </form>
    </motion.div>
  );
};

export default CreatePlayer;