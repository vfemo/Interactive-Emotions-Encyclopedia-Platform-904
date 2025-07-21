import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const BreathingExercise = () => {
  const { theme } = useTheme();
  const [selectedTechnique, setSelectedTechnique] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState('inhale');
  const [count, setCount] = useState(0);
  const [cycle, setCycle] = useState(0);

  const techniques = [
    {
      id: '4-7-8',
      name: 'Technika 4-7-8',
      description: 'Uspokajająca technika do redukcji stresu i lęku',
      icon: '🌊',
      color: 'from-blue-400 to-teal-600',
      phases: [
        { name: 'inhale', duration: 4, text: 'Wdech' },
        { name: 'hold', duration: 7, text: 'Zatrzymaj' },
        { name: 'exhale', duration: 8, text: 'Wydech' }
      ],
      totalCycles: 4,
      benefits: ['Redukcja stresu', 'Lepszy sen', 'Uspokojenie umysłu']
    },
    {
      id: 'box',
      name: 'Oddychanie Pudełkowe',
      description: 'Równomierne oddychanie dla koncentracji',
      icon: '📦',
      color: 'from-purple-400 to-indigo-600',
      phases: [
        { name: 'inhale', duration: 4, text: 'Wdech' },
        { name: 'hold', duration: 4, text: 'Zatrzymaj' },
        { name: 'exhale', duration: 4, text: 'Wydech' },
        { name: 'hold', duration: 4, text: 'Zatrzymaj' }
      ],
      totalCycles: 6,
      benefits: ['Lepsza koncentracja', 'Równowaga', 'Kontrola emocji']
    },
    {
      id: 'energizing',
      name: 'Oddech Energetyzujący',
      description: 'Szybkie oddychanie dla zwiększenia energii',
      icon: '⚡',
      color: 'from-orange-400 to-red-600',
      phases: [
        { name: 'inhale', duration: 2, text: 'Wdech' },
        { name: 'exhale', duration: 2, text: 'Wydech' }
      ],
      totalCycles: 10,
      benefits: ['Więcej energii', 'Poprawa nastroju', 'Aktywacja']
    },
    {
      id: 'calming',
      name: 'Oddech Uspokajający',
      description: 'Długie wydechy dla głębokiego relaksu',
      icon: '🌙',
      color: 'from-indigo-400 to-purple-600',
      phases: [
        { name: 'inhale', duration: 4, text: 'Wdech' },
        { name: 'exhale', duration: 8, text: 'Wydech' }
      ],
      totalCycles: 8,
      benefits: ['Głęboki relaks', 'Uspokojenie', 'Przygotowanie do snu']
    }
  ];

  useEffect(() => {
    if (!isActive || !selectedTechnique) return;

    const currentPhase = selectedTechnique.phases[phase === 'inhale' ? 0 : 
                        phase === 'hold' ? 1 : 
                        phase === 'exhale' ? (selectedTechnique.phases.length === 4 ? 2 : 1) : 
                        3];
    
    if (!currentPhase) return;

    const timer = setInterval(() => {
      setCount(prev => {
        if (prev >= currentPhase.duration) {
          // Move to next phase
          const currentPhaseIndex = selectedTechnique.phases.findIndex(p => p.name === phase);
          const nextPhaseIndex = (currentPhaseIndex + 1) % selectedTechnique.phases.length;
          
          if (nextPhaseIndex === 0) {
            setCycle(prev => prev + 1);
          }
          
          setPhase(selectedTechnique.phases[nextPhaseIndex].name);
          return 1;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, phase, selectedTechnique]);

  useEffect(() => {
    if (cycle >= selectedTechnique?.totalCycles) {
      setIsActive(false);
      setCycle(0);
      setCount(0);
      setPhase('inhale');
    }
  }, [cycle, selectedTechnique]);

  const startExercise = (technique) => {
    setSelectedTechnique(technique);
    setIsActive(false);
    setPhase('inhale');
    setCount(0);
    setCycle(0);
  };

  const toggleExercise = () => {
    setIsActive(!isActive);
    if (!isActive) {
      setCount(1);
    }
  };

  const resetExercise = () => {
    setIsActive(false);
    setPhase('inhale');
    setCount(0);
    setCycle(0);
  };

  const getCurrentPhase = () => {
    if (!selectedTechnique) return null;
    return selectedTechnique.phases.find(p => p.name === phase);
  };

  const getCircleScale = () => {
    if (!isActive || !selectedTechnique) return 1;
    
    const currentPhase = getCurrentPhase();
    if (!currentPhase) return 1;

    if (phase === 'inhale') {
      return 1 + (count / currentPhase.duration) * 0.5;
    } else if (phase === 'exhale') {
      return 1.5 - (count / currentPhase.duration) * 0.5;
    }
    return 1.5;
  };

  if (selectedTechnique) {
    const currentPhase = getCurrentPhase();
    
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-2xl mx-auto text-center"
      >
        <div className={`${theme.colors.card} rounded-2xl p-8 shadow-xl`}>
          <button
            onClick={() => setSelectedTechnique(null)}
            className={`mb-6 px-4 py-2 ${theme.colors.textSecondary} hover:${theme.colors.text} transition-colors`}
          >
            ← Powrót do technik
          </button>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="text-6xl mb-6"
          >
            {selectedTechnique.icon}
          </motion.div>

          <h2 className={`text-3xl font-bold bg-gradient-to-r ${selectedTechnique.color} bg-clip-text text-transparent mb-8`}>
            {selectedTechnique.name}
          </h2>

          {/* Breathing Circle */}
          <div className="relative w-80 h-80 mx-auto mb-8">
            <motion.div
              className={`absolute inset-0 rounded-full bg-gradient-to-r ${selectedTechnique.color} opacity-20`}
              animate={{ scale: getCircleScale() }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
            <motion.div
              className={`absolute inset-8 rounded-full bg-gradient-to-r ${selectedTechnique.color} opacity-40`}
              animate={{ scale: getCircleScale() }}
              transition={{ duration: 1, ease: "easeInOut", delay: 0.1 }}
            />
            <motion.div
              className={`absolute inset-16 rounded-full bg-gradient-to-r ${selectedTechnique.color} opacity-60`}
              animate={{ scale: getCircleScale() }}
              transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
            />
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className={`text-2xl font-bold ${theme.colors.text} mb-2`}>
                  {currentPhase?.text || 'Przygotuj się'}
                </div>
                <div className={`text-4xl font-mono ${theme.colors.text}`}>
                  {isActive ? count : '0'}
                </div>
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="mb-8">
            <div className={`text-lg ${theme.colors.text} mb-2`}>
              Cykl {cycle + 1} z {selectedTechnique.totalCycles}
            </div>
            <div className={`w-full h-2 ${theme.colors.card} rounded-full overflow-hidden`}>
              <motion.div
                className={`h-full bg-gradient-to-r ${selectedTechnique.color} rounded-full`}
                initial={{ width: 0 }}
                animate={{ width: `${(cycle / selectedTechnique.totalCycles) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleExercise}
              className={`px-8 py-3 bg-gradient-to-r ${selectedTechnique.color} text-white rounded-lg font-semibold shadow-lg flex items-center space-x-2`}
            >
              <span>{isActive ? '⏸️' : '▶️'}</span>
              <span>{isActive ? 'Pauza' : 'Start'}</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetExercise}
              className={`px-6 py-3 ${theme.colors.card} ${theme.colors.text} rounded-lg font-semibold border-2 border-white/20`}
            >
              Reset
            </motion.button>
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
          Ćwiczenia Oddechowe
        </h2>
        <p className={`text-lg ${theme.colors.textSecondary} max-w-2xl mx-auto`}>
          Wybierz technikę oddychania odpowiednią dla Twojego celu
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {techniques.map((technique, index) => (
          <motion.div
            key={technique.id}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 * index }}
            whileHover={{ scale: 1.02, y: -5 }}
            className={`${theme.colors.card} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-white/10`}
            onClick={() => startExercise(technique)}
          >
            <div className="text-center">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="text-5xl mb-4"
              >
                {technique.icon}
              </motion.div>
              
              <h3 className={`text-xl font-bold ${theme.colors.text} mb-2`}>
                {technique.name}
              </h3>
              
              <div className={`w-16 h-1 bg-gradient-to-r ${technique.color} rounded-full mx-auto mb-3`}></div>
              
              <p className={`${theme.colors.textSecondary} text-sm mb-4 leading-relaxed`}>
                {technique.description}
              </p>
              
              <div className="mb-4">
                <div className={`text-sm font-medium ${theme.colors.text} mb-2`}>Korzyści:</div>
                <div className="flex flex-wrap justify-center gap-2">
                  {technique.benefits.map((benefit, idx) => (
                    <span
                      key={idx}
                      className={`px-2 py-1 bg-gradient-to-r ${technique.color} bg-opacity-20 rounded-full text-xs ${theme.colors.text}`}
                    >
                      {benefit}
                    </span>
                  ))}
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full py-2 bg-gradient-to-r ${technique.color} text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300`}
              >
                Rozpocznij Ćwiczenie
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Instructions */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className={`mt-12 ${theme.colors.card} rounded-2xl p-6 text-center`}
      >
        <h3 className={`text-xl font-bold ${theme.colors.text} mb-4`}>
          🫁 Jak prawidłowo oddychać?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className={`font-semibold ${theme.colors.text}`}>Pozycja</span>
            <p className={`${theme.colors.textSecondary} mt-1`}>
              Usiądź wygodnie z prostymi plecami lub połóż się na płasko
            </p>
          </div>
          <div>
            <span className={`font-semibold ${theme.colors.text}`}>Oddech brzuszny</span>
            <p className={`${theme.colors.textSecondary} mt-1`}>
              Oddychaj brzuchem, nie klatką piersiową - brzuch unosi się przy wdechu
            </p>
          </div>
          <div>
            <span className={`font-semibold ${theme.colors.text}`}>Koncentracja</span>
            <p className={`${theme.colors.textSecondary} mt-1`}>
              Skup się tylko na oddechu i liczeniu - pozwól myślom przepływać
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BreathingExercise;