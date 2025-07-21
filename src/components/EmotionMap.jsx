import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const EmotionMap = ({ emotions, hoveredEmotion, setHoveredEmotion }) => {
  const { theme } = useTheme();
  const emotionArray = Object.values(emotions);

  // Create positions for emotions in a tree-like structure
  const getEmotionPosition = (index, total) => {
    const centerX = 50;
    const centerY = 50;
    const radius = 35;
    const angle = (index / total) * 2 * Math.PI;
    
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle)
    };
  };

  return (
    <div className={`relative w-full h-[500px] ${theme.colors.card} rounded-3xl overflow-hidden shadow-2xl emotion-wheel`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" viewBox="0 0 100 100">
          <defs>
            <radialGradient id="treeGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.3" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.1" />
            </radialGradient>
          </defs>
          <circle cx="50" cy="50" r="45" fill="url(#treeGradient)" />
          {emotionArray.map((_, index) => {
            const pos = getEmotionPosition(index, emotionArray.length);
            return (
              <line
                key={index}
                x1="50"
                y1="50"
                x2={pos.x}
                y2={pos.y}
                stroke="currentColor"
                strokeWidth="0.5"
                opacity="0.3"
              />
            );
          })}
        </svg>
      </div>

      {/* Central Heart */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
      >
        <motion.div
          className={`w-20 h-20 rounded-full bg-gradient-to-r ${theme.colors.primary} flex items-center justify-center shadow-lg cursor-pointer`}
          whileHover={{ scale: 1.1 }}
          animate={{ 
            boxShadow: [
              "0 0 20px rgba(59, 130, 246, 0.3)",
              "0 0 40px rgba(59, 130, 246, 0.6)",
              "0 0 20px rgba(59, 130, 246, 0.3)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-3xl">❤️</span>
        </motion.div>
        <div className={`text-center mt-2 ${theme.colors.text} font-semibold`}>
          Twoje Serce
        </div>
      </motion.div>

      {/* Emotion Nodes */}
      {emotionArray.map((emotion, index) => {
        const position = getEmotionPosition(index, emotionArray.length);
        const isHovered = hoveredEmotion?.id === emotion.id;
        
        return (
          <motion.div
            key={emotion.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 emotion-node"
            style={{
              left: `${position.x}%`,
              top: `${position.y}%`
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              delay: 0.1 * index,
              type: "spring",
              stiffness: 200 
            }}
            onHoverStart={() => setHoveredEmotion(emotion)}
            onHoverEnd={() => setHoveredEmotion(null)}
          >
            <Link to={`/emocja/${emotion.id}`}>
              <motion.div
                className={`relative w-16 h-16 rounded-full bg-gradient-to-r ${emotion.color} flex items-center justify-center shadow-lg cursor-pointer`}
                whileHover={{ scale: 1.2 }}
                animate={{
                  boxShadow: isHovered 
                    ? "0 20px 40px rgba(0,0,0,0.3)" 
                    : "0 10px 20px rgba(0,0,0,0.1)"
                }}
              >
                <span className="text-2xl">{emotion.icon}</span>
                
                {/* Pulse effect when hovered */}
                <motion.div
                  className={`absolute inset-0 rounded-full bg-gradient-to-r ${emotion.color} opacity-30`}
                  animate={{
                    scale: isHovered ? [1, 1.5, 1] : 1,
                    opacity: isHovered ? [0.3, 0, 0.3] : 0.3
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: isHovered ? Infinity : 0,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
              
              {/* Emotion Label */}
              <motion.div
                className={`absolute top-20 left-1/2 transform -translate-x-1/2 ${theme.colors.card} px-3 py-1 rounded-full text-sm font-medium ${theme.colors.text} shadow-lg whitespace-nowrap z-10`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ 
                  opacity: isHovered ? 1 : 0,
                  y: isHovered ? 0 : 10
                }}
                transition={{ duration: 0.2 }}
              >
                {emotion.name}
              </motion.div>
            </Link>
          </motion.div>
        );
      })}

      {/* Hover Information Panel */}
      {hoveredEmotion && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className={`absolute bottom-4 left-4 right-4 ${theme.colors.card} rounded-xl p-4 shadow-xl border ${theme.colors.border}`}
        >
          <div className="flex items-center space-x-3">
            <span className="text-3xl">{hoveredEmotion.icon}</span>
            <div>
              <h3 className={`font-bold ${theme.colors.text}`}>
                {hoveredEmotion.name}
              </h3>
              <p className={`text-sm ${theme.colors.textSecondary}`}>
                {hoveredEmotion.description}
              </p>
            </div>
            <div className={`ml-auto px-3 py-1 bg-gradient-to-r ${hoveredEmotion.color} bg-opacity-20 rounded-full text-xs font-medium ${theme.colors.text}`}>
              Intensywność: {hoveredEmotion.intensity}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default EmotionMap;