import React, { useState } from 'react';
import { Save, Upload, AlertCircle, Download, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useStore from '../store';

interface SaveLoadDataProps {
  onLoadData: (data: any) => void;
}

const SaveLoadData: React.FC<SaveLoadDataProps> = ({ onLoadData }) => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const playerInfo = useStore((state) => state.playerInfo);

  const handleSave = () => {
    try {
      const dataStr = JSON.stringify(playerInfo, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      const date = new Date().toISOString().split('T')[0];
      link.download = `2k-career-${date}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      setSuccess('Career data saved successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Failed to save career data. Please try again.');
    }
  };

  const handleLoad = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          const parsedData = JSON.parse(content);
          if (validateData(parsedData)) {
            onLoadData(parsedData);
            setSuccess('Career data loaded successfully!');
            setTimeout(() => setSuccess(null), 3000);
            setError(null);
          } else {
            setError('Invalid save file format. Please use a valid career save file.');
          }
        } catch (err) {
          setError('Error reading file. Please ensure it\'s a valid career save file.');
        }
      };
      reader.readAsText(file);
    }
  };

  const validateData = (data: any): boolean => {
    const requiredFields = [
      'username',
      'xp',
      'fanBase',
      'bankBalance',
      'completedGames',
      'attributes',
      'badges',
      'createdAt'
    ];

    return requiredFields.every(field => field in data);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Career Management</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-blue-50 p-6 rounded-lg"
        >
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Save className="w-5 h-5 mr-2 text-blue-600" />
            Save Career
          </h3>
          <p className="text-gray-600 mb-4">
            Save your current career progress to a file that you can load later.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSave}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
          >
            <Download className="w-4 h-4 mr-2" />
            Save Career Data
          </motion.button>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-green-50 p-6 rounded-lg"
        >
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Upload className="w-5 h-5 mr-2 text-green-600" />
            Load Career
          </h3>
          <p className="text-gray-600 mb-4">
            Load a previously saved career file to continue your progress.
          </p>
          <label className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center cursor-pointer">
            <Upload className="w-4 h-4 mr-2" />
            Load Career Data
            <input
              type="file"
              accept=".json"
              onChange={handleLoad}
              className="hidden"
            />
          </label>
        </motion.div>
      </div>

      <AnimatePresence>
        {(error || success) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`rounded-lg p-4 flex items-center justify-between ${
              error ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
            }`}
          >
            <div className="flex items-center">
              {error ? (
                <AlertCircle className="w-5 h-5 mr-2" />
              ) : (
                <Save className="w-5 h-5 mr-2" />
              )}
              <span>{error || success}</span>
            </div>
            <button
              onClick={() => error ? setError(null) : setSuccess(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-8 bg-gray-50 rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-2">Tips</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          <li>Save your career regularly to prevent progress loss</li>
          <li>Keep multiple save files for different career stages</li>
          <li>Verify the file is a valid career save before loading</li>
          <li>Loading a save file will replace your current career progress</li>
        </ul>
      </div>
    </div>
  );
};

export default SaveLoadData;