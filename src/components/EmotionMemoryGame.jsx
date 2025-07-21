import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const EmotionMemoryGame = () => {
  const { theme } = useTheme();
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [difficulty, setDifficulty] = useState('easy');

  const emotionPairs = {
    easy: [
      { id: 1, emotion: '😊', meaning: 'Radość' },
      { id: 2, emotion: '😢', meaning: 'Smutek' },
      { id: 3, emotion: '😠', meaning: 'Złość' },
      { id: 4, emotion: '😰', meaning: 'Strach' }
    ],
    medium: [
      { id: 1, emotion: '😊', meaning: 'Radość' },
      { id: 2, emotion: '😢', meaning: 'Smutek' },
      { id: 3, emotion: '😠', meaning: 'Złość' },
      { id: 4, emotion: '😰', meaning: 'Strach' },
      { id: 5, emotion: '😌', meaning: 'Spokój' },
      { id: 6, emotion: '🤩', meaning: 'Ekscytacja' }
    ],
    hard: [
      { id: 1, emotion: '😊', meaning: 'Radość' },
      { id: 2, emotion: '😢', meaning: 'Smutek' },
      { id: 3, emotion: '😠', meaning: 'Złość' },
      { id: 4, emotion: '😰', meaning: 'Strach' },
      { id: 5, emotion: '😌', meaning: 'Spokój' },
      { id: 6, emotion: '🤩', meaning: 'Ekscytacja' },
      { id: 7, emotion: '😔', meaning: 'Melancholia' },
      { id: 8, emotion: '😤', meaning: 'Frustracja' }
    ]
  };

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const initializeGame = (level) => {
    setDifficulty(level);
    const pairs = emotionPairs[level];
    const gameCards = [];
    
    pairs.forEach(pair => {
      gameCards.push({ ...pair, type: 'emotion', cardId: `${pair.id}-emotion` });
      gameCards.push({ ...pair, type: 'meaning', cardId: `${pair.id}-meaning` });
    });

    setCards(shuffleArray(gameCards));
    setFlippedCards([]);
    setMatchedPairs([]);
    setMoves(0);
    setGameCompleted(false);
  };

  useEffect(() => {
    initializeGame('easy');
  }, []);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      
      if (first.id === second.id && first.type !== second.type) {
        // Match found
        setTimeout(() => {
          setMatchedPairs(prev => [...prev, first.id]);
          setFlippedCards([]);
        }, 1000);
      } else {
        // No match
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
      setMoves(prev => prev + 1);
    }
  }, [flippedCards]);

  useEffect(() => {
    if (matchedPairs.length === emotionPairs[difficulty].length && matchedPairs.length > 0) {
      setGameCompleted(true);
    }
  }, [matchedPairs, difficulty]);

  const handleCardClick = (card) => {
    if (flippedCards.length === 2 || 
        flippedCards.some(c => c.cardId === card.cardId) || 
        matchedPairs.includes(card.id)) {
      return;
    }

    setFlippedCards(prev => [...prev, card]);
  };

  const isCardFlipped = (card) => {
    return flippedCards.some(c => c.cardId === card.cardId) || matchedPairs.includes(card.id);
  };

  const getScoreRating = () => {
    const perfect = emotionPairs[difficulty].length;
    if (moves <= perfect) return { rating: 'Perfekcyjnie!', color: 'from-yellow-400 to-orange-500', emoji: '⭐⭐⭐' };
    if (moves <= perfect * 1.5) return { rating: 'Świetnie!', color: 'from-green-400 to-blue-500', emoji: '⭐⭐' };
    if (moves <= perfect * 2) return { rating: 'Dobrze!', color: 'from-blue-400 to-purple-500', emoji: '⭐' };
    return { rating: 'Spróbuj ponownie!', color: 'from-purple-400 to-pink-500', emoji: '💪' };
  };

  if (gameCompleted) {
    const score = getScoreRating();
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto text-center"
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

          <h2 className={`text-3xl font-bold bg-gradient-to-r ${score.color} bg-clip-text text-transparent mb-4`}>
            Gratulacje! {score.rating}
          </h2>

          <div className="text-4xl mb-4">{score.emoji}</div>

          <p className={`text-lg ${theme.colors.text} mb-6`}>
            Ukończyłeś grę w {moves} ruchach!
          </p>

          <div className="flex justify-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => initializeGame(difficulty)}
              className={`px-6 py-3 bg-gradient-to-r ${score.color} text-white rounded-lg font-semibold shadow-lg`}
            >
              Zagraj Ponownie
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => initializeGame(difficulty === 'easy' ? 'medium' : difficulty === 'medium' ? 'hard' : 'easy')}
              className={`px-6 py-3 ${theme.colors.card} ${theme.colors.text} rounded-lg font-semibold border-2 border-white/20`}
            >
              Zmień Poziom
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
      <div className={`${theme.colors.card} rounded-2xl p-8 shadow-xl`}>
        <div className="text-center mb-8">
          <h2 className={`text-3xl font-bold ${theme.colors.text} mb-4`}>
            Memory Emocji
          </h2>
          <p className={`${theme.colors.textSecondary} mb-6`}>
            Dopasuj emocje do ich znaczeń. Rozwijaj pamięć i uczenie się!
          </p>

          {/* Difficulty Selector */}
          <div className="flex justify-center space-x-2 mb-6">
            {['easy', 'medium', 'hard'].map((level) => (
              <motion.button
                key={level}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => initializeGame(level)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  difficulty === level
                    ? `bg-gradient-to-r ${theme.colors.primary} text-white shadow-lg`
                    : `${theme.colors.card} ${theme.colors.text} border border-white/20 hover:bg-white/10`
                }`}
              >
                {level === 'easy' ? 'Łatwy' : level === 'medium' ? 'Średni' : 'Trudny'}
              </motion.button>
            ))}
          </div>

          {/* Game Stats */}
          <div className="flex justify-center space-x-8 mb-6">
            <div className={`text-center p-3 ${theme.colors.card} rounded-lg border border-white/20`}>
              <div className={`text-xl font-bold ${theme.colors.text}`}>{moves}</div>
              <div className={`text-sm ${theme.colors.textSecondary}`}>Ruchy</div>
            </div>
            <div className={`text-center p-3 ${theme.colors.card} rounded-lg border border-white/20`}>
              <div className={`text-xl font-bold ${theme.colors.text}`}>{matchedPairs.length}</div>
              <div className={`text-sm ${theme.colors.textSecondary}`}>Pary</div>
            </div>
          </div>
        </div>

        {/* Game Board */}
        <div className={`grid gap-3 mx-auto max-w-2xl ${
          difficulty === 'easy' ? 'grid-cols-4' : 
          difficulty === 'medium' ? 'grid-cols-4' : 
          'grid-cols-4'
        }`}>
          {cards.map((card, index) => (
            <motion.div
              key={card.cardId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * index }}
              whileHover={{ scale: isCardFlipped(card) ? 1 : 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCardClick(card)}
              className={`aspect-square ${theme.colors.card} border-2 border-white/20 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-300 ${
                isCardFlipped(card) ? 'bg-white/10' : 'hover:bg-white/5'
              }`}
            >
              <div className="text-center">
                {isCardFlipped(card) ? (
                  card.type === 'emotion' ? (
                    <div className="text-3xl">{card.emotion}</div>
                  ) : (
                    <div className={`text-sm font-medium ${theme.colors.text} px-2`}>
                      {card.meaning}
                    </div>
                  )
                ) : (
                  <div className="text-4xl opacity-30">❓</div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className={`mt-8 p-4 ${theme.colors.card} border border-white/20 rounded-lg text-center`}
        >
          <h4 className={`font-semibold ${theme.colors.text} mb-2`}>
            🧠 Jak grać?
          </h4>
          <p className={`text-sm ${theme.colors.textSecondary} leading-relaxed`}>
            Kliknij na dwie karty, aby je odkryć. Dopasuj emoji emocji z ich nazwami. 
            Znajdź wszystkie pary w jak najmniejszej liczbie ruchów!
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default EmotionMemoryGame;