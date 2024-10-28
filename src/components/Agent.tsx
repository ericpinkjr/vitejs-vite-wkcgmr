import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DollarSign, Users, Award, TrendingUp, Star, Clock } from 'lucide-react';
import { endorsements } from '../data/endorsements';
import useStore from '../store';

const Agent: React.FC = () => {
  const { playerInfo, activateEndorsement, claimEndorsement } = useStore();
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const activeEndorsements = playerInfo?.activeEndorsements || [];
  const fanBase = playerInfo?.fanBase || 0;

  const handleActivateEndorsement = (endorsement: any) => {
    if (!playerInfo || fanBase < endorsement.requirements.minFans) {
      setNotification(`You need ${endorsement.requirements.minFans.toLocaleString()} fans to activate this deal`);
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    activateEndorsement(endorsement);
    setNotification(`${endorsement.name} deal activated!`);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleClaimEndorsement = (endorsement: any) => {
    claimEndorsement(endorsement);
    setNotification(`Claimed rewards from ${endorsement.name}!`);
    setTimeout(() => setNotification(null), 3000);
  };

  const filteredEndorsements = selectedTier 
    ? endorsements.filter(e => e.tier === selectedTier)
    : endorsements;

  const tiers = ['Tier 1', 'Tier 2', 'Tier 3', 'Tier 4', 'Tier 5'];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <div className="flex items-center mb-2">
            <DollarSign className="w-8 h-8 text-green-500 mr-3" />
            <h3 className="text-lg font-semibold">Bank Balance</h3>
          </div>
          <p className="text-3xl font-bold">${playerInfo?.bankBalance?.toLocaleString()}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <div className="flex items-center mb-2">
            <Users className="w-8 h-8 text-blue-500 mr-3" />
            <h3 className="text-lg font-semibold">Fan Base</h3>
          </div>
          <p className="text-3xl font-bold">{fanBase.toLocaleString()}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <div className="flex items-center mb-2">
            <Star className="w-8 h-8 text-yellow-500 mr-3" />
            <h3 className="text-lg font-semibold">Active Deals</h3>
          </div>
          <p className="text-3xl font-bold">{activeEndorsements.length}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <div className="flex items-center mb-2">
            <TrendingUp className="w-8 h-8 text-purple-500 mr-3" />
            <h3 className="text-lg font-semibold">Career Level</h3>
          </div>
          <p className="text-3xl font-bold">{playerInfo?.overallRating || 60}</p>
        </motion.div>
      </div>

      {/* Tier Filter */}
      <div className="flex space-x-4 mb-8 overflow-x-auto pb-2">
        <button
          onClick={() => setSelectedTier(null)}
          className={`px-4 py-2 rounded-full transition-colors ${
            !selectedTier ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All Tiers
        </button>
        {tiers.map((tier) => (
          <button
            key={tier}
            onClick={() => setSelectedTier(tier)}
            className={`px-4 py-2 rounded-full transition-colors ${
              selectedTier === tier ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {tier}
          </button>
        ))}
      </div>

      {/* Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-8 bg-blue-100 border-l-4 border-blue-500 p-4 rounded-r-lg"
          >
            <p className="text-blue-700">{notification}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Available Endorsements */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Available Endorsements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEndorsements.map((endorsement) => {
            const isActive = activeEndorsements.some(
              (ae: any) => ae.endorsementId === endorsement.id
            );
            const activeEndorsement = activeEndorsements.find(
              (ae: any) => ae.endorsementId === endorsement.id
            );

            if (!isActive) {
              return (
                <motion.div
                  key={endorsement.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold">{endorsement.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
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

                  <div className="pt-4 border-t">
                    <p className="text-sm text-gray-600 mb-4">
                      Required Fans: {endorsement.requirements.minFans.toLocaleString()}
                    </p>
                    <button
                      onClick={() => handleActivateEndorsement(endorsement)}
                      disabled={fanBase < endorsement.requirements.minFans}
                      className={`w-full py-2 px-4 rounded-lg transition-colors ${
                        fanBase >= endorsement.requirements.minFans
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {fanBase >= endorsement.requirements.minFans ? 'Accept Deal' : 'Insufficient Fans'}
                    </button>
                  </div>
                </motion.div>
              );
            }
            return null;
          })}
        </div>
      </div>

      {/* Active Endorsements */}
      {activeEndorsements.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Active Endorsements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeEndorsements.map((active: any) => {
              const endorsement = endorsements.find(e => e.id === active.endorsementId);
              if (!endorsement) return null;

              return (
                <motion.div
                  key={active.endorsementId}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-xl shadow-sm p-6"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold">{endorsement.name}</h3>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                      Active
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 text-gray-500 mr-2" />
                      <span>{active.gamesRemaining} games until next claim</span>
                    </div>
                    <div className="flex items-center">
                      <Award className="w-5 h-5 text-yellow-500 mr-2" />
                      <span>Total Claims: {active.totalClaims}</span>
                    </div>
                  </div>

                  {active.gamesRemaining === 0 && (
                    <button
                      onClick={() => handleClaimEndorsement(endorsement)}
                      className="w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Claim Rewards
                    </button>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Agent;