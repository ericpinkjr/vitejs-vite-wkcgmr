import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { GameResult } from '../types';

interface GameCardsProps {
  games: GameResult[];
  seasonLength: number;
  isPlayoffs?: boolean;
}

const GameCards: React.FC<GameCardsProps> = ({ games = [], seasonLength, isPlayoffs = false }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedGame, setSelectedGame] = useState<GameResult | null>(null);

  const regularSeasonGames = games.filter(game => !game.isPlayoff);
  const playoffGames = games.filter(game => game.isPlayoff);
  const allGames = [...regularSeasonGames, ...playoffGames];

  const visibleCards = 8;
  const canScrollLeft = currentIndex > 0;
  const canScrollRight = currentIndex < allGames.length - visibleCards;

  const handlePrev = () => {
    if (canScrollLeft) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (canScrollRight) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handleGameClick = (game: GameResult) => {
    setSelectedGame(game);
  };

  const getGameLabel = (game: GameResult | undefined, index: number) => {
    if (!game) return `Game ${index + 1}`;
    if (!game.isPlayoff) return `Game ${game.gameNumber}`;
    return `Round ${game.playoffRound} Game ${game.playoffGame}`;
  };

  const getGameStatus = (game: GameResult) => {
    if (!game.isPlayoff) return `Regular Season`;
    return `Playoff Round ${game.playoffRound}`;
  };

  return (
    <div className="relative">
      <div className="flex space-x-2 overflow-hidden">
        <AnimatePresence>
          {[...Array(seasonLength + 28)].map((_, index) => {
            const game = allGames[index];
            const isVisible = index >= currentIndex && index < currentIndex + visibleCards;
            const isWin = game?.result === 'W';
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: isVisible ? 1 : 0,
                  scale: isVisible ? 1 : 0.8,
                  x: `${(index - currentIndex) * 100}%`
                }}
                exit={{ opacity: 0, scale: 0.8 }}
                className={`
                  flex-shrink-0 w-24 h-32 rounded-lg shadow-sm cursor-pointer
                  transform transition-all duration-300 hover:scale-105
                  ${game 
                    ? `${isWin ? 'bg-green-50' : 'bg-red-50'} border ${isWin ? 'border-green-200' : 'border-red-200'}` 
                    : 'bg-gray-100 border border-gray-200'}
                  ${game?.isPlayoff ? 'ring-2 ring-yellow-400' : ''}
                `}
                onClick={() => game && handleGameClick(game)}
              >
                <div className="p-3 h-full flex flex-col justify-between relative">
                  <div className="text-xs font-medium text-gray-800">
                    {getGameLabel(game, index)}
                  </div>
                  {game && (
                    <>
                      <div className={`
                        absolute top-2 right-2 w-6 h-6 flex items-center justify-center 
                        text-sm font-bold rounded-full
                        ${isWin ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}
                      `}>
                        {game.result}
                      </div>
                      <div className="text-xs text-gray-600 mt-2">{game.score}</div>
                    </>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <button
        onClick={handlePrev}
        className={`absolute left-0 top-1/2 transform -translate-y-1/2 
          bg-white rounded-full p-1 shadow-md transition-opacity duration-200 ease-in-out
          ${!canScrollLeft ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
        disabled={!canScrollLeft}
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      <button
        onClick={handleNext}
        className={`absolute right-0 top-1/2 transform -translate-y-1/2 
          bg-white rounded-full p-1 shadow-md transition-opacity duration-200 ease-in-out
          ${!canScrollRight ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
        disabled={!canScrollRight}
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      <AnimatePresence>
        {selectedGame && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setSelectedGame(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold mb-2">
                {getGameLabel(selectedGame, selectedGame.gameNumber)}
              </h3>
              <p className="text-sm text-gray-600 mb-4">{getGameStatus(selectedGame)}</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Result</p>
                  <p className="text-lg font-semibold">{selectedGame.result === 'W' ? 'Win' : 'Loss'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Score</p>
                  <p className="text-lg font-semibold">{selectedGame.score}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Points</p>
                  <p className="text-lg font-semibold">{selectedGame.points}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Rebounds</p>
                  <p className="text-lg font-semibold">{selectedGame.rebounds}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Assists</p>
                  <p className="text-lg font-semibold">{selectedGame.assists}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Steals</p>
                  <p className="text-lg font-semibold">{selectedGame.steals}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Blocks</p>
                  <p className="text-lg font-semibold">{selectedGame.blocks}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GameCards;