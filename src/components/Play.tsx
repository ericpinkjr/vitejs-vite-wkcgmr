import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import GameStats from './GameStats';
import useStore from '../store';

const Play: React.FC = () => {
  const [showStats, setShowStats] = useState(false);
  const navigate = useNavigate();
  const playerInfo = useStore((state) => state.playerInfo);

  const isPlayoffs = playerInfo?.completedGames?.some(game => game.isPlayoff) || false;
  const regularSeasonGames = playerInfo?.completedGames?.filter(g => !g.isPlayoff) || [];
  const playoffGames = playerInfo?.completedGames?.filter(g => g.isPlayoff) || [];
  
  const currentPlayoffRound = playoffGames.length > 0 ? 
    Math.max(...playoffGames.map(g => g.playoffRound)) : 1;
  
  const currentSeriesGames = playoffGames.filter(g => g.playoffRound === currentPlayoffRound);
  const wins = currentSeriesGames.filter(g => g.result === 'W').length;
  const losses = currentSeriesGames.filter(g => g.result === 'L').length;
  const isSeriesOver = wins === 4 || losses === 4;

  const getPlayoffStatus = () => {
    if (wins === 4) return `Won Round ${currentPlayoffRound}!`;
    if (losses === 4) return `Eliminated in Round ${currentPlayoffRound}`;
    return `Round ${currentPlayoffRound}: ${wins} - ${losses}`;
  };

  const handleStartGame = () => {
    setShowStats(true);
  };

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
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        {isPlayoffs ? (
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Trophy className="w-6 h-6 text-yellow-500 mr-2" />
                <h1 className="text-2xl font-bold text-gray-900">Playoff Game</h1>
              </div>
              <div className="text-lg font-semibold text-blue-600">
                {getPlayoffStatus()}
              </div>
            </div>
            {!isSeriesOver && (
              <div className="mt-4 bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  First to 4 wins advances to the next round
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Regular Season Game</h1>
            <p className="text-gray-600">
              Game {regularSeasonGames.length + 1} of 82
            </p>
          </div>
        )}

        {!showStats ? (
          <div>
            <p className="text-gray-600 mb-4">Ready to start your next game?</p>
            {!isSeriesOver && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleStartGame}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Start Game
              </motion.button>
            )}
          </div>
        ) : (
          <GameStats 
            isPlayoff={isPlayoffs}
            playoffRound={currentPlayoffRound}
            playoffGame={currentSeriesGames.length + 1}
          />
        )}
      </div>
    </div>
  );
};

export default Play;