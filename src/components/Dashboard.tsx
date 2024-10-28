import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { DollarSign, Users, Zap, Trophy, FastForward, Target } from 'lucide-react';
import GameCards from './GameCards';
import ContractDisplay from './ContractDisplay';
import useStore from '../store';
import SimSeasonModal from './SimSeasonModal';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [showSimModal, setShowSimModal] = React.useState(false);
  const [showContractModal, setShowContractModal] = React.useState(false);
  const playerInfo = useStore((state) => state.playerInfo);
  const setPlayerInfo = useStore((state) => state.setPlayerInfo);

  // Calculate contract status based on completed seasons
  const completedSeasons = playerInfo?.completedSeasons || 0;
  const yearsRemaining = playerInfo?.contract ? 
    Math.max(0, playerInfo.contract.years - completedSeasons) : 0;
  const needsNewContract = yearsRemaining === 0;

  // Calculate playoffs status
  const isPlayoffs = playerInfo?.completedGames?.length >= 82;
  const isPlayoffsComplete = isPlayoffs && playerInfo?.playoffStats?.eliminated;

  const handlePlayGame = () => {
    navigate('/play');
  };

  const handleSimulate = (targetWins: number, madePlayoffs: boolean) => {
    if (!playerInfo) return;

    const gamesRemaining = 82 - (playerInfo.completedGames?.length || 0);
    const targetLosses = gamesRemaining - (targetWins - (playerInfo.teamRecord?.wins || 0));
    
    // Generate simulated games
    const simulatedGames = Array.from({ length: gamesRemaining }, (_, index) => {
      const currentWins = playerInfo.teamRecord?.wins || 0;
      const shouldWin = currentWins < targetWins;
      
      return {
        gameNumber: (playerInfo.completedGames?.length || 0) + index + 1,
        result: shouldWin ? 'W' : 'L',
        score: `${Math.floor(Math.random() * 30) + 90}-${Math.floor(Math.random() * 30) + 90}`,
        points: Math.floor(Math.random() * 20) + 15,
        rebounds: Math.floor(Math.random() * 10) + 5,
        assists: Math.floor(Math.random() * 8) + 3,
        steals: Math.floor(Math.random() * 4),
        blocks: Math.floor(Math.random() * 3),
        date: new Date().toISOString()
      };
    });

    setPlayerInfo({
      ...playerInfo,
      completedGames: [...(playerInfo.completedGames || []), ...simulatedGames],
      teamRecord: {
        wins: targetWins,
        losses: targetLosses
      },
      madePlayoffs
    });

    setShowSimModal(false);
  };

  const handleEndPlayoffs = (wonChampionship: boolean) => {
    if (!playerInfo) return;

    // Increment completed seasons when playoffs end
    const newCompletedSeasons = (playerInfo.completedSeasons || 0) + 1;
    const newYearsRemaining = Math.max(0, (playerInfo.contract?.years || 0) - newCompletedSeasons);

    setPlayerInfo({
      ...playerInfo,
      playoffStats: {
        ...playerInfo.playoffStats,
        eliminated: true,
        wonChampionship
      },
      completedSeasons: newCompletedSeasons,
    });

    // Show contract modal if contract expires after season ends
    if (newYearsRemaining === 0) {
      setShowContractModal(true);
    }

    setShowSimModal(false);
  };

  const handleStartNewSeason = () => {
    if (!playerInfo) return;

    if (needsNewContract) {
      setShowContractModal(true);
    } else {
      setPlayerInfo({
        ...playerInfo,
        completedGames: [],
        teamRecord: { wins: 0, losses: 0 },
        winStreak: 0,
        playoffStats: undefined
      });
    }
  };

  const handleNewContract = (years: number, salary: number) => {
    if (!playerInfo) return;

    setPlayerInfo({
      ...playerInfo,
      completedGames: [],
      teamRecord: { wins: 0, losses: 0 },
      winStreak: 0,
      playoffStats: undefined,
      completedSeasons: 0,
      contract: {
        years,
        total: years * salary,
        average: salary,
        pick: 0 // Not drafted anymore, veteran contract
      }
    });

    setShowContractModal(false);
  };

  if (!playerInfo) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">No player data found. Please create a player.</p>
          <button
            onClick={() => navigate('/new-career')}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Create New Career
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto px-4 py-8"
    >
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{playerInfo.name}</h1>
          <p className="text-lg text-gray-600">
            {playerInfo.position} • Overall: {playerInfo.overallRating || 60}
          </p>
        </div>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePlayGame}
            disabled={needsNewContract}
            className={`px-6 py-2 rounded-lg shadow-lg transition-all flex items-center space-x-2 ${
              needsNewContract 
                ? 'bg-gray-400 text-white cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            <span>Play Next Game</span>
          </motion.button>
          {isPlayoffsComplete ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStartNewSeason}
              className="px-6 py-2 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 transition-all flex items-center space-x-2"
            >
              <FastForward className="w-5 h-5 mr-2" />
              <span>Start New Season</span>
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowSimModal(true)}
              className="px-6 py-2 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 transition-all flex items-center space-x-2"
            >
              <FastForward className="w-5 h-5 mr-2" />
              <span>{isPlayoffs ? 'End Playoffs' : 'Sim Regular Season'}</span>
            </motion.button>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-green-50 rounded-xl p-6">
          <p className="text-green-600 font-medium">Bank Balance</p>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold text-green-700">
              ${playerInfo.bankBalance?.toLocaleString()}
            </p>
            <div className="bg-green-200 rounded-full p-1.5">
              <DollarSign className="w-5 h-5 text-green-700" />
            </div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-xl p-6">
          <p className="text-blue-600 font-medium">Fan Base</p>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold text-blue-700">
              {playerInfo.fanBase?.toLocaleString()}
            </p>
            <div className="bg-blue-200 rounded-full p-1.5">
              <Users className="w-4 h-4 text-blue-700" />
            </div>
          </div>
        </div>

        <div className="bg-purple-50 rounded-xl p-6">
          <p className="text-purple-600 font-medium">XP Available</p>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold text-purple-700">
              {playerInfo.xp?.toLocaleString()}
            </p>
            <div className="bg-purple-200 rounded-full p-1.5">
              <Zap className="w-4 h-4 text-purple-700" />
            </div>
          </div>
        </div>

        <div className="bg-orange-50 rounded-xl p-6">
          <p className="text-orange-600 font-medium">Win Streak</p>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold text-orange-700">
              {playerInfo.winStreak || 0}
            </p>
            <div className="bg-orange-200 rounded-full p-1.5">
              <Trophy className="w-4 h-4 text-orange-700" />
            </div>
          </div>
        </div>
      </div>

      {/* Contract Section */}
      {playerInfo.contract && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <ContractDisplay 
            contract={playerInfo.contract} 
            yearsRemaining={yearsRemaining}
          />
        </motion.div>
      )}

      {/* Season Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-xl shadow-sm p-6 mb-8"
      >
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <Target className="w-5 h-5 mr-2 text-blue-600" />
          Season Progress
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <p className="text-3xl font-bold text-green-600">{playerInfo.teamRecord?.wins || 0}</p>
            <p className="text-sm text-gray-600">Wins</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-red-600">{playerInfo.teamRecord?.losses || 0}</p>
            <p className="text-sm text-gray-600">Losses</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-600">
              {calculateWinPercentage(playerInfo.teamRecord?.wins || 0, playerInfo.teamRecord?.losses || 0)}%
            </p>
            <p className="text-sm text-gray-600">Win Rate</p>
          </div>
        </div>
      </motion.div>

      {/* Recent Games */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-white rounded-xl shadow-sm p-6"
      >
        <h2 className="text-xl font-bold mb-4">Recent Games</h2>
        <GameCards 
          games={playerInfo.completedGames || []} 
          seasonLength={82}
          isPlayoffs={isPlayoffs}
        />
      </motion.div>

      {(showSimModal || showContractModal) && (
        <SimSeasonModal
          gamesRemaining={82 - (playerInfo.completedGames?.length || 0)}
          onSimulate={handleSimulate}
          onEndPlayoffs={handleEndPlayoffs}
          onNewContract={handleNewContract}
          onClose={() => {
            setShowSimModal(false);
            setShowContractModal(false);
          }}
          currentWins={playerInfo.teamRecord?.wins || 0}
          isPlayoffs={isPlayoffs}
          needsNewContract={showContractModal}
        />
      )}
    </motion.div>
  );
};

const calculateWinPercentage = (wins: number, losses: number): string => {
  if (wins + losses === 0) return '0.0';
  return ((wins / (wins + losses)) * 100).toFixed(1);
};

export default Dashboard;