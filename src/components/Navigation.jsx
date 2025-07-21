import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { 
  FiHome, 
  FiBook, 
  FiTarget, 
  FiHeadphones, 
  FiHeart, 
  FiBookOpen, 
  FiMenu, 
  FiX, 
  FiSun,
  FiMoon,
  FiDroplet,
  FiZap
} from 'react-icons/fi';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const { theme, currentTheme, changeTheme, themes } = useTheme();
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Mapa Emocji', icon: FiHome },
    { path: '/testy', label: 'Testy', icon: FiTarget },
    { path: '/cwiczenia', label: 'Ćwiczenia', icon: FiHeart },
    { path: '/galeria-dzwiekow', label: 'Galeria Dźwięków', icon: FiHeadphones },
    { path: '/cytaty', label: 'Cytaty', icon: FiBook },
    { path: '/dziennik', label: 'Dziennik', icon: FiBookOpen }
  ];

  const themeIcons = {
    bright: FiSun,
    dark: FiMoon,
    nature: FiDroplet,
    warm: FiZap
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`sticky top-0 z-50 ${theme.colors.card} border-b ${theme.colors.border} backdrop-blur-md`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="text-3xl"
            >
              💝
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className={`text-xl font-bold bg-gradient-to-r ${theme.colors.primary} bg-clip-text text-transparent`}
            >
              Encyklopedia Emocji
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive(item.path)
                      ? `bg-gradient-to-r ${theme.colors.primary} text-white shadow-lg`
                      : `${theme.colors.text} hover:bg-white/10`
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}

            {/* Theme Selector */}
            <div className="relative ml-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setShowThemeMenu(!showThemeMenu)}
                className={`p-2 rounded-lg ${theme.colors.text} hover:bg-white/10 transition-colors`}
              >
                {React.createElement(themeIcons[currentTheme], { className: "w-5 h-5" })}
              </motion.button>

              <AnimatePresence>
                {showThemeMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className={`absolute right-0 mt-2 w-64 ${theme.colors.card} rounded-xl shadow-xl ${theme.colors.border} border p-3`}
                  >
                    <div className={`text-sm font-medium ${theme.colors.text} mb-3`}>
                      Wybierz nastrój
                    </div>
                    {Object.entries(themes).map(([key, themeOption]) => {
                      const ThemeIcon = themeIcons[key];
                      return (
                        <button
                          key={key}
                          onClick={() => {
                            changeTheme(key);
                            setShowThemeMenu(false);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center space-x-3 ${
                            key === currentTheme
                              ? `bg-gradient-to-r ${themeOption.colors.primary} text-white`
                              : `${theme.colors.text} hover:bg-white/10`
                          }`}
                        >
                          <ThemeIcon className="w-4 h-4" />
                          <div>
                            <div className="font-medium">{themeOption.name}</div>
                            <div className={`text-xs ${key === currentTheme ? 'text-white/80' : theme.colors.textSecondary}`}>
                              {themeOption.description}
                            </div>
                          </div>
                          <span className="ml-auto">{themeOption.mood}</span>
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-lg ${theme.colors.text} hover:bg-white/10 transition-colors`}
            >
              {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden py-4 border-t border-white/20"
            >
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive(item.path)
                        ? `bg-gradient-to-r ${theme.colors.primary} text-white shadow-lg`
                        : `${theme.colors.text} hover:bg-white/10`
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
              
              {/* Mobile Theme Selector */}
              <div className="mt-4 pt-4 border-t border-white/20">
                <div className={`text-sm font-medium ${theme.colors.text} mb-3 px-4`}>
                  Wybierz nastrój
                </div>
                {Object.entries(themes).map(([key, themeOption]) => {
                  const ThemeIcon = themeIcons[key];
                  return (
                    <button
                      key={key}
                      onClick={() => {
                        changeTheme(key);
                        setIsOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-colors flex items-center space-x-3 ${
                        key === currentTheme
                          ? `bg-gradient-to-r ${themeOption.colors.primary} text-white`
                          : `${theme.colors.text} hover:bg-white/10`
                      }`}
                    >
                      <ThemeIcon className="w-4 h-4" />
                      <span>{themeOption.name}</span>
                      <span className="ml-auto">{themeOption.mood}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navigation;