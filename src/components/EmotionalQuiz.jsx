import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const EmotionalQuiz = () => {
  const { theme } = useTheme();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const questions = [
    {
      id: 1,
      question: 'Jak reagujesz na niespodziewane zmiany w planach?',
      image: '🔄',
      options: [
        { text: 'Ekscytuję się nowymi możliwościami', emotion: 'ekscytacja', points: 3 },
        { text: 'Czuję się nieco zestresowany, ale adaptuję się', emotion: 'strach', points: 2 },
        { text: 'Irytuje mnie to bardzo', emotion: 'zlosc', points: 3 },
        { text: 'Pozostaję spokojny i elastyczny', emotion: 'spokoj', points: 3 }
      ]
    },
    {
      id: 2,
      question: 'Co czujesz, gdy słuchasz ulubionej muzyki?',
      image: '🎵',
      options: [
        { text: 'Czystą radość i energię', emotion: 'radosc', points: 3 },
        { text: 'Nostalgię i melancholię', emotion: 'smutek', points: 2 },
        { text: 'Spokój i relaks', emotion: 'spokoj', points: 3 },
        { text: 'Motywację do działania', emotion: 'ekscytacja', points: 2 }
      ]
    },
    {
      id: 3,
      question: 'Jak radzisz sobie ze stresem?',
      image: '😰',
      options: [
        { text: 'Szukam wsparcia u bliskich', emotion: 'smutek', points: 2 },
        { text: 'Staram się znaleźć rozwiązanie', emotion: 'ekscytacja', points: 2 },
        { text: 'Potrzebuję chwili samotności', emotion: 'spokoj', points: 3 },
        { text: 'Czasem wybucham złością', emotion: 'zlosc', points: 2 }
      ]
    },
    {
      id: 4,
      question: 'Co Cię najbardziej motywuje?',
      image: '🎯',
      options: [
        { text: 'Radość z osiągnięć', emotion: 'radosc', points: 3 },
        { text: 'Chęć pomocy innym', emotion: 'spokoj', points: 2 },
        { text: 'Walka o sprawiedliwość', emotion: 'zlosc', points: 2 },
        { text: 'Nowe wyzwania', emotion: 'ekscytacja', points: 3 }
      ]
    },
    {
      id: 5,
      question: 'Jak spędzasz wolny czas?',
      image: '🏡',
      options: [
        { text: 'Spotykam się z przyjaciółmi', emotion: 'radosc', points: 2 },
        { text: 'Medytuję lub czytam', emotion: 'spokoj', points: 3 },
        { text: 'Oglądam filmy, które wzruszają', emotion: 'smutek', points: 2 },
        { text: 'Planuję nowe przygody', emotion: 'ekscytacja', points: 3 }
      ]
    }
  ];

  const emotionResults = {
    radosc: {
      title: 'Promyk Słońca! ☀️',
      description: 'Twoja dominująca emocja to RADOŚĆ. Jesteś osobą, która znajduje piękno w codzienności i zarażasz innych swoim pozytywnym nastawieniem.',
      color: 'from-yellow-400 to-orange-500',
      advice: 'Kontynuuj dzielenie się swoją radością z innymi, ale pamiętaj też o akceptowaniu trudniejszych emocji.'
    },
    smutek: {
      title: 'Głęboka Dusza 🌙',
      description: 'Twoja dominująca emocja to SMUTEK. Jesteś osobą wrażliwą, empatyczną i głęboko odczuwającą.',
      color: 'from-blue-500 to-indigo-600',
      advice: 'Twoja wrażliwość to dar. Pamiętaj o dbaniu o siebie i szukaniu wsparcia, gdy go potrzebujesz.'
    },
    strach: {
      title: 'Ostrożny Obserwator 🦉',
      description: 'Twoja dominująca emocja to STRACH. Jesteś osobą rozważną, która dba o bezpieczeństwo swoje i innych.',
      color: 'from-gray-600 to-gray-800',
      advice: 'Twoja ostrożność chroni Cię przed niebezpieczeństwami. Pracuj nad odwagą w bezpiecznych sytuacjach.'
    },
    zlosc: {
      title: 'Wojownik Sprawiedliwości ⚡',
      description: 'Twoja dominująca emocja to ZŁOŚĆ. Jesteś osobą, która walczy o swoje wartości i nie toleruje niesprawiedliwości.',
      color: 'from-red-500 to-red-700',
      advice: 'Twoja pasja może zmieniać świat. Naucz się kanalizować złość w konstruktywne działania.'
    },
    spokoj: {
      title: 'Zen Master 🧘',
      description: 'Twoja dominująca emocja to SPOKÓJ. Jesteś osobą zrównoważoną, która przynosi harmonię otoczeniu.',
      color: 'from-green-400 to-teal-500',
      advice: 'Twój spokój jest darem dla innych. Dziel się swoją mądrością i technikami relaksacyjnymi.'
    },
    ekscytacja: {
      title: 'Poszukiwacz Przygód 🚀',
      description: 'Twoja dominująca emocja to EKSCYTACJA. Jesteś osobą pełną energii, która kocha nowe doświadczenia.',
      color: 'from-purple-500 to-pink-500',
      advice: 'Twój entuzjazm inspiruje innych. Pamiętaj o równoważeniu ekscytacji ze spokojem.'
    }
  };

  const handleAnswer = (option) => {
    const newAnswers = [...answers, option];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate result
      const emotionScores = {};
      newAnswers.forEach(answer => {
        emotionScores[answer.emotion] = (emotionScores[answer.emotion] || 0) + answer.points;
      });

      const dominantEmotion = Object.keys(emotionScores).reduce((a, b) => 
        emotionScores[a] > emotionScores[b] ? a : b
      );

      setAnswers([...newAnswers, { result: dominantEmotion }]);
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
  };

  const getResult = () => {
    const lastAnswer = answers[answers.length - 1];
    return emotionResults[lastAnswer.result];
  };

  if (showResult) {
    const result = getResult();
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <div className={`${theme.colors.card} rounded-2xl p-8 shadow-xl`}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="text-8xl mb-6"
          >
            🎉
          </motion.div>

          <h2 className={`text-3xl font-bold bg-gradient-to-r ${result.color} bg-clip-text text-transparent mb-4`}>
            {result.title}
          </h2>

          <p className={`text-lg ${theme.colors.text} mb-6 leading-relaxed`}>
            {result.description}
          </p>

          <div className={`p-4 bg-gradient-to-r ${result.color} bg-opacity-10 rounded-lg mb-6`}>
            <p className={`${theme.colors.textSecondary} italic`}>
              💡 {result.advice}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetQuiz}
              className={`px-6 py-3 bg-gradient-to-r ${result.color} text-white rounded-lg font-semibold shadow-lg`}
            >
              Powtórz Test
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 ${theme.colors.card} ${theme.colors.text} rounded-lg font-semibold border-2 border-white/20`}
            >
              Zapisz Wynik
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-2xl mx-auto"
    >
      {/* Progress Bar */}
      <div className={`w-full h-2 ${theme.colors.card} rounded-full mb-8 overflow-hidden`}>
        <motion.div
          className={`h-full bg-gradient-to-r ${theme.colors.primary} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <div className={`${theme.colors.card} rounded-2xl p-8 shadow-xl`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            {/* Question */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="text-6xl mb-4"
              >
                {question.image}
              </motion.div>
              
              <h2 className={`text-2xl font-bold ${theme.colors.text} mb-2`}>
                Pytanie {currentQuestion + 1} z {questions.length}
              </h2>
              
              <p className={`text-lg ${theme.colors.textSecondary} leading-relaxed`}>
                {question.question}
              </p>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ scale: 1.02, x: 10 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(option)}
                  className={`w-full p-4 text-left ${theme.colors.card} border border-white/10 rounded-lg ${theme.colors.text} hover:bg-white/5 transition-all duration-300 shadow-sm hover:shadow-md`}
                >
                  <span className="font-medium">{option.text}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default EmotionalQuiz;