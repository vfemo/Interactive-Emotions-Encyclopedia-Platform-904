import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import EmotionTicTacToe from './EmotionTicTacToe';
import DailyChallenge from './DailyChallenge';
import EmotionMemoryGame from './EmotionMemoryGame';

const EmotionGameHub = () => {
  const { theme } = useTheme();
  const [selectedGame, setSelectedGame] = useState(null);

  const games = [
    {
      id: 'tictactoe',
      title: 'Emocjonalne Kółko i Krzyżyk',
      description: 'Dopasuj emocje do najlepszych strategii radzenia sobie',
      icon: '⭕',
      color: 'from-blue-400 to-purple-600',
      component: EmotionTicTacToe,
      difficulty: 'Łatwy'
    },
    {
      id: 'memory',
      title: 'Memory Emocji',
      description: 'Gra pamięciowa z emocjami i ich znaczeniami',
      icon: '🧠',
      color: 'from-green-400 to-blue-600',
      component: EmotionMemoryGame,
      difficulty: 'Średni'
    },
    {
      id: 'challenge',
      title: '7-Dniowe Wyzwanie',
      description: 'Codzienne zadania do rozwoju emocjonalnego',
      icon: '🏆',
      color: 'from-orange-400 to-red-600',
      component: DailyChallenge,
      difficulty: 'Zaawansowany'
    }
  ];

  if (selectedGame) {
    const GameComponent = selectedGame.component;
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="max-w-4xl mx-auto"
      >
        <button
          onClick={() => setSelectedGame(null)}
          className={`mb-6 px-4 py-2 ${theme.colors.card} ${theme.colors.text} rounded-lg hover:bg-white/10 transition-colors`}
        >
          ← Powrót do gier
        </button>
        <GameComponent />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto"
    >
      <div className="text-center mb-12">
        <h2 className={`text-4xl font-bold ${theme.colors.text} mb-4`}>
          Gry i Wyzwania Emocjonalne
        </h2>
        <p className={`text-lg ${theme.colors.textSecondary} max-w-2xl mx-auto`}>
          Ucz się o emocjach poprzez zabawę i interaktywne wyzwania
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {games.map((game, index) => (
          <motion.div
            key={game.id}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 * index }}
            whileHover={{ scale: 1.05, y: -10 }}
            className={`${theme.colors.card} rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border border-white/10`}
            onClick={() => setSelectedGame(game)}
          >
            <div className="text-center">
              <motion.div
                whileHover={{ scale: 1.2, rotate: 5 }}
                className="text-6xl mb-6"
              >
                {game.icon}
              </motion.div>
              
              <h3 className={`text-xl font-bold ${theme.colors.text} mb-3`}>
                {game.title}
              </h3>
              
              <div className={`w-16 h-1 bg-gradient-to-r ${game.color} rounded-full mx-auto mb-4`}></div>
              
              <p className={`${theme.colors.textSecondary} text-sm mb-4 leading-relaxed`}>
                {game.description}
              </p>
              
              <div className={`inline-block px-3 py-1 bg-gradient-to-r ${game.color} bg-opacity-20 rounded-full text-sm font-medium ${theme.colors.text} mb-6`}>
                {game.difficulty}
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full py-3 bg-gradient-to-r ${game.color} text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300`}
              >
                Zagraj Teraz
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Game Benefits */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className={`mt-12 ${theme.colors.card} rounded-2xl p-8 text-center`}
      >
        <h3 className={`text-2xl font-bold ${theme.colors.text} mb-6`}>
          🎮 Dlaczego warto grać w gry emocjonalne?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="text-4xl mb-3">🧩</div>
            <h4 className={`font-semibold ${theme.colors.text} mb-2`}>
              Aktywne Uczenie
            </h4>
            <p className={`text-sm ${theme.colors.textSecondary}`}>
              Gry angażują różne obszary mózgu, ułatwiając zapamiętywanie
            </p>
          </div>
          <div>
            <div className="text-4xl mb-3">🎯</div>
            <h4 className={`font-semibold ${theme.colors.text} mb-2`}>
              Praktyczne Umiejętności
            </h4>
            <p className={`text-sm ${theme.colors.textSecondary}`}>
              Rozwijaj praktyczne umiejętności radzenia sobie z emocjami
            </p>
          </div>
          <div>
            <div className="text-4xl mb-3">🌟</div>
            <h4 className={`font-semibold ${theme.colors.text} mb-2`}>
              Motywacja
            </h4>
            <p className={`text-sm ${theme.colors.textSecondary}`}>
              Gamifikacja sprawia, że nauka jest przyjemna i motywująca
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EmotionGameHub;