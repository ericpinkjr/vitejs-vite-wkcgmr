import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import EndorsementCard from './EndorsementCard';
import useStore from '../store';
import { Endorsement } from '../types';

interface EndorsementCarouselProps {
  endorsements: Endorsement[];
}

const EndorsementCarousel: React.FC<EndorsementCarouselProps> = ({ endorsements }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { playerInfo, updateXP, updateFans, updateBankBalance } = useStore();

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : endorsements.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < endorsements.length - 1 ? prevIndex + 1 : 0));
  };

  const handleAcceptEndorsement = (endorsement: Endorsement) => {
    if (!playerInfo) return;

    updateXP(endorsement.rewards.xp);
    updateFans(endorsement.rewards.fans);
    updateBankBalance(endorsement.rewards.money);
  };

  if (endorsements.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-8 text-gray-600"
      >
        No endorsements available at the moment.
      </motion.div>
    );
  }

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <motion.div
          className="flex"
          initial={{ x: 0 }}
          animate={{ x: `-${currentIndex * 100}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <AnimatePresence mode="wait">
            {endorsements.map((endorsement) => (
              <motion.div
                key={endorsement.id}
                className="w-full flex-shrink-0 px-4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <EndorsementCard
                  endorsement={endorsement}
                  onAccept={() => handleAcceptEndorsement(endorsement)}
                  playerFanBase={playerInfo?.fanBase || 0}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {endorsements.length > 1 && (
        <>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePrev}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow"
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow"
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>
        </>
      )}

      <div className="flex justify-center mt-4 space-x-2">
        {endorsements.map((_, index) => (
          <motion.button
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'
            }`}
            onClick={() => setCurrentIndex(index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
          />
        ))}
      </div>
    </div>
  );
};

export default EndorsementCarousel;