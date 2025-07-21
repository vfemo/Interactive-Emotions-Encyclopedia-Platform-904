import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useEmotion } from '../context/EmotionContext';
import EmotionMap from '../components/EmotionMap';
import EmotionCard from '../components/EmotionCard';

const HomePage = () => {
  const { theme } = useTheme();
  const { emotions, emotionCategories } = useEmotion();
  const [selectedCategory, setSelectedCategory] = useState('wszystkie');
  const [hoveredEmotion, setHoveredEmotion] = useState(null);

  const filteredEmotions = selectedCategory === 'wszystkie' 
    ? Object.values(emotions)
    : Object.values(emotions).filter(emotion => emotion.category === selectedCategory);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen"
    >
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full blur-lg animate-bounce"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full blur-md float-animation"></div>
        </div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto relative z-10"
        >
          <motion.h1 
            className={`text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r ${theme.colors.primary} bg-clip-text text-transparent`}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            Witaj w Świecie Emocji
          </motion.h1>
          
          <motion.p 
            className={`text-xl md:text-2xl ${theme.colors.textSecondary} mb-8 leading-relaxed`}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Odkryj, zrozum i pokochaj swoje emocje w interaktywnej podróży przez ludzkie uczucia. 
            Każda emocja ma swoją mądrość - pozwól sobie ją poznać.
          </motion.p>
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link
              to="/testy"
              className={`px-8 py-4 bg-gradient-to-r ${theme.colors.primary} text-white rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2`}
            >
              <span>🧠</span>
              <span>Rozpocznij Test Emocji</span>
            </Link>
            <Link
              to="/cwiczenia"
              className={`px-8 py-4 ${theme.colors.card} ${theme.colors.text} rounded-full font-semibold border-2 ${theme.colors.border} hover:bg-white/10 transform hover:scale-105 transition-all duration-300 flex items-center space-x-2`}
            >
              <span>💪</span>
              <span>Poznaj Ćwiczenia</span>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Interactive Emotion Map */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className={`text-4xl font-bold ${theme.colors.text} mb-4`}>
              Interaktywna Mapa Emocji
            </h2>
            <p className={`text-lg ${theme.colors.textSecondary} max-w-2xl mx-auto`}>
              Każda emocja to oddzielny świat do odkrycia. Kliknij na emocję, 
              aby poznać jej tajemnice i nauczyć się z nią współpracować.
            </p>
          </motion.div>

          <EmotionMap
            emotions={emotions}
            hoveredEmotion={hoveredEmotion}
            setHoveredEmotion={setHoveredEmotion}
          />
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex flex-wrap justify-center gap-3 mb-8"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory('wszystkie')}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === 'wszystkie'
                  ? `bg-gradient-to-r ${theme.colors.primary} text-white shadow-lg`
                  : `${theme.colors.card} ${theme.colors.text} hover:bg-white/10`
              }`}
            >
              🌈 Wszystkie Emocje
            </motion.button>
            
            {Object.entries(emotionCategories).map(([key, category]) => (
              <motion.button
                key={key}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(key)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center space-x-2 ${
                  selectedCategory === key
                    ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                    : `${theme.colors.card} ${theme.colors.text} hover:bg-white/10`
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Emotion Cards Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredEmotions.map((emotion, index) => (
              <motion.div
                key={emotion.id}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 * index }}
              >
                <EmotionCard
                  emotion={emotion}
                  onHover={setHoveredEmotion}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 px-4 bg-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.4 }}
          >
            <h2 className={`text-3xl font-bold ${theme.colors.text} mb-8`}>
              Zacznij Swoją Podróż Emocjonalną
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  to: '/dziennik',
                  icon: '📝',
                  title: 'Dziennik Emocji',
                  description: 'Śledź swoje emocje każdego dnia i odkrywaj wzorce'
                },
                {
                  to: '/galeria-dzwiekow',
                  icon: '🎵',
                  title: 'Galeria Dźwięków',
                  description: 'Odkryj unikalne dźwięki każdej emocji'
                },
                {
                  to: '/cytaty',
                  icon: '💭',
                  title: 'Mądrości o Emocjach',
                  description: 'Inspirujące cytaty i przemyślenia'
                }
              ].map((item, index) => (
                <motion.div
                  key={item.to}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.6 + 0.1 * index }}
                >
                  <Link
                    to={item.to}
                    className={`block p-6 ${theme.colors.card} rounded-xl hover:shadow-xl transform hover:scale-105 transition-all duration-300 group`}
                  >
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <h3 className={`text-lg font-semibold ${theme.colors.text} mb-2`}>
                      {item.title}
                    </h3>
                    <p className={`${theme.colors.textSecondary} text-sm`}>
                      {item.description}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.8 }}
            className={`${theme.colors.card} rounded-2xl p-8 shadow-xl`}
          >
            <h2 className={`text-3xl font-bold ${theme.colors.text} mb-4`}>
              Dołącz do Społeczności Odkrywców Emocji
            </h2>
            <p className={`text-lg ${theme.colors.textSecondary} mb-6`}>
              Tysiące osób już odkrywa świat emocji razem z nami. 
              Każda emocja ma swoją wartość - naucz się ją cenić.
            </p>
            <div className="flex justify-center space-x-8 text-center">
              <div>
                <div className={`text-3xl font-bold ${theme.colors.text}`}>10k+</div>
                <div className={`text-sm ${theme.colors.textSecondary}`}>Użytkowników</div>
              </div>
              <div>
                <div className={`text-3xl font-bold ${theme.colors.text}`}>50k+</div>
                <div className={`text-sm ${theme.colors.textSecondary}`}>Testów wykonanych</div>
              </div>
              <div>
                <div className={`text-3xl font-bold ${theme.colors.text}`}>100k+</div>
                <div className={`text-sm ${theme.colors.textSecondary}`}>Ćwiczeń ukończonych</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default HomePage;