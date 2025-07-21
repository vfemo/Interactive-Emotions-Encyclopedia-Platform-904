import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useEmotion } from '../context/EmotionContext';
import { FiArrowLeft, FiHeart, FiUsers, FiActivity, FiBook, FiTarget, FiHeadphones } from 'react-icons/fi';

const EmotionDetailPage = () => {
  const { emotionId } = useParams();
  const { theme } = useTheme();
  const { emotions } = useEmotion();
  const [activeTab, setActiveTab] = useState('definition');
  
  const emotion = emotions[emotionId];

  if (!emotion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-8xl mb-4">😕</div>
          <h1 className={`text-2xl font-bold ${theme.colors.text} mb-4`}>
            Emocja nie została znaleziona
          </h1>
          <Link
            to="/"
            className={`inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r ${theme.colors.primary} text-white rounded-lg hover:shadow-lg transition-all duration-300`}
          >
            <FiArrowLeft />
            <span>Powrót do Mapy Emocji</span>
          </Link>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'definition', label: 'Definicja', icon: FiBook },
    { id: 'examples', label: 'Przykłady', icon: FiActivity },
    { id: 'science', label: 'Nauka', icon: FiTarget },
    { id: 'culture', label: 'Kultura', icon: FiUsers },
    { id: 'coping', label: 'Radzenie', icon: FiHeart }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'definition':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div>
              <h3 className={`text-2xl font-semibold ${theme.colors.text} mb-4`}>
                Czym jest {emotion.name}?
              </h3>
              <p className={`${theme.colors.textSecondary} leading-relaxed text-lg`}>
                {emotion.definition}
              </p>
            </div>

            <div>
              <h3 className={`text-xl font-semibold ${theme.colors.text} mb-4`}>
                Wpływ na ciało i umysł
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {emotion.bodyEffects.map((effect, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className={`flex items-start space-x-3 p-4 ${theme.colors.card} rounded-lg border ${theme.colors.border}`}
                  >
                    <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${emotion.color} mt-2 flex-shrink-0`}></div>
                    <span className={`${theme.colors.text} leading-relaxed`}>{effect}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        );

      case 'examples':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h3 className={`text-2xl font-semibold ${theme.colors.text} mb-6`}>
              Kiedy odczuwamy {emotion.name}?
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {emotion.examples.map((example, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className={`p-6 ${theme.colors.card} rounded-lg border-l-4 border-gradient-to-b`}
                  style={{
                    borderLeftColor: `var(--gradient-from-${emotion.color.split('-')[1]}-${emotion.color.split('-')[2]})`
                  }}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${emotion.color} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                      {index + 1}
                    </div>
                    <p className={`${theme.colors.text} leading-relaxed text-lg`}>
                      {example}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );

      case 'science':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h3 className={`text-2xl font-semibold ${theme.colors.text} mb-6`}>
              Co mówi nauka o {emotion.name}?
            </h3>
            <div className={`p-8 ${theme.colors.card} rounded-xl border ${theme.colors.border}`}>
              <div className="flex items-start space-x-4">
                <div className="text-4xl">🧠</div>
                <div>
                  <h4 className={`text-lg font-semibold ${theme.colors.text} mb-3`}>
                    Neurobiologia emocji
                  </h4>
                  <p className={`${theme.colors.textSecondary} leading-relaxed text-lg`}>
                    {emotion.scientificExplanation}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 'culture':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h3 className={`text-2xl font-semibold ${theme.colors.text} mb-6`}>
              {emotion.name} w różnych kulturach
            </h3>
            <div className={`p-8 ${theme.colors.card} rounded-xl border ${theme.colors.border}`}>
              <div className="flex items-start space-x-4">
                <div className="text-4xl">🌍</div>
                <div>
                  <h4 className={`text-lg font-semibold ${theme.colors.text} mb-3`}>
                    Perspektywa kulturowa
                  </h4>
                  <p className={`${theme.colors.textSecondary} leading-relaxed text-lg`}>
                    {emotion.culturalInsights}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 'coping':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h3 className={`text-2xl font-semibold ${theme.colors.text} mb-6`}>
              Jak współpracować z {emotion.name}?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {emotion.copingStrategies.map((strategy, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index }}
                  className={`p-6 ${theme.colors.card} rounded-xl hover:shadow-lg transition-all duration-300 border ${theme.colors.border}`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${emotion.color} flex items-center justify-center text-white font-bold flex-shrink-0`}>
                      {index + 1}
                    </div>
                    <div>
                      <h4 className={`font-semibold ${theme.colors.text} mb-2`}>
                        Strategia {index + 1}
                      </h4>
                      <p className={`${theme.colors.textSecondary} leading-relaxed`}>
                        {strategy}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen py-8"
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-8"
        >
          <Link
            to="/"
            className={`inline-flex items-center space-x-2 ${theme.colors.textSecondary} hover:${theme.colors.text} transition-colors mb-6`}
          >
            <FiArrowLeft />
            <span>Powrót do Mapy Emocji</span>
          </Link>

          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="text-8xl mb-6"
            >
              {emotion.icon}
            </motion.div>
            
            <h1 className={`text-5xl md:text-6xl font-bold bg-gradient-to-r ${emotion.color} bg-clip-text text-transparent mb-4`}>
              {emotion.name}
            </h1>
            
            <p className={`text-xl ${theme.colors.textSecondary} max-w-3xl mx-auto leading-relaxed`}>
              {emotion.description}
            </p>

            <div className="flex justify-center space-x-4 mt-6">
              <span className={`px-4 py-2 bg-gradient-to-r ${emotion.color} bg-opacity-20 rounded-full text-sm font-medium ${theme.colors.text}`}>
                Kategoria: {emotion.category}
              </span>
              <span className={`px-4 py-2 ${theme.colors.card} border ${theme.colors.border} rounded-full text-sm font-medium ${theme.colors.textSecondary}`}>
                Intensywność: {emotion.intensity}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <div className="flex flex-wrap justify-center gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? `bg-gradient-to-r ${emotion.color} text-white shadow-lg`
                      : `${theme.colors.card} ${theme.colors.text} hover:bg-white/10 border ${theme.colors.border}`
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className={`${theme.colors.card} rounded-2xl p-8 shadow-xl border ${theme.colors.border} mb-8`}
        >
          {renderTabContent()}
        </motion.div>

        {/* Sound Preview */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className={`${theme.colors.card} rounded-2xl p-6 shadow-xl border ${theme.colors.border} mb-8`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <FiHeadphones className={`w-8 h-8 ${theme.colors.text}`} />
              <div>
                <h3 className={`text-lg font-semibold ${theme.colors.text}`}>
                  {emotion.soundscape.title}
                </h3>
                <p className={`${theme.colors.textSecondary} text-sm`}>
                  {emotion.soundscape.description}
                </p>
              </div>
            </div>
            <Link
              to="/galeria-dzwiekow"
              className={`px-4 py-2 bg-gradient-to-r ${emotion.color} text-white rounded-lg hover:shadow-lg transition-all duration-300`}
            >
              Posłuchaj
            </Link>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Link
            to="/cwiczenia"
            className={`px-8 py-3 bg-gradient-to-r ${emotion.color} text-white rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center space-x-2`}
          >
            <FiHeart />
            <span>Ćwiczenia dla tej emocji</span>
          </Link>
          <Link
            to="/dziennik"
            className={`px-8 py-3 ${theme.colors.card} ${theme.colors.text} rounded-lg font-medium border-2 ${theme.colors.border} hover:bg-white/10 transform hover:scale-105 transition-all duration-300 flex items-center space-x-2`}
          >
            <FiBook />
            <span>Zapisz w dzienniku</span>
          </Link>
          <Link
            to="/testy"
            className={`px-8 py-3 ${theme.colors.card} ${theme.colors.text} rounded-lg font-medium border-2 ${theme.colors.border} hover:bg-white/10 transform hover:scale-105 transition-all duration-300 flex items-center space-x-2`}
          >
            <FiTarget />
            <span>Sprawdź w testach</span>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default EmotionDetailPage;