import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { emotions } from '../data/emotions';

const EmotionJournalPage = () => {
  const { theme } = useTheme();
  const [entries, setEntries] = useState([]);
  const [currentEntry, setCurrentEntry] = useState({
    date: new Date().toISOString().split('T')[0],
    emotion: '',
    intensity: 5,
    description: '',
    trigger: '',
    response: ''
  });
  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('emotionJournal');
    if (saved) {
      setEntries(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('emotionJournal', JSON.stringify(entries));
  }, [entries]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentEntry.emotion || !currentEntry.description) return;

    const newEntry = {
      ...currentEntry,
      id: Date.now(),
      timestamp: new Date().toISOString()
    };

    setEntries([newEntry, ...entries]);
    setCurrentEntry({
      date: new Date().toISOString().split('T')[0],
      emotion: '',
      intensity: 5,
      description: '',
      trigger: '',
      response: ''
    });
  };

  const deleteEntry = (id) => {
    setEntries(entries.filter(entry => entry.id !== id));
  };

  const getEmotionStats = () => {
    const stats = {};
    entries.forEach(entry => {
      stats[entry.emotion] = (stats[entry.emotion] || 0) + 1;
    });
    return Object.entries(stats)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5);
  };

  const getAverageIntensity = () => {
    if (entries.length === 0) return 0;
    return (entries.reduce((sum, entry) => sum + entry.intensity, 0) / entries.length).toFixed(1);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pl-PL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen py-16"
    >
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <h1 className={`text-5xl font-bold bg-gradient-to-r ${theme.colors.primary} bg-clip-text text-transparent mb-6`}>
            Dziennik Emocji
          </h1>
          <p className={`text-xl ${theme.colors.textSecondary} max-w-2xl mx-auto`}>
            Śledź swoje emocje, odkrywaj wzorce i rozwijaj samoświadomość
          </p>
        </motion.div>

        {/* Stats Toggle */}
        <div className="flex justify-center mb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowStats(!showStats)}
            className={`px-6 py-3 ${showStats ? `bg-gradient-to-r ${theme.colors.primary} text-white` : `${theme.colors.card} ${theme.colors.text} border border-white/20`} rounded-lg font-medium transition-all duration-300`}
          >
            {showStats ? '📝 Powrót do dziennika' : '📊 Pokaż statystyki'}
          </motion.button>
        </div>

        {showStats ? (
          /* Statistics View */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className={`${theme.colors.card} rounded-xl p-6 text-center`}>
                <div className="text-3xl mb-2">📊</div>
                <div className={`text-2xl font-bold ${theme.colors.text}`}>{entries.length}</div>
                <div className={`text-sm ${theme.colors.textSecondary}`}>Wszystkich wpisów</div>
              </div>
              <div className={`${theme.colors.card} rounded-xl p-6 text-center`}>
                <div className="text-3xl mb-2">📈</div>
                <div className={`text-2xl font-bold ${theme.colors.text}`}>{getAverageIntensity()}</div>
                <div className={`text-sm ${theme.colors.textSecondary}`}>Średnia intensywność</div>
              </div>
              <div className={`${theme.colors.card} rounded-xl p-6 text-center`}>
                <div className="text-3xl mb-2">🗓️</div>
                <div className={`text-2xl font-bold ${theme.colors.text}`}>
                  {entries.length > 0 ? Math.ceil((Date.now() - new Date(entries[entries.length - 1].timestamp).getTime()) / (1000 * 60 * 60 * 24)) : 0}
                </div>
                <div className={`text-sm ${theme.colors.textSecondary}`}>Dni od pierwszego wpisu</div>
              </div>
            </div>

            {/* Top Emotions */}
            <div className={`${theme.colors.card} rounded-xl p-6`}>
              <h3 className={`text-xl font-bold ${theme.colors.text} mb-6 text-center`}>
                🏆 Najczęstsze emocje
              </h3>
              <div className="space-y-4">
                {getEmotionStats().map(([emotionId, count], index) => {
                  const emotion = emotions[emotionId];
                  const percentage = (count / entries.length) * 100;
                  
                  return (
                    <div key={emotionId} className="flex items-center space-x-4">
                      <div className="text-2xl">{emotion?.icon || '❓'}</div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className={`font-medium ${theme.colors.text}`}>
                            {emotion?.name || emotionId}
                          </span>
                          <span className={`text-sm ${theme.colors.textSecondary}`}>
                            {count} razy ({percentage.toFixed(1)}%)
                          </span>
                        </div>
                        <div className={`w-full h-2 ${theme.colors.card} rounded-full overflow-hidden`}>
                          <motion.div
                            className={`h-full bg-gradient-to-r ${emotion?.color || 'from-gray-400 to-gray-600'} rounded-full`}
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ duration: 0.5, delay: 0.1 * index }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        ) : (
          /* Journal View */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Entry Form */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className={`${theme.colors.card} rounded-2xl p-6 shadow-xl h-fit`}
            >
              <h2 className={`text-2xl font-bold ${theme.colors.text} mb-6`}>
                Nowy wpis
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Date */}
                <div>
                  <label className={`block text-sm font-medium ${theme.colors.text} mb-2`}>
                    Data
                  </label>
                  <input
                    type="date"
                    value={currentEntry.date}
                    onChange={(e) => setCurrentEntry({...currentEntry, date: e.target.value})}
                    className={`w-full p-3 ${theme.colors.card} border border-white/20 rounded-lg ${theme.colors.text} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                </div>

                {/* Emotion Selection */}
                <div>
                  <label className={`block text-sm font-medium ${theme.colors.text} mb-2`}>
                    Główna emocja
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {Object.values(emotions).map((emotion) => (
                      <motion.button
                        key={emotion.id}
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setCurrentEntry({...currentEntry, emotion: emotion.id})}
                        className={`p-3 rounded-lg border-2 transition-all duration-300 ${
                          currentEntry.emotion === emotion.id
                            ? `bg-gradient-to-r ${emotion.color} text-white border-transparent`
                            : `${theme.colors.card} border-white/20 hover:border-white/40`
                        }`}
                      >
                        <div className="text-2xl mb-1">{emotion.icon}</div>
                        <div className="text-xs">{emotion.name}</div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Intensity */}
                <div>
                  <label className={`block text-sm font-medium ${theme.colors.text} mb-2`}>
                    Intensywność (1-10): {currentEntry.intensity}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={currentEntry.intensity}
                    onChange={(e) => setCurrentEntry({...currentEntry, intensity: parseInt(e.target.value)})}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className={`block text-sm font-medium ${theme.colors.text} mb-2`}>
                    Opis sytuacji *
                  </label>
                  <textarea
                    value={currentEntry.description}
                    onChange={(e) => setCurrentEntry({...currentEntry, description: e.target.value})}
                    placeholder="Co się działo? Jak się czułeś/aś?"
                    className={`w-full p-3 ${theme.colors.card} border border-white/20 rounded-lg ${theme.colors.text} focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none`}
                    required
                  />
                </div>

                {/* Trigger */}
                <div>
                  <label className={`block text-sm font-medium ${theme.colors.text} mb-2`}>
                    Co wywołało tę emocję?
                  </label>
                  <input
                    type="text"
                    value={currentEntry.trigger}
                    onChange={(e) => setCurrentEntry({...currentEntry, trigger: e.target.value})}
                    placeholder="np. rozmowa z szefem, wiadomość od przyjaciela..."
                    className={`w-full p-3 ${theme.colors.card} border border-white/20 rounded-lg ${theme.colors.text} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                </div>

                {/* Response */}
                <div>
                  <label className={`block text-sm font-medium ${theme.colors.text} mb-2`}>
                    Jak zareagowałeś/aś?
                  </label>
                  <input
                    type="text"
                    value={currentEntry.response}
                    onChange={(e) => setCurrentEntry({...currentEntry, response: e.target.value})}
                    placeholder="np. poszedłem na spacer, porozmawiałem z kimś..."
                    className={`w-full p-3 ${theme.colors.card} border border-white/20 rounded-lg ${theme.colors.text} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className={`w-full py-3 bg-gradient-to-r ${theme.colors.primary} text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300`}
                >
                  Zapisz wpis
                </motion.button>
              </form>
            </motion.div>

            {/* Entries List */}
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="space-y-4 max-h-screen overflow-y-auto"
            >
              <h2 className={`text-2xl font-bold ${theme.colors.text} mb-6`}>
                Ostatnie wpisy ({entries.length})
              </h2>
              
              {entries.length === 0 ? (
                <div className={`${theme.colors.card} rounded-xl p-8 text-center`}>
                  <div className="text-6xl mb-4">📝</div>
                  <h3 className={`text-xl font-semibold ${theme.colors.text} mb-2`}>
                    Brak wpisów
                  </h3>
                  <p className={`${theme.colors.textSecondary}`}>
                    Zacznij prowadzić dziennik emocji, dodając swój pierwszy wpis!
                  </p>
                </div>
              ) : (
                entries.map((entry, index) => {
                  const emotion = emotions[entry.emotion];
                  return (
                    <motion.div
                      key={entry.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 * index }}
                      className={`${theme.colors.card} rounded-xl p-4 shadow-lg border border-white/10`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{emotion?.icon || '❓'}</span>
                          <div>
                            <div className={`font-semibold ${theme.colors.text}`}>
                              {emotion?.name || entry.emotion}
                            </div>
                            <div className={`text-sm ${theme.colors.textSecondary}`}>
                              {formatDate(entry.date)} • Intensywność: {entry.intensity}/10
                            </div>
                          </div>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => deleteEntry(entry.id)}
                          className={`text-red-400 hover:text-red-300 transition-colors`}
                        >
                          🗑️
                        </motion.button>
                      </div>
                      
                      <p className={`${theme.colors.text} mb-2 leading-relaxed`}>
                        {entry.description}
                      </p>
                      
                      {entry.trigger && (
                        <div className={`text-sm ${theme.colors.textSecondary} mb-1`}>
                          <strong>Wyzwalacz:</strong> {entry.trigger}
                        </div>
                      )}
                      
                      {entry.response && (
                        <div className={`text-sm ${theme.colors.textSecondary}`}>
                          <strong>Reakcja:</strong> {entry.response}
                        </div>
                      )}
                    </motion.div>
                  );
                })
              )}
            </motion.div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default EmotionJournalPage;