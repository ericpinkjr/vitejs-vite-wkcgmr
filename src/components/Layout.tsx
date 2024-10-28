import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Wifi, WifiOff } from 'lucide-react';
import NavBar from './NavBar';

const Layout: React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    });

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setShowInstallPrompt(false);
    }
    setDeferredPrompt(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      <AnimatePresence>
        {!isOnline && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="bg-yellow-100 border-b border-yellow-200 px-4 py-2 flex items-center justify-center"
          >
            <WifiOff className="w-4 h-4 text-yellow-600 mr-2" />
            <span className="text-yellow-700">You're offline. Some features may be limited.</span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showInstallPrompt && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="bg-blue-100 border-b border-blue-200 px-4 py-3 flex items-center justify-between"
          >
            <span className="text-blue-700">Install NBA 2K Career Companion for a better experience!</span>
            <div className="flex space-x-2">
              <button
                onClick={handleInstall}
                className="px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Install
              </button>
              <button
                onClick={() => setShowInstallPrompt(false)}
                className="px-4 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
              >
                Not now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Outlet />
        </motion.div>
      </main>

      <AnimatePresence>
        {isOnline && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="fixed bottom-4 right-4 bg-green-100 rounded-full px-4 py-2 flex items-center shadow-lg"
          >
            <Wifi className="w-4 h-4 text-green-600 mr-2" />
            <span className="text-green-700 text-sm">Connected</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Layout;