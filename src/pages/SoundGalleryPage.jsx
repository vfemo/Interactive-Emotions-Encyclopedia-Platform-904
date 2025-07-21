import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { emotions } from '../data/emotions';

const SoundGalleryPage = () => {
  const { theme } = useTheme();
  const [currentPlaying, setCurrentPlaying] = useState(null);
  const [volume, setVolume] = useState(0.7);

  const soundscapes = {
    radosc: {
      title: 'Słoneczna Melodia',
      description: 'Radosne dźwięki przywołujące uśmiech',
      sounds: ['Śpiew ptaków', 'Delikatne dzwoneczki', 'Akustyczna gitara', 'Dziecięcy śmiech'],
      color: 'from-yellow-400 to-orange-500',
      emoji: '☀️'
    },
    smutek: {
      title: 'Deszczowa Refleksja',
      description: 'Kojące dźwięki dla momentów zadumy',
      sounds: ['Delikatny deszcz', 'Fortepiano', 'Odgłosy oceanu', 'Wiolonczela'],
      color: 'from-blue-500 to-indigo-600',
      emoji: '🌧️'
    },
    spokoj: {
      title: 'Leśna Cisza',
      description: 'Naturalne dźwięki przywracające spokój',
      sounds: ['Szum lasu', 'Strumyk', 'Wiatr w liściach', 'Odgłosy natury'],
      color: 'from-green-400 to-teal-500',
      emoji: '🌲'
    },
    zlosc: {
      title: 'Transformacyjny Rytm',
      description: 'Mocne dźwięki do uwolnienia napięcia',
      sounds: ['Bębny', 'Gitara elektryczna', 'Grzmoty', 'Mocny rytm'],
      color: 'from-red-500 to-red-700',
      emoji: '⚡'
    },
    strach: {
      title: 'Ochronna Harmonia',
      description: 'Uspokajające dźwięki przywracające poczucie bezpieczeństwa',
      sounds: ['Kołysanka', 'Harfa', 'Miękkie tony', 'Oddech'],
      color: 'from-purple-500 to-indigo-600',
      emoji: '🌙'
    },
    ekscytacja: {
      title: 'Energetyczna Fala',
      description: 'Dynamiczne dźwięki pobudzające do działania',
      sounds: ['Syntetyzatory', 'Szybki beat', 'Elektronika', 'Taneczne rytmy'],
      color: 'from-purple-500 to-pink-500',
      emoji: '🎆'
    }
  };

  const playSound = (emotionId) => {
    if (currentPlaying === emotionId) {
      setCurrentPlaying(null);
    } else {
      setCurrentPlaying(emotionId);
      // W rzeczywistej aplikacji tutaj byłaby logika odtwarzania dźwięku
      setTimeout(() => setCurrentPlaying(null), 5000); // Symulacja 5-sekundowego utworu
    }
  };

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
            Galeria Dźwięków Emocji
          </h1>
          <p className={`text-xl ${theme.colors.textSecondary} max-w-3xl mx-auto leading-relaxed`}>
            Każda emocja ma swój unikalny dźwięk. Odkryj melodie, które rezonują 
            z Twoimi uczuciami i pomogą Ci je lepiej zrozumieć.
          </p>
        </motion.div>

        {/* Volume Control */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={`${theme.colors.card} rounded-2xl p-6 mb-12 text-center shadow-xl`}
        >
          <h3 className={`text-lg font-semibold ${theme.colors.text} mb-4`}>
            🔊 Kontrola Głośności
          </h3>
          <div className="flex items-center justify-center space-x-4 max-w-md mx-auto">
            <span className={`text-sm ${theme.colors.textSecondary}`}>Cicho</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <span className={`text-sm ${theme.colors.textSecondary}`}>Głośno</span>
          </div>
          <div className={`mt-2 text-sm ${theme.colors.textSecondary}`}>
            Głośność: {Math.round(volume * 100)}%
          </div>
        </motion.div>

        {/* Sound Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(soundscapes).map(([emotionId, soundscape], index) => {
            const emotion = emotions[emotionId];
            const isPlaying = currentPlaying === emotionId;
            
            return (
              <motion.div
                key={emotionId}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 * index }}
                className={`${theme.colors.card} rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/10`}
              >
                <div className="text-center mb-6">
                  <motion.div
                    animate={{ 
                      scale: isPlaying ? [1, 1.1, 1] : 1,
                      rotate: isPlaying ? [0, 5, -5, 0] : 0
                    }}
                    transition={{ 
                      duration: 0.5, 
                      repeat: isPlaying ? Infinity : 0,
                      ease: "easeInOut"
                    }}
                    className="text-6xl mb-4"
                  >
                    {emotion?.icon || soundscape.emoji}
                  </motion.div>
                  
                  <h3 className={`text-2xl font-bold bg-gradient-to-r ${soundscape.color} bg-clip-text text-transparent mb-2`}>
                    {soundscape.title}
                  </h3>
                  
                  <div className={`w-20 h-1 bg-gradient-to-r ${soundscape.color} rounded-full mx-auto mb-4`}></div>
                  
                  <p className={`${theme.colors.textSecondary} text-sm leading-relaxed mb-6`}>
                    {soundscape.description}
                  </p>
                </div>

                {/* Sound Elements */}
                <div className="mb-6">
                  <h4 className={`text-sm font-semibold ${theme.colors.text} mb-3 text-center`}>
                    Składniki dźwiękowe:
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {soundscape.sounds.map((sound, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.05 * idx }}
                        className={`p-2 ${theme.colors.card} border border-white/20 rounded-lg text-center`}
                      >
                        <span className={`text-xs ${theme.colors.text}`}>
                          {sound}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Play Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => playSound(emotionId)}
                  className={`w-full py-3 bg-gradient-to-r ${soundscape.color} text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2`}
                >
                  <span className="text-xl">
                    {isPlaying ? '⏸️' : '▶️'}
                  </span>
                  <span>
                    {isPlaying ? 'Zatrzymaj' : 'Odtwórz'}
                  </span>
                </motion.button>

                {/* Visual Equalizer */}
                {isPlaying && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-4 flex justify-center space-x-1"
                  >
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className={`w-1 bg-gradient-to-t ${soundscape.color} rounded-full`}
                        animate={{
                          height: [4, Math.random() * 20 + 10, 4],
                        }}
                        transition={{
                          duration: 0.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: i * 0.1
                        }}
                      />
                    ))}
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Currently Playing */}
        {currentPlaying && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 ${theme.colors.card} rounded-2xl p-4 shadow-2xl border border-white/20 z-50`}
          >
            <div className="flex items-center space-x-4">
              <div className="text-2xl">
                {emotions[currentPlaying]?.icon || soundscapes[currentPlaying]?.emoji}
              </div>
              <div>
                <div className={`font-semibold ${theme.colors.text}`}>
                  Obecnie odtwarzane
                </div>
                <div className={`text-sm ${theme.colors.textSecondary}`}>
                  {soundscapes[currentPlaying]?.title}
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setCurrentPlaying(null)}
                className={`p-2 hover:bg-white/10 rounded-lg transition-colors ${theme.colors.text}`}
              >
                ⏹️
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Benefits Section */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className={`mt-16 ${theme.colors.card} rounded-2xl p-8 text-center`}
        >
          <h2 className={`text-3xl font-bold ${theme.colors.text} mb-6`}>
            🎵 Jak dźwięki wpływają na emocje?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-4xl mb-3">🧠</div>
              <h3 className={`font-semibold ${theme.colors.text} mb-2`}>
                Neuroplastyczność
              </h3>
              <p className={`text-sm ${theme.colors.textSecondary}`}>
                Muzyka kształtuje połączenia neuronalne i wpływa na nastrój
              </p>
            </div>
            <div>
              <div className="text-4xl mb-3">💫</div>
              <h3 className={`font-semibold ${theme.colors.text} mb-2`}>
                Regulacja Emocji
              </h3>
              <p className={`text-sm ${theme.colors.textSecondary}`}>
                Odpowiednie dźwięki pomagają w zarządzaniu stanami emocjonalnymi
              </p>
            </div>
            <div>
              <div className="text-4xl mb-3">🌈</div>
              <h3 className={`font-semibold ${theme.colors.text} mb-2`}>
                Terapia Dźwiękiem
              </h3>
              <p className={`text-sm ${theme.colors.textSecondary}`}>
                Muzykoterapia to uznana metoda leczenia i rozwoju osobistego
              </p>
            </div>
          </div>
        </motion.div>

        {/* Usage Tips */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
          className={`mt-8 ${theme.colors.card} rounded-2xl p-6`}
        >
          <h3 className={`text-xl font-bold ${theme.colors.text} mb-4 text-center`}>
            💡 Jak korzystać z galerii dźwięków?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className={`p-3 ${theme.colors.card} border border-white/20 rounded-lg`}>
              <span className={`font-semibold ${theme.colors.text}`}>🎧 Używaj słuchawek</span>
              <p className={`${theme.colors.textSecondary} mt-1`}>
                Lepsze doświadczenie dźwiękowe i większa koncentracja
              </p>
            </div>
            <div className={`p-3 ${theme.colors.card} border border-white/20 rounded-lg`}>
              <span className={`font-semibold ${theme.colors.text}`}>⏰ Regularnie</span>
              <p className={`${theme.colors.textSecondary} mt-1`}>
                Słuchaj codziennie przez 5-10 minut dla najlepszych efektów
              </p>
            </div>
            <div className={`p-3 ${theme.colors.card} border border-white/20 rounded-lg`}>
              <span className={`font-semibold ${theme.colors.text}`}>🧘 Połącz z oddechem</span>
              <p className={`${theme.colors.textSecondary} mt-1`}>
                Synchronizuj oddech z rytmem dla głębszego relaksu
              </p>
            </div>
            <div className={`p-3 ${theme.colors.card} border border-white/20 rounded-lg`}>
              <span className={`font-semibold ${theme.colors.text}`}>📝 Notuj odczucia</span>
              <p className={`${theme.colors.textSecondary} mt-1`}>
                Zapisuj, jak różne dźwięki wpływają na Twoje emocje
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SoundGalleryPage;