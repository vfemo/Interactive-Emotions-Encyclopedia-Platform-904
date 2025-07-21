import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

const themes = {
  bright: {
    name: 'Jasny Nastrój',
    description: 'Energetyczny i optymistyczny',
    colors: {
      primary: 'from-blue-400 to-purple-600',
      secondary: 'from-pink-400 to-yellow-400',
      background: 'bg-gradient-to-br from-blue-50 via-white to-purple-50',
      card: 'bg-white/80 backdrop-blur-sm',
      text: 'text-gray-800',
      textSecondary: 'text-gray-600',
      border: 'border-white/20'
    },
    mood: '☀️'
  },
  dark: {
    name: 'Refleksyjny Nastrój',
    description: 'Spokojny i kontemplacyjny',
    colors: {
      primary: 'from-purple-600 to-blue-800',
      secondary: 'from-indigo-500 to-purple-600',
      background: 'bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900',
      card: 'bg-gray-800/80 backdrop-blur-sm',
      text: 'text-white',
      textSecondary: 'text-gray-300',
      border: 'border-gray-700/50'
    },
    mood: '🌙'
  },
  nature: {
    name: 'Spokojny Nastrój',
    description: 'Harmonijny i uziemiający',
    colors: {
      primary: 'from-green-500 to-teal-600',
      secondary: 'from-emerald-400 to-cyan-400',
      background: 'bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50',
      card: 'bg-white/70 backdrop-blur-sm',
      text: 'text-gray-800',
      textSecondary: 'text-gray-600',
      border: 'border-emerald-200/50'
    },
    mood: '🌿'
  },
  warm: {
    name: 'Energetyczny Nastrój',
    description: 'Ciepły i inspirujący',
    colors: {
      primary: 'from-orange-500 to-red-500',
      secondary: 'from-yellow-400 to-orange-400',
      background: 'bg-gradient-to-br from-orange-50 via-red-50 to-pink-50',
      card: 'bg-white/75 backdrop-blur-sm',
      text: 'text-gray-800',
      textSecondary: 'text-gray-600',
      border: 'border-orange-200/50'
    },
    mood: '🔥'
  }
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('bright');

  useEffect(() => {
    const savedTheme = localStorage.getItem('emotionTheme');
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  const changeTheme = (themeName) => {
    setCurrentTheme(themeName);
    localStorage.setItem('emotionTheme', themeName);
  };

  const theme = themes[currentTheme];

  return (
    <ThemeContext.Provider value={{ theme, currentTheme, changeTheme, themes }}>
      <div className={`min-h-screen transition-all duration-1000 ${theme.colors.background}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};