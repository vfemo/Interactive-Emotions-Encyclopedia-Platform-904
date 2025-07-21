import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const EmotionCard = ({ emotion, onHover }) => {
  const { theme } = useTheme();

  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.02 }}
      onHoverStart={() => onHover && onHover(emotion)}
      onHoverEnd={() => onHover && onHover(null)}
      className={`${theme.colors.card} rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border ${theme.colors.border} emotion-card`}
    >
      <Link to={`/emocja/${emotion.id}`} className="block">
        <div className="text-center">
          <motion.div
            whileHover={{ scale: 1.2, rotate: 5 }}
            className="text-6xl mb-4"
          >
            {emotion.icon}
          </motion.div>
          
          <h3 className={`text-2xl font-bold ${theme.colors.text} mb-2`}>
            {emotion.name}
          </h3>
          
          <div className={`w-20 h-1 bg-gradient-to-r ${emotion.color} rounded-full mx-auto mb-4`}></div>
          
          <p className={`${theme.colors.textSecondary} text-sm leading-relaxed mb-4`}>
            {emotion.description}
          </p>

          <div className="flex justify-center space-x-2 mb-4">
            <span className={`px-2 py-1 bg-gradient-to-r ${emotion.color} bg-opacity-20 rounded-full text-xs font-medium ${theme.colors.text}`}>
              {emotion.category}
            </span>
            <span className={`px-2 py-1 ${theme.colors.card} border ${theme.colors.border} rounded-full text-xs font-medium ${theme.colors.textSecondary}`}>
              {emotion.intensity}
            </span>
          </div>
          
          <motion.div
            whileHover={{ x: 5 }}
            className={`text-sm font-medium bg-gradient-to-r ${emotion.color} bg-clip-text text-transparent`}
          >
            Odkryj więcej →
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
};

export default EmotionCard;