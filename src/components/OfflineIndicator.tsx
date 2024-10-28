import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WifiOff } from 'lucide-react';
import { useOffline } from '../hooks/useOffline';

const OfflineIndicator: React.FC = () => {
  const isOffline = useOffline();

  return (
    <AnimatePresence>
      {isOffline && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          className="fixed top-0 left-0 right-0 bg-yellow-100 border-b border-yellow-200 z-50"
        >
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-center">
              <WifiOff className="w-5 h-5 text-yellow-600 mr-2" />
              <span className="text-yellow-800 text-sm font-medium">
                You're offline. Some features may be limited.
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OfflineIndicator;