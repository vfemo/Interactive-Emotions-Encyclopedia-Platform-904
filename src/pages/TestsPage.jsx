import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import EmotionalQuiz from '../components/EmotionalQuiz';
import EmotionWheel from '../components/EmotionWheel';
import PopCultureQuiz from '../components/PopCultureQuiz';

const TestsPage = () => {
  const { theme } = useTheme();
  const [activeTest, setActiveTest] = useState(null);

  const tests = [
    {
      id: 'emotional-quiz',
      title: 'Test Dominujących Emocji',
      description: 'Odkryj, które emocje rządzą Twoim życiem',
      icon: '🧠',
      color: 'from-purple-500 to-blue-600',
      component: EmotionalQuiz
    },
    {
      id: 'emotion-wheel',
      title: 'Koło Emocji - Twoja Aura',
      description: 'Sprawdź swoją dzisiejszą emocjonalną aurę',
      icon: '🎯',
      color: 'from-green-500 to-teal-600',
      component: EmotionWheel
    },
    {
      id: 'pop-culture',
      title: 'Emocje w Popkulturze',
      description: 'Który bohater filmowy reprezentuje Twój świat emocji?',
      icon: '🎬',
      color: 'from-pink-500 to-red-600',
      component: PopCultureQuiz
    }
  ];

  if (activeTest) {
    const TestComponent = activeTest.component;
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen py-8"
      >
        <div className="max-w-4xl mx-auto px-4">
          <button
            onClick={() => setActiveTest(null)}
            className={`mb-6 px-4 py-2 ${theme.colors.card} ${theme.colors.text} rounded-lg hover:bg-white/10 transition-colors`}
          >
            ← Powrót do testów
          </button>
          <TestComponent />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen py-16"
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-16"
        >
          <h1 className={`text-5xl font-bold bg-gradient-to-r ${theme.colors.primary} bg-clip-text text-transparent mb-6`}>
            Testy Emocjonalne
          </h1>
          <p className={`text-xl ${theme.colors.textSecondary} max-w-3xl mx-auto leading-relaxed`}>
            Poznaj swój emocjonalny świat poprzez interaktywne testy i odkryj, 
            jakie emocje kształtują Twoją codzienność
          </p>
        </motion.div>

        {/* Tests Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tests.map((test, index) => (
            <motion.div
              key={test.id}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.05, y: -10 }}
              className={`${theme.colors.card} rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border border-white/10`}
              onClick={() => setActiveTest(test)}
            >
              <div className="text-center">
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="text-6xl mb-6"
                >
                  {test.icon}
                </motion.div>
                
                <h3 className={`text-2xl font-bold ${theme.colors.text} mb-4`}>
                  {test.title}
                </h3>
                
                <div className={`w-20 h-1 bg-gradient-to-r ${test.color} rounded-full mx-auto mb-4`}></div>
                
                <p className={`${theme.colors.textSecondary} leading-relaxed mb-6`}>
                  {test.description}
                </p>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-3 bg-gradient-to-r ${test.color} text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300`}
                >
                  Rozpocznij Test
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className={`mt-16 ${theme.colors.card} rounded-2xl p-8 text-center`}
        >
          <h2 className={`text-2xl font-bold ${theme.colors.text} mb-4`}>
            Dlaczego warto poznać swoje emocje?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="text-center">
              <div className="text-4xl mb-3">🧭</div>
              <h3 className={`font-semibold ${theme.colors.text} mb-2`}>
                Lepsze zrozumienie siebie
              </h3>
              <p className={`text-sm ${theme.colors.textSecondary}`}>
                Poznaj swoje emocjonalne wzorce i reakcje
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🤝</div>
              <h3 className={`font-semibold ${theme.colors.text} mb-2`}>
                Lepsza komunikacja
              </h3>
              <p className={`text-sm ${theme.colors.textSecondary}`}>
                Buduj silniejsze relacje dzięki emocjonalnej inteligencji
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🌱</div>
              <h3 className={`font-semibold ${theme.colors.text} mb-2`}>
                Osobisty rozwój
              </h3>
              <p className={`text-sm ${theme.colors.textSecondary}`}>
                Rozwijaj się emocjonalnie i duchowo
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TestsPage;