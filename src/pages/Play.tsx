import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';
import GameStats from '../components/GameStats';
import useStore from '../store';

const Play: React.FC = () => {
  const navigate = useNavigate();
  const playerInfo = useStore((state) => state.playerInfo);

  if (!playerInfo) {
    return (
      <div className="text-center p-8">
        <p className="text-xl text-gray-600">No player data found. Please create a new career first.</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold mb-6 flex items-center">
          <Activity className="w-8 h-8 mr-2 text-orange-500" />
          Play Game
        </h1>
        <GameStats />
      </div>
    </div>
  );
};

export default Play;