import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const EmotionTicTacToe = () => {
  const { theme } = useTheme();
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('emotion');
  const [score, setScore] = useState({ player: 0, ai: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);

  const emotions = [
    { emoji: '😊', strategy: 'Dzielenie się z innymi' },
    { emoji: '😢', strategy: 'Akceptacja i wsparcie' },
    { emoji: '😠', strategy: 'Ćwiczenia fizyczne' },
    { emoji: '😰', strategy: 'Techniki oddechowe' },
    { emoji: '😌', strategy: 'Medytacja' },
    { emoji: '🤩', strategy: 'Kanalizowanie energii' }
  ];

  const strategies = [
    'Dzielenie się z innymi',
    'Akceptacja i wsparcie',
    'Ćwiczenia fizyczne',
    'Techniki oddechowe',
    'Medytacja',
    'Kanalizowanie energii',
    'Rozmowa z przyjacielem',
    'Pisanie dziennika',
    'Słuchanie muzyki'
  ];

  const checkWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (let line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const getRandomEmotion = () => {
    return emotions[Math.floor(Math.random() * emotions.length)];
  };

  const getRandomStrategy = () => {
    return strategies[Math.floor(Math.random() * strategies.length)];
  };

  const makeMove = (index) => {
    if (board[index] || gameOver) return;

    const newBoard = [...board];
    
    if (currentPlayer === 'emotion') {
      newBoard[index] = getRandomEmotion();
      setCurrentPlayer('strategy');
    } else {
      newBoard[index] = getRandomStrategy();
      setCurrentPlayer('emotion');
    }

    setBoard(newBoard);

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      setGameOver(true);
      if (typeof gameWinner === 'object') {
        setScore(prev => ({ ...prev, player: prev.player + 1 }));
      } else {
        setScore(prev => ({ ...prev, ai: prev.ai + 1 }));
      }
    } else if (newBoard.every(cell => cell !== null)) {
      setGameOver(true);
      setWinner('draw');
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('emotion');
    setGameOver(false);
    setWinner(null);
  };

  const resetScore = () => {
    setScore({ player: 0, ai: 0 });
    resetGame();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-2xl mx-auto text-center"
    >
      <div className={`${theme.colors.card} rounded-2xl p-8 shadow-xl`}>
        <h2 className={`text-3xl font-bold ${theme.colors.text} mb-4`}>
          Emocjonalne Kółko i Krzyżyk
        </h2>
        
        <p className={`${theme.colors.textSecondary} mb-6`}>
          Dopasuj emocje do strategii radzenia sobie. Emocje vs Strategie!
        </p>

        {/* Score */}
        <div className="flex justify-center space-x-8 mb-6">
          <div className={`text-center p-3 ${theme.colors.card} rounded-lg border border-white/20`}>
            <div className="text-2xl mb-1">😊</div>
            <div className={`text-sm ${theme.colors.textSecondary}`}>Emocje</div>
            <div className={`text-xl font-bold ${theme.colors.text}`}>{score.player}</div>
          </div>
          <div className={`text-center p-3 ${theme.colors.card} rounded-lg border border-white/20`}>
            <div className="text-2xl mb-1">🎯</div>
            <div className={`text-sm ${theme.colors.textSecondary}`}>Strategie</div>
            <div className={`text-xl font-bold ${theme.colors.text}`}>{score.ai}</div>
          </div>
        </div>

        {/* Current Player */}
        {!gameOver && (
          <div className={`mb-6 p-3 bg-gradient-to-r ${theme.colors.primary} bg-opacity-20 rounded-lg`}>
            <p className={`${theme.colors.text} font-medium`}>
              Kolejka: {currentPlayer === 'emotion' ? '😊 Emocje' : '🎯 Strategie'}
            </p>
          </div>
        )}

        {/* Game Board */}
        <div className="grid grid-cols-3 gap-3 mb-6 max-w-sm mx-auto">
          {board.map((cell, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: cell ? 1 : 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => makeMove(index)}
              className={`aspect-square ${theme.colors.card} border-2 border-white/20 rounded-lg flex items-center justify-center text-lg font-medium transition-all duration-300 ${
                !cell && !gameOver ? 'hover:bg-white/10 cursor-pointer' : 'cursor-not-allowed'
              }`}
              disabled={!!cell || gameOver}
            >
              {cell ? (
                typeof cell === 'object' ? (
                  <div className="text-center">
                    <div className="text-2xl mb-1">{cell.emoji}</div>
                  </div>
                ) : (
                  <div className={`text-xs ${theme.colors.text} text-center leading-tight px-1`}>
                    {cell.length > 15 ? cell.substring(0, 15) + '...' : cell}
                  </div>
                )
              ) : (
                <div className={`text-2xl ${theme.colors.textSecondary} opacity-30`}>
                  +
                </div>
              )}
            </motion.button>
          ))}
        </div>

        {/* Game Over */}
        {gameOver && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-6 p-4 bg-gradient-to-r ${theme.colors.primary} bg-opacity-20 rounded-lg`}
          >
            <h3 className={`text-xl font-bold ${theme.colors.text} mb-2`}>
              {winner === 'draw' ? 'Remis!' : 
               typeof winner === 'object' ? 'Wygrały Emocje! 😊' : 
               'Wygrały Strategie! 🎯'}
            </h3>
            {winner !== 'draw' && (
              <p className={`${theme.colors.textSecondary} text-sm`}>
                {typeof winner === 'object' 
                  ? `Emocja ${winner.emoji} znalazła swoją strategię: ${winner.strategy}`
                  : `Strategia "${winner}" pomogła opanować emocje!`}
              </p>
            )}
          </motion.div>
        )}

        {/* Controls */}
        <div className="flex justify-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetGame}
            className={`px-6 py-3 bg-gradient-to-r ${theme.colors.primary} text-white rounded-lg font-semibold shadow-lg`}
          >
            Nowa Gra
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetScore}
            className={`px-6 py-3 ${theme.colors.card} ${theme.colors.text} rounded-lg font-semibold border-2 border-white/20`}
          >
            Reset Wyniku
          </motion.button>
        </div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className={`mt-8 p-4 ${theme.colors.card} border border-white/20 rounded-lg`}
        >
          <h4 className={`font-semibold ${theme.colors.text} mb-2`}>
            📖 Jak grać?
          </h4>
          <p className={`text-sm ${theme.colors.textSecondary} leading-relaxed`}>
            Kliknij na puste pole, aby umieścić emocję lub strategię. 
            Celem jest ułożenie trzech w rzędzie i nauczenie się, 
            które strategie najlepiej pasują do różnych emocji.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default EmotionTicTacToe;