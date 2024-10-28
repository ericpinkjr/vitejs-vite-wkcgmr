import React, { useState } from 'react';
import { Save, Upload, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import useStore from '../store';

const SaveLoad: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { playerInfo, setPlayerInfo } = useStore();

  const handleSave = () => {
    try {
      if (!playerInfo) {
        setError('No career data to save');
        return;
      }

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
      setError(null);
    } catch (err) {
      setError('Failed to save career data. Please try again.');
    }
  };

  const validateData = (data: any): boolean => {
    // Check if data is an object
    if (!data || typeof data !== 'object') return false;

    // Required fields with their expected types
    const requiredFields = {
      name: 'string',
      position: 'string',
      xp: 'number',
      fanBase: 'number',
      bankBalance: 'number',
      completedGames: 'object', // array
      attributes: 'object',
      createdAt: 'string'
    };

    // Optional fields with their expected types
    const optionalFields = {
      overallRating: 'number'
    };

    // Check each required field
    for (const [field, type] of Object.entries(requiredFields)) {
      if (!(field in data)) {
        console.error(`Missing required field: ${field}`);
        return false;
      }

      if (field === 'completedGames' && !Array.isArray(data[field])) {
        console.error(`Field ${field} should be an array`);
        return false;
      } else if (field !== 'completedGames' && typeof data[field] !== type) {
        console.error(`Field ${field} has wrong type. Expected ${type}, got ${typeof data[field]}`);
        return false;
      }
    }

    // Check optional fields if they exist
    for (const [field, type] of Object.entries(optionalFields)) {
      if (field in data && typeof data[field] !== type) {
        console.error(`Optional field ${field} has wrong type. Expected ${type}, got ${typeof data[field]}`);
        return false;
      }
    }

    // Validate attributes structure
    if (!data.attributes || typeof data.attributes !== 'object') {
      console.error('Invalid attributes structure');
      return false;
    }

    return true;
  };

  const handleLoad = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const parsedData = JSON.parse(content);
        
        if (validateData(parsedData)) {
          // Ensure overallRating exists with a default value if not present
          if (!('overallRating' in parsedData)) {
            parsedData.overallRating = 60; // Default starting rating
          }
          
          setPlayerInfo(parsedData);
          setSuccess('Career data loaded successfully!');
          setTimeout(() => setSuccess(null), 3000);
          setError(null);
        } else {
          setError('Invalid save file format. Please use a valid career save file.');
        }
      } catch (err) {
        console.error('Error parsing save file:', err);
        setError('Error reading file. Please ensure it\'s a valid career save file.');
      }
    };

    reader.onerror = () => {
      setError('Error reading file. Please try again.');
    };

    reader.readAsText(file);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Save / Load Career</h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-lg p-6"
      >
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
              disabled={!playerInfo}
              className={`w-full py-2 px-4 rounded-lg transition-colors flex items-center justify-center ${
                playerInfo
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Save className="w-4 h-4 mr-2" />
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

        {(error || success) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`rounded-lg p-4 flex items-center ${
              error ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
            }`}
          >
            <AlertCircle className="w-5 h-5 mr-2" />
            <span>{error || success}</span>
          </motion.div>
        )}

        <div className="mt-8 bg-gray-50 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2">Tips</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Save your career regularly to prevent progress loss</li>
            <li>Keep multiple save files for different career stages</li>
            <li>Verify the file is a valid career save before loading</li>
            <li>Loading a save file will replace your current career progress</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default SaveLoad;