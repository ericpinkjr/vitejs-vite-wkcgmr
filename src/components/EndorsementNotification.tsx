import React from 'react';
import { X, AlertCircle, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface EndorsementNotificationProps {
  message: string;
  onDismiss: () => void;
  type?: 'success' | 'error' | 'info';
}

const EndorsementNotification: React.FC<EndorsementNotificationProps> = ({ 
  message, 
  onDismiss,
  type = 'info'
}) => {
  const getNotificationStyles = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-green-100',
          border: 'border-green-500',
          text: 'text-green-700',
          icon: <Check className="w-5 h-5 text-green-500" />
        };
      case 'error':
        return {
          bg: 'bg-red-100',
          border: 'border-red-500',
          text: 'text-red-700',
          icon: <AlertCircle className="w-5 h-5 text-red-500" />
        };
      default:
        return {
          bg: 'bg-blue-100',
          border: 'border-blue-500',
          text: 'text-blue-700',
          icon: <AlertCircle className="w-5 h-5 text-blue-500" />
        };
    }
  };

  const styles = getNotificationStyles();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className={`${styles.bg} ${styles.text} border-l-4 ${styles.border} p-4 rounded-r-lg shadow-sm flex justify-between items-center`}
      >
        <div className="flex items-center space-x-3">
          {styles.icon}
          <p className="text-sm font-medium">{message}</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onDismiss}
          className={`${styles.text} hover:opacity-75 transition-opacity`}
        >
          <X className="w-5 h-5" />
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
};

export default EndorsementNotification;