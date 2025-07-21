import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import { EmotionProvider } from './context/EmotionContext';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import EmotionDetailPage from './pages/EmotionDetailPage';
import TestsPage from './pages/TestsPage';
import ExercisesPage from './pages/ExercisesPage';
import SoundGalleryPage from './pages/SoundGalleryPage';
import QuotesPage from './pages/QuotesPage';
import JournalPage from './pages/JournalPage';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <EmotionProvider>
        <Router>
          <div className="min-h-screen transition-all duration-500">
            <Navigation />
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/emocja/:emotionId" element={<EmotionDetailPage />} />
                <Route path="/testy" element={<TestsPage />} />
                <Route path="/cwiczenia" element={<ExercisesPage />} />
                <Route path="/galeria-dzwiekow" element={<SoundGalleryPage />} />
                <Route path="/cytaty" element={<QuotesPage />} />
                <Route path="/dziennik" element={<JournalPage />} />
              </Routes>
            </AnimatePresence>
          </div>
        </Router>
      </EmotionProvider>
    </ThemeProvider>
  );
}

export default App;