import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X } from 'lucide-react';
import { useInstallPrompt } from '../hooks/useInstallPrompt';

interface InstallPromptProps {
  onDismiss: () => void;
}

const InstallPrompt: React.FC<InstallPromptProps> = ({ onDismiss }) => {
  const { isInstallable, handleInstall } = useInstallPrompt();

  if (!isInstallable) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed bottom-4 left-4 right-4 bg-white rounded-lg shadow-lg p-4 z-50 md:max-w-md"
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">
              Install NBA 2K Career Companion
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Install our app for a better experience with offline support and faster loading times.
            </p>
            <div className="mt-4 flex space-x-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleInstall}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <Download className="w-4 h-4 mr-2" />
                Install
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onDismiss}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
              >
                Maybe Later
              </motion.button>
            </div>
          </div>
          <button
            onClick={onDismiss}
            className="ml-4 text-gray-400 hover:text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default InstallPrompt;