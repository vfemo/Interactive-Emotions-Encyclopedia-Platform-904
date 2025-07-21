import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import EmotionJournalPage from './EmotionJournalPage';

const JournalPage = () => {
  const { theme } = useTheme();
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen"
    >
      <EmotionJournalPage />
    </motion.div>
  );
};

export default JournalPage;