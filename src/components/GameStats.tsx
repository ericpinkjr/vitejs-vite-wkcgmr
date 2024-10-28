import React, { useState } from 'react';
import { Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useStore from '../store';
import { GameResult } from '../types';

interface GameStatsProps {
  isPlayoff?: boolean;
  playoffRound?: number;
  playoffGame?: number;
}

interface GameStats {
  fgm: number;
  fga: number;
  '3pm': number;
  '3pa': number;
  ftm: number;
  fta: number;
  ast: number;
  to: number;
  dreb: number;
  oreb: number;
  stl: number;
  blk: number;
  fls: number;
  plusMinus: number;
  dunks: number;
  modifier: number;
  win: boolean;
}

const GameStats: React.FC<GameStatsProps> = ({ isPlayoff, playoffRound, playoffGame }) => {
  const navigate = useNavigate();
  const { playerInfo, updateXP, updateFans, updateBankBalance, addCompletedGame, updateTeamRecord, updateEndorsements } = useStore();
  const [stats, setStats] = useState<GameStats>({
    fgm: 0, fga: 0,
    '3pm': 0, '3pa': 0,
    ftm: 0, fta: 0,
    ast: 0, to: 0,
    dreb: 0, oreb: 0,
    stl: 0, blk: 0,
    fls: 0,
    plusMinus: 0,
    dunks: 0,
    modifier: 1,
    win: false
  });

  const calculateXP = (stats: GameStats): number => {
    const baseXP = isPlayoff ? 200 : 100;
    const performanceXP = (stats.fgm * 10) + (stats['3pm'] * 15) + (stats.ftm * 5) + 
                         (stats.ast * 12) + (stats.dreb + stats.oreb) * 8 + 
                         (stats.stl * 15) + (stats.blk * 15) - 
                         (stats.to * 10) - (stats.fls * 5);
    const plusMinusContribution = stats.plusMinus * 5;
    const winLossModifier = stats.win ? 1.2 : 0.9;
    const playoffModifier = isPlayoff ? 1.5 : 1;
    
    return Math.round((baseXP + performanceXP + plusMinusContribution) * 
                     winLossModifier * stats.modifier * playoffModifier);
  };

  const calculateFans = (stats: GameStats): number => {
    const baseFanGain = isPlayoff ? 1000 : 500;
    const performanceFanGain = (stats.fgm * 40) + ((stats.dreb + stats.oreb) * 25) + 
                              (stats.ast * 30) + (stats.stl * 50) + (stats.blk * 50) - 
                              (stats.to * 20) - (stats.fls * 10);
    const plusMinusContribution = stats.plusMinus * 10;
    const winLossModifier = stats.win ? 1.5 : 0.9;
    const playoffModifier = isPlayoff ? 2 : 1;
    
    const currentFans = playerInfo?.fanBase || 12000;
    const fanSaturationScaling = 1 - (currentFans / 100000000);
    
    return Math.round(((baseFanGain + performanceFanGain + plusMinusContribution) * 
                     winLossModifier * playoffModifier) * fanSaturationScaling);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const points = (stats.fgm * 2) + (stats['3pm'] * 3) + stats.ftm;
    const rebounds = stats.dreb + stats.oreb;
    
    const xpGained = calculateXP(stats);
    const fansGained = calculateFans(stats);

    const regularSeasonGames = playerInfo?.completedGames?.filter(g => !g.isPlayoff) || [];
    const gameResult: GameResult = {
      gameNumber: isPlayoff ? playoffGame || 0 : regularSeasonGames.length + 1,
      result: stats.win ? 'W' : 'L',
      score: `${Math.floor(Math.random() * 30) + 90}-${Math.floor(Math.random() * 30) + 90}`,
      points,
      rebounds,
      assists: stats.ast,
      steals: stats.stl,
      blocks: stats.blk,
      isPlayoff,
      playoffRound,
      playoffGame,
      date: new Date().toISOString()
    };

    addCompletedGame(gameResult);
    updateTeamRecord(stats.win);
    updateXP(xpGained);
    updateFans(fansGained);
    updateEndorsements();
    
    navigate('/dashboard');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <Activity className="w-8 h-8 mr-2 text-orange-500" />
        Game Statistics
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {['fgm', 'fga', '3pm', '3pa', 'ftm', 'fta', 'ast', 'to', 'dreb', 'oreb', 'stl', 'blk', 'dunks', 'fls'].map((stat) => (
          <div key={stat}>
            <label htmlFor={stat} className="block text-sm font-medium text-gray-700">{stat.toUpperCase()}</label>
            <input
              type="number"
              id={stat}
              name={stat}
              value={stats[stat as keyof GameStats]}
              onChange={(e) => setStats(prev => ({
                ...prev,
                [stat]: parseInt(e.target.value) || 0
              }))}
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
        ))}
      </div>

      <div>
        <label htmlFor="plusMinus" className="block text-sm font-medium text-gray-700">Plus/Minus</label>
        <input
          type="number"
          id="plusMinus"
          name="plusMinus"
          value={stats.plusMinus}
          onChange={(e) => setStats(prev => ({
            ...prev,
            plusMinus: parseInt(e.target.value) || 0
          }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </div>

      <div>
        <label htmlFor="modifier" className="block text-sm font-medium text-gray-700">Modifier</label>
        <input
          type="number"
          id="modifier"
          name="modifier"
          value={stats.modifier}
          onChange={(e) => setStats(prev => ({
            ...prev,
            modifier: parseFloat(e.target.value) || 1
          }))}
          step="0.1"
          min="0.1"
          max="2"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="win"
          name="win"
          checked={stats.win}
          onChange={(e) => setStats(prev => ({
            ...prev,
            win: e.target.checked
          }))}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="win" className="ml-2 block text-sm text-gray-900">Win</label>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Submit Stats
        </button>
      </div>
    </form>
  );
};

export default GameStats;