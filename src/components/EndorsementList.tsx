import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DollarSign, Users, Award, Clock } from 'lucide-react';
import { Endorsement } from '../data/endorsements';
import useStore from '../store';

interface EndorsementListProps {
  endorsements: Endorsement[];
  activeEndorsements: any[];
  onActivate: (endorsement: Endorsement) => void;
  onClaim: (endorsement: Endorsement) => void;
  playerFanBase: number;
}

const EndorsementList: React.FC<EndorsementListProps> = ({
  endorsements,
  activeEndorsements,
  onActivate,
  onClaim,
  playerFanBase
}) => {
  const renderEndorsement = (endorsement: Endorsement) => {
    const active = activeEndorsements.find(
      ae => ae.endorsementId === endorsement.id
    );
    const canActivate = playerFanBase >= endorsement.requirements.minFans;
    const isClaimable = active?.gamesRemaining === 0;

    return (
      <motion.div
        key={endorsement.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className={`bg-white rounded-lg shadow-sm p-6 ${
          !canActivate ? 'opacity-50' : ''
        }`}
      >
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold">{endorsement.name}</h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            endorsement.tier === 'Tier 1' ? 'bg-green-100 text-green-800' :
            endorsement.tier === 'Tier 2' ? 'bg-blue-100 text-blue-800' :
            endorsement.tier === 'Tier 3' ? 'bg-purple-100 text-purple-800' :
            endorsement.tier === 'Tier 4' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {endorsement.tier}
          </span>
        </div>

        <p className="text-gray-600 mb-4">{endorsement.description}</p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center">
            <Award className="w-5 h-5 text-yellow-500 mr-2" />
            <span>{endorsement.rewards.xp.toLocaleString()} XP</span>
          </div>
          <div className="flex items-center">
            <Users className="w-5 h-5 text-blue-500 mr-2" />
            <span>{endorsement.rewards.fans.toLocaleString()} Fans</span>
          </div>
          <div className="flex items-center">
            <DollarSign className="w-5 h-5 text-green-500 mr-2" />
            <span>${endorsement.rewards.money.toLocaleString()}</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-5 h-5 text-gray-500 mr-2" />
            <span>Claim every {endorsement.requirements.claimInterval} games</span>
          </div>
        </div>

        {active ? (
          <div>
            <div className="bg-gray-100 rounded-lg p-3 mb-3">
              <p className="text-sm font-medium">
                Games until next claim: {active.gamesRemaining}
              </p>
              <p className="text-sm text-gray-600">
                Total claims: {active.totalClaims}
              </p>
            </div>
            {isClaimable && (
              <button
                onClick={() => onClaim(endorsement)}
                className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                Claim Rewards
              </button>
            )}
          </div>
        ) : (
          <button
            onClick={() => onActivate(endorsement)}
            disabled={!canActivate}
            className={`w-full py-2 rounded-lg ${
              canActivate
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            } transition-colors`}
          >
            {canActivate ? 'Activate Deal' : 'Insufficient Fans'}
          </button>
        )}
      </motion.div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <AnimatePresence>
        {endorsements.map(endorsement => renderEndorsement(endorsement))}
      </AnimatePresence>
    </div>
  );
};

export default EndorsementList;