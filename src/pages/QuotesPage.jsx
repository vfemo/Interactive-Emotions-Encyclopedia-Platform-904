import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const QuotesPage = () => {
  const { theme } = useTheme();
  const [currentQuote, setCurrentQuote] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('wszystkie');
  const [favorites, setFavorites] = useState([]);

  const quotes = [
    {
      text: "Emocje są jak fale - możesz nauczyć się na nich surfować, ale nie możesz ich zatrzymać.",
      author: "Jon Kabat-Zinn",
      category: 'mindfulness',
      emotion: 'spokoj'
    },
    {
      text: "Nie możesz kontrolować tego, co się dzieje, ale możesz kontrolować to, jak na to reagujesz.",
      author: "Epiktet",
      category: 'filozofia',
      emotion: 'spokoj'
    },
    {
      text: "Radość nie przychodzi z zewnątrz - jest w tobie przez cały czas.",
      author: "Rumi",
      category: 'duchowość',
      emotion: 'radosc'
    },
    {
      text: "Smutek to naturalna część życia. Pozwól mu przepłynąć przez siebie jak rzeka.",
      author: "Pema Chödrön",
      category: 'mindfulness',
      emotion: 'smutek'
    },
    {
      text: "Złość jest kwasem, który może wyrządzić więcej szkody naczyniu, w którym jest przechowywany, niż temu, na co jest wylany.",
      author: "Mark Twain",
      category: 'mądrość',
      emotion: 'zlosc'
    },
    {
      text: "Strach to kompas wskazujący kierunek, w którym musisz iść.",
      author: "Steven Pressfield",
      category: 'rozwój',
      emotion: 'strach'
    },
    {
      text: "Między bodźcem a reakcją jest przestrzeń. W tej przestrzeni leży nasza moc wyboru.",
      author: "Viktor Frankl",
      category: 'psychologia',
      emotion: 'spokoj'
    },
    {
      text: "Emocje to informacje, nie instrukcje.",
      author: "Susan David",
      category: 'psychologia',
      emotion: 'spokoj'
    },
    {
      text: "Szczęście nie jest celem - to sposób podróżowania.",
      author: "Margaret Lee Runbeck",
      category: 'filozofia',
      emotion: 'radosc'
    },
    {
      text: "Jeśli chcesz być szczęśliwy, bądź.",
      author: "John Lennon",
      category: 'mądrość',
      emotion: 'radosc'
    }
  ];

  const categories = {
    wszystkie: { name: 'Wszystkie', color: 'from-gray-400 to-gray-600' },
    mindfulness: { name: 'Mindfulness', color: 'from-green-400 to-teal-500' },
    psychologia: { name: 'Psychologia', color: 'from-blue-400 to-indigo-600' },
    filozofia: { name: 'Filozofia', color: 'from-purple-400 to-purple-600' },
    duchowość: { name: 'Duchowość', color: 'from-yellow-400 to-orange-500' },
    mądrość: { name: 'Mądrość', color: 'from-red-400 to-pink-500' },
    rozwój: { name: 'Rozwój', color: 'from-indigo-400 to-blue-600' }
  };

  const filteredQuotes = selectedCategory === 'wszystkie' 
    ? quotes 
    : quotes.filter(quote => quote.category === selectedCategory);

  useEffect(() => {
    const saved = localStorage.getItem('favoriteQuotes');
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favoriteQuotes', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (index) => {
    const quote = filteredQuotes[index];
    const quoteId = `${quote.author}-${quote.text.substring(0, 20)}`;
    
    if (favorites.includes(quoteId)) {
      setFavorites(favorites.filter(id => id !== quoteId));
    } else {
      setFavorites([...favorites, quoteId]);
    }
  };

  const isFavorite = (index) => {
    const quote = filteredQuotes[index];
    const quoteId = `${quote.author}-${quote.text.substring(0, 20)}`;
    return favorites.includes(quoteId);
  };

  const nextQuote = () => {
    setCurrentQuote((prev) => (prev + 1) % filteredQuotes.length);
  };

  const prevQuote = () => {
    setCurrentQuote((prev) => (prev - 1 + filteredQuotes.length) % filteredQuotes.length);
  };

  const getEmotionColor = (emotion) => {
    const emotionColors = {
      radosc: 'from-yellow-400 to-orange-500',
      smutek: 'from-blue-500 to-indigo-600',
      strach: 'from-gray-600 to-gray-800',
      zlosc: 'from-red-500 to-red-700',
      spokoj: 'from-green-400 to-teal-500',
      ekscytacja: 'from-purple-500 to-pink-500'
    };
    return emotionColors[emotion] || 'from-gray-400 to-gray-600';
  };

  if (filteredQuotes.length === 0) {
    return (
      <div className="min-h-screen py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h1 className={`text-3xl font-bold ${theme.colors.text} mb-4`}>
            Brak cytatów w tej kategorii
          </h1>
          <button
            onClick={() => setSelectedCategory('wszystkie')}
            className={`px-6 py-3 bg-gradient-to-r ${theme.colors.primary} text-white rounded-lg`}
          >
            Pokaż wszystkie cytaty
          </button>
        </div>
      </div>
    );
  }

  const quote = filteredQuotes[currentQuote];

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
            Mądrości o Emocjach
          </h1>
          <p className={`text-xl ${theme.colors.textSecondary} max-w-2xl mx-auto`}>
            Inspirujące cytaty i mądrości, które pomogą Ci lepiej zrozumieć świat emocji
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {Object.entries(categories).map(([key, category]) => (
            <motion.button
              key={key}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSelectedCategory(key);
                setCurrentQuote(0);
              }}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === key
                  ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                  : `${theme.colors.card} ${theme.colors.text} hover:bg-white/10`
              }`}
            >
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Quote Display */}
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuote}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              className={`${theme.colors.card} rounded-3xl p-8 md:p-12 shadow-2xl border border-white/10`}
            >
              {/* Quote Text */}
              <div className="text-center mb-8">
                <div className={`text-6xl mb-6 bg-gradient-to-r ${getEmotionColor(quote.emotion)} bg-clip-text text-transparent`}>
                  "
                </div>
                <blockquote className={`text-2xl md:text-3xl font-light ${theme.colors.text} leading-relaxed mb-8 italic`}>
                  {quote.text}
                </blockquote>
                <div className={`text-lg ${theme.colors.textSecondary} font-medium`}>
                  — {quote.author}
                </div>
              </div>

              {/* Quote Meta */}
              <div className="flex justify-center items-center space-x-4 mb-8">
                <span className={`px-3 py-1 bg-gradient-to-r ${categories[quote.category].color} bg-opacity-20 rounded-full text-sm font-medium ${theme.colors.text}`}>
                  {categories[quote.category].name}
                </span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => toggleFavorite(currentQuote)}
                  className={`text-2xl transition-colors ${
                    isFavorite(currentQuote) ? 'text-red-500' : theme.colors.textSecondary
                  }`}
                >
                  {isFavorite(currentQuote) ? '❤️' : '🤍'}
                </motion.button>
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={prevQuote}
                  className={`px-6 py-3 ${theme.colors.card} ${theme.colors.text} rounded-lg font-medium border-2 border-white/20 hover:bg-white/10 transition-all duration-300`}
                >
                  ← Poprzedni
                </motion.button>

                <div className={`text-sm ${theme.colors.textSecondary}`}>
                  {currentQuote + 1} z {filteredQuotes.length}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={nextQuote}
                  className={`px-6 py-3 bg-gradient-to-r ${getEmotionColor(quote.emotion)} text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300`}
                >
                  Następny →
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Daily Quote Feature */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className={`mt-12 ${theme.colors.card} rounded-2xl p-6 text-center`}
        >
          <h3 className={`text-xl font-bold ${theme.colors.text} mb-4`}>
            💡 Czy wiesz, że...?
          </h3>
          <p className={`${theme.colors.textSecondary} leading-relaxed`}>
            Codzienne czytanie inspirujących cytatów może poprawić nastrój i zwiększyć motywację. 
            Spróbuj zacząć każdy dzień od jednej mądrości!
          </p>
        </motion.div>

        {/* Share Feature */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 text-center"
        >
          <h4 className={`text-lg font-semibold ${theme.colors.text} mb-4`}>
            Podziel się mądrością
          </h4>
          <div className="flex justify-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 ${theme.colors.card} ${theme.colors.text} rounded-lg border border-white/20 hover:bg-white/10 transition-all duration-300`}
            >
              📱 Udostępnij
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 ${theme.colors.card} ${theme.colors.text} rounded-lg border border-white/20 hover:bg-white/10 transition-all duration-300`}
            >
              📋 Skopiuj
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default QuotesPage;