import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { emotions } from '../data/emotions';

const EmotionWheel = () => {
  const { theme } = useTheme();
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [showAdvice, setShowAdvice] = useState(false);

  const emotionArray = Object.values(emotions);

  const advice = {
    radosc: {
      affirmation: "Dzisiaj pozwalam sobie na pełne doświadczenie radości i dzielę się nią z innymi.",
      exercise: "Zrób listę 5 rzeczy, które dziś Cię uszczęśliwiły, nawet jeśli były małe.",
      tip: "Radość jest zaraźliwa - uśmiechnij się do kogoś dzisiaj!"
    },
    smutek: {
      affirmation: "Mój smutek jest ważny i pozwalam sobie go odczuć bez osądzania.",
      exercise: "Napisz list do siebie wyrażający współczucie i zrozumienie.",
      tip: "Smutek to naturalna część życia - bądź dla siebie cierpliwy."
    },
    strach: {
      affirmation: "Jestem bezpieczny/bezpieczna i radzę sobie z wyzwaniami krok po kroku.",
      exercise: "Wykonaj ćwiczenie oddechowe 4-7-8: wdech na 4, zatrzymaj na 7, wydech na 8.",
      tip: "Strach często jest większy w wyobraźni niż w rzeczywistości."
    },
    zlosc: {
      affirmation: "Moja złość pokazuje mi, co jest dla mnie ważne, i kanalizuję ją konstruktywnie.",
      exercise: "Napisz o tym, co Cię złości, a potem przemyśl możliwe rozwiązania.",
      tip: "Złość może być sygnałem, że trzeba coś zmienić - słuchaj jej mądrze."
    },
    spokoj: {
      affirmation: "Jestem w harmonii ze sobą i otaczającym mnie światem.",
      exercise: "Spędź 10 minut w ciszy, obserwując swój oddech.",
      tip: "Twój spokój jest darem - dziel się nim z innymi."
    },
    ekscytacja: {
      affirmation: "Moja energia i entuzjazm prowadzą mnie ku wspaniałym doświadczeniom.",
      exercise: "Zaplanuj jedną małą przygodę na najbliższy tydzień.",
      tip: "Ekscytacja to paliwo do działania - użyj jej mądrze!"
    }
  };

  const handleEmotionSelect = (emotion) => {
    setSelectedEmotion(emotion);
    setShowAdvice(true);
  };

  const resetWheel = () => {
    setSelectedEmotion(null);
    setShowAdvice(false);
  };

  if (showAdvice && selectedEmotion) {
    const emotionAdvice = advice[selectedEmotion.id];
    
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
            transition={{ delay: 0.2, type: "spring" }}
            className="text-8xl mb-6"
          >
            {selectedEmotion.icon}
          </motion.div>

          <h2 className={`text-3xl font-bold bg-gradient-to-r ${selectedEmotion.color} bg-clip-text text-transparent mb-6`}>
            Twoja dzisiejsza aura: {selectedEmotion.name}
          </h2>

          <div className="space-y-6">
            <div className={`p-4 bg-gradient-to-r ${selectedEmotion.color} bg-opacity-10 rounded-lg`}>
              <h3 className={`font-semibold ${theme.colors.text} mb-2`}>💫 Afirmacja na dziś:</h3>
              <p className={`${theme.colors.textSecondary} italic`}>
                "{emotionAdvice.affirmation}"
              </p>
            </div>

            <div className={`p-4 ${theme.colors.card} border border-white/20 rounded-lg`}>
              <h3 className={`font-semibold ${theme.colors.text} mb-2`}>🎯 Ćwiczenie:</h3>
              <p className={`${theme.colors.textSecondary}`}>
                {emotionAdvice.exercise}
              </p>
            </div>

            <div className={`p-4 ${theme.colors.card} border border-white/20 rounded-lg`}>
              <h3 className={`font-semibold ${theme.colors.text} mb-2`}>💡 Wskazówka:</h3>
              <p className={`${theme.colors.textSecondary}`}>
                {emotionAdvice.tip}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetWheel}
              className={`px-6 py-3 bg-gradient-to-r ${selectedEmotion.color} text-white rounded-lg font-semibold shadow-lg`}
            >
              Wybierz ponownie
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 ${theme.colors.card} ${theme.colors.text} rounded-lg font-semibold border-2 border-white/20`}
            >
              Zapisz w dzienniku
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
      className="text-center max-w-4xl mx-auto"
    >
      <div className={`${theme.colors.card} rounded-2xl p-8 shadow-xl`}>
        <h2 className={`text-3xl font-bold ${theme.colors.text} mb-4`}>
          Koło Emocji - Twoja Dzisiejsza Aura
        </h2>
        <p className={`${theme.colors.textSecondary} mb-8 text-lg`}>
          Kliknij na emocję, która najlepiej opisuje Twój obecny stan
        </p>

        {/* Emotion Wheel */}
        <div className="relative w-80 h-80 mx-auto mb-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 opacity-20"
          />
          
          {emotionArray.map((emotion, index) => {
            const angle = (index / emotionArray.length) * 2 * Math.PI;
            const radius = 120;
            const x = 160 + radius * Math.cos(angle - Math.PI / 2);
            const y = 160 + radius * Math.sin(angle - Math.PI / 2);

            return (
              <motion.button
                key={emotion.id}
                className={`absolute w-16 h-16 rounded-full bg-gradient-to-r ${emotion.color} flex items-center justify-center text-2xl shadow-lg hover:shadow-xl transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300`}
                style={{ left: x, top: y }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 * index, type: "spring" }}
                whileHover={{ scale: 1.2, zIndex: 10 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleEmotionSelect(emotion)}
              >
                {emotion.icon}
                
                {/* Tooltip */}
                <motion.div
                  className={`absolute top-20 left-1/2 transform -translate-x-1/2 ${theme.colors.card} px-3 py-1 rounded-lg text-sm font-medium ${theme.colors.text} shadow-lg whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity pointer-events-none`}
                >
                  {emotion.name}
                </motion.div>
              </motion.button>
            );
          })}

          {/* Center */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className={`w-20 h-20 rounded-full bg-gradient-to-r ${theme.colors.primary} flex items-center justify-center shadow-lg`}
            >
              <span className="text-3xl">🧘</span>
            </motion.div>
          </div>
        </div>

        <p className={`${theme.colors.textSecondary} text-sm`}>
          Każda emocja ma swoją mądrość - pozwól sobie ją odkryć
        </p>
      </div>
    </motion.div>
  );
};

export default EmotionWheel;