import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, BarChart2, Award, Users, Zap, Save, LogOut, Menu, X } from 'lucide-react';
import useStore from '../store';

const NavBar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const reset = useStore((state) => state.reset);

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: BarChart2 },
    { path: '/play', label: 'Play', icon: Zap },
    { path: '/upgrade', label: 'Upgrade', icon: Award },
    { path: '/badges', label: 'Badges', icon: Users },
    { path: '/agent', label: 'Agent', icon: Activity },
    { path: '/save-load', label: 'Save/Load', icon: Save },
  ];

  const handleLogout = () => {
    reset();
    navigate('/login');
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center"
          >
            <Link to="/dashboard" className="flex items-center text-xl font-semibold text-gray-900">
              <Activity className="w-6 h-6 mr-2 text-blue-500" />
              Career Companion
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <motion.button
                  key={item.path}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleNavigation(item.path)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center ${
                    location.pathname === item.path
                      ? 'text-blue-600 bg-blue-100'
                      : 'text-gray-600 hover:text-blue-500 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-1" />
                  {item.label}
                </motion.button>
              );
            })}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center text-gray-600 hover:text-red-500 hover:bg-gray-100"
            >
              <LogOut className="w-4 h-4 mr-1" />
              Logout
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t"
          >
            <div className="px-4 py-2 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.button
                    key={item.path}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleNavigation(item.path)}
                    className={`w-full px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center ${
                      location.pathname === item.path
                        ? 'text-blue-600 bg-blue-100'
                        : 'text-gray-600 hover:text-blue-500 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </motion.button>
                );
              })}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="w-full px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center text-gray-600 hover:text-red-500 hover:bg-gray-100"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavBar;