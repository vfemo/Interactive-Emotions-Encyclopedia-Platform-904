import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const MindfulnessExercises = () => {
  const { theme } = useTheme();
  const [selectedMeditation, setSelectedMeditation] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [timer, setTimer] = useState(0);

  const meditations = [
    {
      id: 'sadness',
      title: 'Medytacja na Smutek',
      description: 'Łagodna medytacja pomagająca przetworzyć trudne emocje',
      duration: '10 minut',
      color: 'from-blue-400 to-indigo-600',
      icon: '🌙',
      steps: [
        'Usiądź wygodnie i zamknij oczy',
        'Skup się na swoim oddechu',
        'Pozwól sobie odczuć smutek bez osądzania',
        'Wyobraź sobie, że smutek to chmura, która przepływa przez niebo',
        'Wyślij sobie współczucie i akceptację',
        'Powoli otwórz oczy'
      ]
    },
    {
      id: 'anxiety',
      title: 'Uspokojenie dla Lęku',
      description: 'Techniki uziemiania i uspokojenia umysłu',
      duration: '8 minut',
      color: 'from-green-400 to-teal-600',
      icon: '🌿',
      steps: [
        'Znajdź spokojne miejsce i usiądź stabilnie',
        'Wykonaj 5 głębokich oddechów',
        'Poczuj kontakt swoich stóp z podłożem',
        'Nazwij 5 rzeczy, które widzisz wokół siebie',
        'Nazwij 4 rzeczy, których możesz dotknąć',
        'Nazwij 3 dźwięki, które słyszysz',
        'Poczuj spokój i bezpieczeństwo'
      ]
    },
    {
      id: 'anger',
      title: 'Transformacja Złości',
      description: 'Przekształć złość w konstruktywną energię',
      duration: '12 minut',
      color: 'from-orange-400 to-red-600',
      icon: '🔥',
      steps: [
        'Usiądź w pozycji, w której czujesz się silny',
        'Oddychaj głęboko i poczuj swoją złość',
        'Wyobraź sobie złość jako energię w swoim ciele',
        'Skieruj tę energię w stronę pozytywnej zmiany',
        'Poczuj swoją siłę i determinację',
        'Zakończ z poczuciem spokoju i jasności'
      ]
    },
    {
      id: 'joy',
      title: 'Wzmocnienie Radości',
      description: 'Pogłęb i przedłuż uczucie szczęścia',
      duration: '7 minut',
      color: 'from-yellow-400 to-orange-500',
      icon: '☀️',
      steps: [
        'Usiądź z uśmiechem na twarzy',
        'Przypomnij sobie szczęśliwy moment',
        'Poczuj radość wypełniającą całe ciało',
        'Wyślij tę radość do wszystkich komórek',
        'Podziel się tą radością z światem',
        'Zakończ z wdzięcznością'
      ]
    }
  ];

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const startMeditation = (meditation) => {
    setSelectedMeditation(meditation);
    setCurrentStep(0);
    setTimer(0);
    setIsPlaying(false);
  };

  const toggleMeditation = () => {
    setIsPlaying(!isPlaying);
  };

  const nextStep = () => {
    if (currentStep < selectedMeditation.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsPlaying(false);
      setCurrentStep(0);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (selectedMeditation) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-2xl mx-auto text-center"
      >
        <div className={`${theme.colors.card} rounded-2xl p-8 shadow-xl`}>
          <button
            onClick={() => setSelectedMeditation(null)}
            className={`mb-6 px-4 py-2 ${theme.colors.textSecondary} hover:${theme.colors.text} transition-colors`}
          >
            ← Powrót do medytacji
          </button>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="text-8xl mb-6"
          >
            {selectedMeditation.icon}
          </motion.div>

          <h2 className={`text-3xl font-bold bg-gradient-to-r ${selectedMeditation.color} bg-clip-text text-transparent mb-4`}>
            {selectedMeditation.title}
          </h2>

          <div className={`text-2xl font-mono ${theme.colors.text} mb-8`}>
            {formatTime(timer)}
          </div>

          {/* Current Step */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`p-6 bg-gradient-to-r ${selectedMeditation.color} bg-opacity-10 rounded-xl mb-8`}
            >
              <h3 className={`text-lg font-semibold ${theme.colors.text} mb-3`}>
                Krok {currentStep + 1} z {selectedMeditation.steps.length}
              </h3>
              <p className={`text-xl ${theme.colors.text} leading-relaxed`}>
                {selectedMeditation.steps[currentStep]}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex justify-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleMeditation}
              className={`px-8 py-3 bg-gradient-to-r ${selectedMeditation.color} text-white rounded-lg font-semibold shadow-lg flex items-center space-x-2`}
            >
              <span>{isPlaying ? '⏸️' : '▶️'}</span>
              <span>{isPlaying ? 'Pauza' : 'Start'}</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={nextStep}
              className={`px-6 py-3 ${theme.colors.card} ${theme.colors.text} rounded-lg font-semibold border-2 border-white/20`}
            >
              Następny →
            </motion.button>
          </div>

          {/* Progress Bar */}
          <div className={`mt-8 w-full h-2 ${theme.colors.card} rounded-full overflow-hidden`}>
            <motion.div
              className={`h-full bg-gradient-to-r ${selectedMeditation.color} rounded-full`}
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / selectedMeditation.steps.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
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
          Medytacje i Mindfulness
        </h2>
        <p className={`text-lg ${theme.colors.textSecondary} max-w-2xl mx-auto`}>
          Wybierz medytację odpowiednią dla Twojego obecnego stanu emocjonalnego
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {meditations.map((meditation, index) => (
          <motion.div
            key={meditation.id}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 * index }}
            whileHover={{ scale: 1.02, y: -5 }}
            className={`${theme.colors.card} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-white/10`}
            onClick={() => startMeditation(meditation)}
          >
            <div className="text-center">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="text-5xl mb-4"
              >
                {meditation.icon}
              </motion.div>
              
              <h3 className={`text-xl font-bold ${theme.colors.text} mb-2`}>
                {meditation.title}
              </h3>
              
              <div className={`w-16 h-1 bg-gradient-to-r ${meditation.color} rounded-full mx-auto mb-3`}></div>
              
              <p className={`${theme.colors.textSecondary} text-sm mb-4 leading-relaxed`}>
                {meditation.description}
              </p>
              
              <div className={`inline-block px-3 py-1 bg-gradient-to-r ${meditation.color} bg-opacity-20 rounded-full text-sm font-medium ${theme.colors.text} mb-4`}>
                {meditation.duration}
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full py-2 bg-gradient-to-r ${meditation.color} text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300`}
              >
                Rozpocznij Medytację
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Tips */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className={`mt-12 ${theme.colors.card} rounded-2xl p-6 text-center`}
      >
        <h3 className={`text-xl font-bold ${theme.colors.text} mb-4`}>
          💡 Wskazówki dla Początkujących
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className={`font-semibold ${theme.colors.text}`}>Znajdź spokojne miejsce</span>
            <p className={`${theme.colors.textSecondary} mt-1`}>
              Wybierz ciche miejsce, gdzie nikt Cię nie będzie przeszkadzał
            </p>
          </div>
          <div>
            <span className={`font-semibold ${theme.colors.text}`}>Bądź cierpliwy</span>
            <p className={`${theme.colors.textSecondary} mt-1`}>
              Medytacja to praktyka - nie oczekuj natychmiastowych rezultatów
            </p>
          </div>
          <div>
            <span className={`font-semibold ${theme.colors.text}`}>Regularność</span>
            <p className={`${theme.colors.textSecondary} mt-1`}>
              Lepiej medytować 5 minut codziennie niż godzinę raz w tygodniu
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MindfulnessExercises;