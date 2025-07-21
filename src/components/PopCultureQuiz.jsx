import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const PopCultureQuiz = () => {
  const { theme } = useTheme();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const questions = [
    {
      id: 1,
      question: 'Który film najlepiej oddaje Twój sposób radzenia sobie z problemami?',
      options: [
        { text: 'Gdzie jest Nemo - nigdy się nie poddaję', character: 'nemo', points: 3 },
        { text: 'Joker - czasem czuję się niezrozumiany', character: 'joker', points: 3 },
        { text: 'Król Lew - wierzę w koło życia', character: 'simba', points: 3 },
        { text: 'Frozen - uczę się akceptować siebie', character: 'elsa', points: 3 }
      ]
    },
    {
      id: 2,
      question: 'Jaka piosenka najlepiej opisuje Twój obecny stan emocjonalny?',
      options: [
        { text: 'Happy - Pharrell Williams', character: 'nemo', points: 2 },
        { text: 'Someone Like You - Adele', character: 'joker', points: 2 },
        { text: 'Roar - Katy Perry', character: 'simba', points: 2 },
        { text: 'Let It Go - Frozen', character: 'elsa', points: 2 }
      ]
    },
    {
      id: 3,
      question: 'Jak spędzasz czas, gdy czujesz się przytłoczony?',
      options: [
        { text: 'Szukam przygód, które mnie rozproszą', character: 'nemo', points: 2 },
        { text: 'Zamykam się w sobie i analizuję', character: 'joker', points: 2 },
        { text: 'Rozmawiam z bliskimi o problemach', character: 'simba', points: 2 },
        { text: 'Potrzebuję samotności, żeby się zregenerować', character: 'elsa', points: 2 }
      ]
    },
    {
      id: 4,
      question: 'Co Cię najbardziej motywuje do działania?',
      options: [
        { text: 'Chęć odkrywania nowych rzeczy', character: 'nemo', points: 3 },
        { text: 'Pragnienie zrozumienia świata', character: 'joker', points: 3 },
        { text: 'Odpowiedzialność za innych', character: 'simba', points: 3 },
        { text: 'Dążenie do autentyczności', character: 'elsa', points: 3 }
      ]
    },
    {
      id: 5,
      question: 'Jaki jest Twój największy lęk?',
      options: [
        { text: 'Że nie będę mógł/mogła być sobą', character: 'nemo', points: 2 },
        { text: 'Że nikt mnie nie zrozumie', character: 'joker', points: 3 },
        { text: 'Że zawiodę oczekiwania innych', character: 'simba', points: 2 },
        { text: 'Że skrzywdzę kogoś swoimi emocjami', character: 'elsa', points: 3 }
      ]
    }
  ];

  const characterResults = {
    nemo: {
      name: 'Nemo',
      title: 'Nieustraszony Poszukiwacz! 🐠',
      description: 'Jak Nemo, jesteś osobą pełną ciekawości i determinacji. Nie pozwalasz, żeby przeszkody Cię zatrzymały i zawsze szukasz nowych przygód.',
      traits: ['Odważny', 'Ciekawski', 'Optymistyczny', 'Wytrwały'],
      color: 'from-orange-400 to-blue-500',
      movie: 'Gdzie jest Nemo',
      emotionalAdvice: 'Twój optymizm to Twoja supermoc! Pamiętaj tylko, żeby czasem zwolnić i docenić moment.',
      image: '🐠'
    },
    joker: {
      name: 'Mroczny Myśliciel',
      title: 'Głęboki Analityk! 🎭',
      description: 'Masz skłonność do głębokiego myślenia i analizowania świata. Czasem czujesz się niezrozumiany, ale Twoja wrażliwość to dar.',
      traits: ['Wrażliwy', 'Inteligentny', 'Kreatywny', 'Introspektywny'],
      color: 'from-purple-600 to-gray-800',
      movie: 'Joker (w pozytywnym wydaniu)',
      emotionalAdvice: 'Twoja głębia myślenia to skarb. Znajdź zdrowe sposoby wyrażania swoich emocji.',
      image: '🎭'
    },
    simba: {
      name: 'Simba',
      title: 'Naturalny Przywódca! 🦁',
      description: 'Jak Simba, masz w sobie siłę przywódcy i głębokie poczucie odpowiedzialności. Uczysz się akceptować swoje błędy i rosnąć.',
      traits: ['Odpowiedzialny', 'Odważny', 'Lojalny', 'Mądry'],
      color: 'from-yellow-500 to-red-600',
      movie: 'Król Lew',
      emotionalAdvice: 'Pamiętaj, że każdy popełnia błędy. Twoja siła leży w umiejętności uczenia się z nich.',
      image: '🦁'
    },
    elsa: {
      name: 'Elsa',
      title: 'Mistrzni Transformacji! ❄️',
      description: 'Jak Elsa, przechodzisz przez proces akceptacji siebie. Uczysz się, że Twoje emocje to nie słabość, ale siła.',
      traits: ['Silny', 'Empatyczny', 'Kreatywny', 'Autentyczny'],
      color: 'from-blue-400 to-purple-600',
      movie: 'Frozen',
      emotionalAdvice: 'Twoja autentyczność inspiruje innych. Nie bój się pokazywać swoich prawdziwych emocji.',
      image: '❄️'
    }
  };

  const handleAnswer = (option) => {
    const newAnswers = [...answers, option];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate result
      const characterScores = {};
      newAnswers.forEach(answer => {
        characterScores[answer.character] = (characterScores[answer.character] || 0) + answer.points;
      });

      const dominantCharacter = Object.keys(characterScores).reduce((a, b) => 
        characterScores[a] > characterScores[b] ? a : b
      );

      setAnswers([...newAnswers, { result: dominantCharacter }]);
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
    return characterResults[lastAnswer.result];
  };

  if (showResult) {
    const result = getResult();
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-2xl mx-auto"
      >
        <div className={`${theme.colors.card} rounded-2xl p-8 shadow-xl`}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="text-8xl mb-6"
          >
            {result.image}
          </motion.div>

          <h2 className={`text-3xl font-bold bg-gradient-to-r ${result.color} bg-clip-text text-transparent mb-4`}>
            {result.title}
          </h2>

          <p className={`text-lg ${theme.colors.text} mb-6 leading-relaxed`}>
            {result.description}
          </p>

          <div className={`p-4 bg-gradient-to-r ${result.color} bg-opacity-10 rounded-lg mb-6`}>
            <h3 className={`font-semibold ${theme.colors.text} mb-3`}>🎬 Twój filmowy odpowiednik:</h3>
            <p className={`${theme.colors.textSecondary} text-lg font-medium`}>
              {result.movie}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            {result.traits.map((trait, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className={`p-3 ${theme.colors.card} border border-white/20 rounded-lg`}
              >
                <span className={`${theme.colors.text} font-medium`}>{trait}</span>
              </motion.div>
            ))}
          </div>

          <div className={`p-4 bg-gradient-to-r ${result.color} bg-opacity-10 rounded-lg mb-6`}>
            <p className={`${theme.colors.textSecondary} italic`}>
              💡 {result.emotionalAdvice}
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
              Udostępnij Wynik
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
          className={`h-full bg-gradient-to-r from-pink-500 to-purple-600 rounded-full`}
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
                🎬
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

export default PopCultureQuiz;