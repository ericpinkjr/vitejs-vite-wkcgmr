import React from 'react';
import { Endorsement } from '../data/endorsements';

interface EndorsementCardProps {
  endorsement: Endorsement;
  onAccept?: () => void;
  isActive?: boolean;
  playerFanBase: number;
  gamesRemaining?: number;
}

const EndorsementCard: React.FC<EndorsementCardProps> = ({ 
  endorsement, 
  onAccept, 
  isActive = false, 
  playerFanBase,
  gamesRemaining 
}) => {
  const canAccept = playerFanBase >= endorsement.requirements.minFans;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="space-y-2">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold">{endorsement.name}</h3>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            {endorsement.tier}
          </span>
        </div>
        
        <p className="text-gray-600">{endorsement.description}</p>
        
        <div className="pt-4 space-y-2">
          <p className="text-lg font-semibold text-blue-600">{endorsement.rewards.xp.toLocaleString()} XP</p>
          <p className="text-lg font-semibold text-green-600">{endorsement.rewards.fans.toLocaleString()} Fans</p>
          <p className="text-lg font-semibold text-purple-600">${endorsement.rewards.money.toLocaleString()}</p>
          <p className="text-gray-600">Claim every {endorsement.requirements.claimInterval} games</p>
          <p className="text-gray-600">Fan Requirement: {endorsement.requirements.minFans.toLocaleString()}</p>
        </div>

        {isActive ? (
          <div className="mt-4 text-center">
            <span className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full">
              {gamesRemaining} games until next claim
            </span>
          </div>
        ) : (
          <button
            onClick={onAccept}
            disabled={!canAccept}
            className={`mt-4 w-full py-2 px-4 rounded-lg transition-colors ${
              canAccept
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            {canAccept ? 'Accept Deal' : 'Insufficient Fans'}
          </button>
        )}
      </div>
    </div>
  );
};

export default EndorsementCard;