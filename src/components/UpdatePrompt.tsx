import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import { useAppUpdate } from '../hooks/useAppUpdate';

const UpdatePrompt: React.FC = () => {
  const { updateAvailable, applyUpdate } = useAppUpdate();

  return (
    <AnimatePresence>
      {updateAvailable && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 z-50"
        >
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">
                Update Available
              </p>
              <p className="text-sm text-gray-500">
                Refresh to get the latest version
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={applyUpdate}
              className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Update
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UpdatePrompt;