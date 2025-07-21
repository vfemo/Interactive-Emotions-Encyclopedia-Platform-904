import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const DailyChallenge = () => {
  const { theme } = useTheme();
  const [currentDay, setCurrentDay] = useState(1);
  const [completedChallenges, setCompletedChallenges] = useState([]);
  const [challengeStarted, setChallengeStarted] = useState(false);

  const challenges = [
    {
      day: 1,
      title: 'Dzień Uważności Emocjonalnej',
      description: 'Przez cały dzień zwracaj uwagę na swoje emocje',
      icon: '👁️',
      color: 'from-blue-400 to-purple-600',
      tasks: [
        'Rano: Zapisz, jak się czujesz po przebudzeniu',
        'W południe: Zauważ, jakie emocje towarzyszą Ci podczas jedzenia',
        'Wieczorem: Przeanalizuj najsilniejszą emocję dnia',
        'Przed snem: Napisz krótką refleksję o swoich odkryciach'
      ],
      tip: 'Nie oceniaj swoich emocji - po prostu je obserwuj jak chmury na niebie.'
    },
    {
      day: 2,
      title: 'Dzień Wdzięczności',
      description: 'Skup się na pozytywnych emocjach i wdzięczności',
      icon: '🙏',
      color: 'from-yellow-400 to-orange-500',
      tasks: [
        'Napisz 5 rzeczy, za które jesteś wdzięczny/a',
        'Wyślij komuś wiadomość z podziękowaniem',
        'Znajdź piękno w czymś zwyczajnym',
        'Przed snem podziękuj sobie za dzisiejszy dzień'
      ],
      tip: 'Wdzięczność to najprostszy sposób na poprawę nastroju.'
    },
    {
      day: 3,
      title: 'Dzień Transformacji Złości',
      description: 'Naucz się konstruktywnie pracować ze złością',
      icon: '🔥',
      color: 'from-red-400 to-orange-600',
      tasks: [
        'Gdy poczujesz złość, zatrzymaj się na 10 sekund',
        'Zadaj sobie pytanie: "Co ta złość chce mi powiedzieć?"',
        'Wykonaj 20 pompek lub przejdź szybkim krokiem',
        'Zapisz, co możesz zmienić, a czego nie możesz kontrolować'
      ],
      tip: 'Złość to energia - możesz ją zniszczyć lub przekształcić w siłę.'
    },
    {
      day: 4,
      title: 'Dzień Współczucia dla Siebie',
      description: 'Praktykuj łagodność i zrozumienie wobec siebie',
      icon: '💝',
      color: 'from-pink-400 to-rose-600',
      tasks: [
        'Gdy popełnisz błąd, powiedz sobie: "Jestem człowiekiem"',
        'Napisz list do siebie pełen współczucia',
        'Zrób coś miłego dla siebie (herbata, kąpiel, ulubiona muzyka)',
        'Przytul się do siebie lub kogoś bliskiego'
      ],
      tip: 'Bądź dla siebie tak dobry, jak dla najlepszego przyjaciela.'
    },
    {
      day: 5,
      title: 'Dzień Oddechu i Spokoju',
      description: 'Znajdź wewnętrzny spokój poprzez świadome oddychanie',
      icon: '🧘',
      color: 'from-green-400 to-teal-600',
      tasks: [
        'Rano: 5 minut świadomego oddychania',
        'Co 2 godziny: 3 głębokie oddechy',
        'Znajdź 10 minut na ciszę (bez telefonu, bez muzyki)',
        'Wieczorem: medytacja lub relaksacja przed snem'
      ],
      tip: 'Oddech to most między ciałem a umysłem.'
    },
    {
      day: 6,
      title: 'Dzień Emocjonalnej Komunikacji',
      description: 'Ćwicz otwarte wyrażanie swoich uczuć',
      icon: '💬',
      color: 'from-indigo-400 to-blue-600',
      tasks: [
        'Powiedz komuś, jak się czujesz (bez oskarżania)',
        'Zapytaj bliską osobę o jej emocje',
        'Użyj "ja czuję..." zamiast "ty zawsze..."',
        'Wysłuchaj kogoś bez dawania rad'
      ],
      tip: 'Emocje dzielone to emocje zmniejszone (jeśli negatywne) lub podwojone (jeśli pozytywne).'
    },
    {
      day: 7,
      title: 'Dzień Podsumowania i Planów',
      description: 'Podsumuj tydzień i zaplanuj dalszy rozwój emocjonalny',
      icon: '🌟',
      color: 'from-purple-400 to-pink-600',
      tasks: [
        'Przejrzyj zapiski z całego tygodnia',
        'Napisz, czego się nauczyłeś/aś o swoich emocjach',
        'Wybierz jedną technikę, którą będziesz kontynuować',
        'Zaplanuj swój następny krok w rozwoju emocjonalnym'
      ],
      tip: 'Rozwój emocjonalny to maraton, nie sprint. Każdy krok się liczy.'
    }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('emotionChallengeProgress');
    if (saved) {
      const { completed, day, started } = JSON.parse(saved);
      setCompletedChallenges(completed || []);
      setCurrentDay(day || 1);
      setChallengeStarted(started || false);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('emotionChallengeProgress', JSON.stringify({
      completed: completedChallenges,
      day: currentDay,
      started: challengeStarted
    }));
  }, [completedChallenges, currentDay, challengeStarted]);

  const startChallenge = () => {
    setChallengeStarted(true);
    setCurrentDay(1);
    setCompletedChallenges([]);
  };

  const completeDay = (day) => {
    if (!completedChallenges.includes(day)) {
      setCompletedChallenges([...completedChallenges, day]);
      if (day === currentDay && day < 7) {
        setCurrentDay(day + 1);
      }
    }
  };

  const resetChallenge = () => {
    setChallengeStarted(false);
    setCurrentDay(1);
    setCompletedChallenges([]);
    localStorage.removeItem('emotionChallengeProgress');
  };

  const currentChallenge = challenges.find(c => c.day === currentDay);
  const progress = (completedChallenges.length / 7) * 100;

  if (!challengeStarted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-2xl mx-auto text-center"
      >
        <div className={`${theme.colors.card} rounded-2xl p-8 shadow-xl`}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="text-8xl mb-6"
          >
            🏆
          </motion.div>

          <h2 className={`text-3xl font-bold bg-gradient-to-r ${theme.colors.primary} bg-clip-text text-transparent mb-6`}>
            7-Dniowe Wyzwanie Emocjonalne
          </h2>

          <p className={`text-lg ${theme.colors.textSecondary} mb-8 leading-relaxed`}>
            Rozpocznij tygodniową podróż odkrywania i rozwijania swojej inteligencji emocjonalnej. 
            Każdy dzień przyniesie nowe zadania i odkrycia.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className={`p-4 ${theme.colors.card} border border-white/20 rounded-lg`}>
              <div className="text-3xl mb-2">📝</div>
              <h3 className={`font-semibold ${theme.colors.text} mb-1`}>Codzienne Zadania</h3>
              <p className={`text-sm ${theme.colors.textSecondary}`}>
                Praktyczne ćwiczenia do wykonania każdego dnia
              </p>
            </div>
            <div className={`p-4 ${theme.colors.card} border border-white/20 rounded-lg`}>
              <div className="text-3xl mb-2">🎯</div>
              <h3 className={`font-semibold ${theme.colors.text} mb-1`}>Postęp</h3>
              <p className={`text-sm ${theme.colors.textSecondary}`}>
                Śledź swój rozwój i osiągnięcia
              </p>
            </div>
            <div className={`p-4 ${theme.colors.card} border border-white/20 rounded-lg`}>
              <div className="text-3xl mb-2">💡</div>
              <h3 className={`font-semibold ${theme.colors.text} mb-1`}>Wskazówki</h3>
              <p className={`text-sm ${theme.colors.textSecondary}`}>
                Cenne rady od ekspertów
              </p>
            </div>
            <div className={`p-4 ${theme.colors.card} border border-white/20 rounded-lg`}>
              <div className="text-3xl mb-2">🌱</div>
              <h3 className={`font-semibold ${theme.colors.text} mb-1`}>Rozwój</h3>
              <p className={`text-sm ${theme.colors.textSecondary}`}>
                Trwały wzrost emocjonalny
              </p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startChallenge}
            className={`px-8 py-4 bg-gradient-to-r ${theme.colors.primary} text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-lg`}
          >
            Rozpocznij Wyzwanie
          </motion.button>
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
      {/* Progress Header */}
      <div className={`${theme.colors.card} rounded-2xl p-6 shadow-xl mb-8`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className={`text-2xl font-bold ${theme.colors.text}`}>
            7-Dniowe Wyzwanie Emocjonalne
          </h2>
          <button
            onClick={resetChallenge}
            className={`px-4 py-2 ${theme.colors.textSecondary} hover:${theme.colors.text} transition-colors text-sm`}
          >
            Reset
          </button>
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className={`text-sm ${theme.colors.text}`}>Postęp: {completedChallenges.length}/7 dni</span>
            <span className={`text-sm ${theme.colors.textSecondary}`}>{Math.round(progress)}%</span>
          </div>
          <div className={`w-full h-3 ${theme.colors.card} rounded-full overflow-hidden`}>
            <motion.div
              className={`h-full bg-gradient-to-r ${theme.colors.primary} rounded-full`}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Days Overview */}
        <div className="grid grid-cols-7 gap-2">
          {challenges.map((challenge) => (
            <div
              key={challenge.day}
              className={`text-center p-2 rounded-lg transition-all duration-300 ${
                completedChallenges.includes(challenge.day)
                  ? `bg-gradient-to-r ${challenge.color} text-white`
                  : challenge.day === currentDay
                  ? `bg-gradient-to-r ${challenge.color} bg-opacity-30 border-2 border-white/50`
                  : `${theme.colors.card} border border-white/20`
              }`}
            >
              <div className="text-lg mb-1">{challenge.icon}</div>
              <div className={`text-xs font-medium ${
                completedChallenges.includes(challenge.day) || challenge.day === currentDay
                  ? 'text-white' 
                  : theme.colors.text
              }`}>
                Dzień {challenge.day}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Current Challenge */}
      {currentChallenge && (
        <motion.div
          key={currentDay}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`${theme.colors.card} rounded-2xl p-8 shadow-xl`}
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="text-6xl mb-4"
            >
              {currentChallenge.icon}
            </motion.div>

            <h3 className={`text-3xl font-bold bg-gradient-to-r ${currentChallenge.color} bg-clip-text text-transparent mb-4`}>
              Dzień {currentChallenge.day}: {currentChallenge.title}
            </h3>

            <p className={`text-lg ${theme.colors.textSecondary} leading-relaxed max-w-2xl mx-auto`}>
              {currentChallenge.description}
            </p>
          </div>

          {/* Tasks */}
          <div className="mb-8">
            <h4 className={`text-xl font-semibold ${theme.colors.text} mb-6 text-center`}>
              Dzisiejsze Zadania
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentChallenge.tasks.map((task, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className={`p-4 ${theme.colors.card} border border-white/20 rounded-lg`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${currentChallenge.color} flex items-center justify-center text-white font-bold text-sm flex-shrink-0 mt-1`}>
                      {index + 1}
                    </div>
                    <p className={`${theme.colors.text} leading-relaxed`}>
                      {task}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Tip */}
          <div className={`p-6 bg-gradient-to-r ${currentChallenge.color} bg-opacity-10 rounded-xl mb-8`}>
            <h4 className={`font-semibold ${theme.colors.text} mb-2 flex items-center`}>
              💡 Wskazówka dnia
            </h4>
            <p className={`${theme.colors.textSecondary} italic leading-relaxed`}>
              {currentChallenge.tip}
            </p>
          </div>

          {/* Complete Button */}
          <div className="text-center">
            {completedChallenges.includes(currentDay) ? (
              <div className={`inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r ${currentChallenge.color} text-white rounded-lg font-semibold`}>
                <span>✅</span>
                <span>Dzień Ukończony!</span>
              </div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => completeDay(currentDay)}
                className={`px-8 py-3 bg-gradient-to-r ${currentChallenge.color} text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300`}
              >
                Oznacz jako Ukończone
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* Completion Celebration */}
      {completedChallenges.length === 7 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`mt-8 ${theme.colors.card} rounded-2xl p-8 shadow-xl text-center`}
        >
          <div className="text-8xl mb-6">🎉</div>
          <h3 className={`text-3xl font-bold bg-gradient-to-r ${theme.colors.primary} bg-clip-text text-transparent mb-4`}>
            Gratulacje! Ukończyłeś Wyzwanie!
          </h3>
          <p className={`text-lg ${theme.colors.textSecondary} mb-6`}>
            Przeszedłeś 7-dniową podróż rozwoju emocjonalnego. To dopiero początek!
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startChallenge}
            className={`px-8 py-3 bg-gradient-to-r ${theme.colors.primary} text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300`}
          >
            Rozpocznij Ponownie
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default DailyChallenge;