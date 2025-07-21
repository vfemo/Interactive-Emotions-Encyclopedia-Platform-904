import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import MindfulnessExercises from '../components/MindfulnessExercises';
import BreathingExercise from '../components/BreathingExercise';
import EmotionGameHub from '../components/EmotionGameHub';

const ExercisesPage = () => {
  const { theme } = useTheme();
  const [activeExercise, setActiveExercise] = useState(null);

  const exercises = [
    {
      id: 'mindfulness',
      title: 'Medytacje i Mindfulness',
      description: 'Prowadzone medytacje dla różnych stanów emocjonalnych',
      icon: '🧘',
      color: 'from-green-400 to-teal-600',
      component: MindfulnessExercises
    },
    {
      id: 'breathing',
      title: 'Ćwiczenia Oddechowe',
      description: 'Interaktywne techniki oddychania z wizualnym przewodnikiem',
      icon: '🫁',
      color: 'from-blue-400 to-purple-600',
      component: BreathingExercise
    },
    {
      id: 'games',
      title: 'Gry i Wyzwania',
      description: 'Gamifikowane ćwiczenia i codzienne wyzwania emocjonalne',
      icon: '🎮',
      color: 'from-pink-400 to-red-600',
      component: EmotionGameHub
    }
  ];

  if (activeExercise) {
    const ExerciseComponent = activeExercise.component;
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen py-8"
      >
        <div className="max-w-4xl mx-auto px-4">
          <button
            onClick={() => setActiveExercise(null)}
            className={`mb-6 px-4 py-2 ${theme.colors.card} ${theme.colors.text} rounded-lg hover:bg-white/10 transition-colors`}
          >
            ← Powrót do ćwiczeń
          </button>
          <ExerciseComponent />
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
            Ćwiczenia Emocjonalne
          </h1>
          <p className={`text-xl ${theme.colors.textSecondary} max-w-3xl mx-auto leading-relaxed`}>
            Praktyczne narzędzia do pracy z emocjami, mindfulness i budowania 
            emocjonalnej odporności
          </p>
        </motion.div>

        {/* Exercise Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {exercises.map((exercise, index) => (
            <motion.div
              key={exercise.id}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.05, y: -10 }}
              className={`${theme.colors.card} rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border border-white/10`}
              onClick={() => setActiveExercise(exercise)}
            >
              <div className="text-center">
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="text-6xl mb-6"
                >
                  {exercise.icon}
                </motion.div>
                
                <h3 className={`text-2xl font-bold ${theme.colors.text} mb-4`}>
                  {exercise.title}
                </h3>
                
                <div className={`w-20 h-1 bg-gradient-to-r ${exercise.color} rounded-full mx-auto mb-4`}></div>
                
                <p className={`${theme.colors.textSecondary} leading-relaxed mb-6`}>
                  {exercise.description}
                </p>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-3 bg-gradient-to-r ${exercise.color} text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300`}
                >
                  Rozpocznij
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Daily Challenge */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className={`${theme.colors.card} rounded-2xl p-8 text-center shadow-xl`}
        >
          <h2 className={`text-3xl font-bold ${theme.colors.text} mb-4`}>
            Dzisiejsze Wyzwanie Emocjonalne
          </h2>
          <div className="text-6xl mb-4">🌟</div>
          <p className={`text-lg ${theme.colors.textSecondary} mb-6 max-w-2xl mx-auto`}>
            Przez cały dzień zwracaj uwagę na jeden konkretny rodzaj emocji. 
            Zapisz, kiedy ją odczuwasz i co ją wywołuje.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-8 py-3 bg-gradient-to-r ${theme.colors.primary} text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300`}
          >
            Przyjmuję Wyzwanie
          </motion.button>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16"
        >
          <h2 className={`text-3xl font-bold ${theme.colors.text} text-center mb-12`}>
            Korzyści z Regularnych Ćwiczeń
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">🧠</div>
              <h3 className={`text-xl font-semibold ${theme.colors.text} mb-3`}>
                Lepsza Samoświadomość
              </h3>
              <p className={`${theme.colors.textSecondary}`}>
                Poznaj swoje wzorce emocjonalne i naucz się je rozpoznawać
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">💪</div>
              <h3 className={`text-xl font-semibold ${theme.colors.text} mb-3`}>
                Większa Odporność
              </h3>
              <p className={`${theme.colors.textSecondary}`}>
                Buduj umiejętność radzenia sobie ze stresem i trudnymi emocjami
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🌈</div>
              <h3 className={`text-xl font-semibold ${theme.colors.text} mb-3`}>
                Lepsze Samopoczucie
              </h3>
              <p className={`${theme.colors.textSecondary}`}>
                Ciesz się większym spokojem i równowagą w codziennym życiu
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ExercisesPage;