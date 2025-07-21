import React, { createContext, useContext, useState, useEffect } from 'react';

const EmotionContext = createContext();

export const useEmotion = () => {
  const context = useContext(EmotionContext);
  if (!context) {
    throw new Error('useEmotion must be used within an EmotionProvider');
  }
  return context;
};

export const emotions = {
  radosc: {
    id: 'radosc',
    name: 'Radość',
    description: 'Uczucie szczęścia i zadowolenia z życia',
    color: 'from-yellow-400 to-orange-500',
    icon: '😊',
    category: 'pozytywne',
    intensity: 'wysoka',
    definition: 'Radość to podstawowa emocja charakteryzująca się uczuciem szczęścia, zadowolenia i entuzjazmu. Jest naturalną reakcją na pozytywne wydarzenia w naszym życiu i motywuje nas do działania.',
    examples: [
      'Spotkanie z ukochaną osobą po długiej rozłące',
      'Osiągnięcie wymarzonego celu',
      'Otrzymanie niespodzianki od bliskiej osoby',
      'Słoneczny poranek po tygodniu deszczu',
      'Udane spotkanie z przyjaciółmi'
    ],
    scientificExplanation: 'Radość aktywuje ośrodki nagrody w mózgu, uwalniając endorfiny, dopaminę i serotoninę. Te neuroprzekaźniki wzmacniają pozytywne zachowania i motywują nas do powtarzania działań, które przynoszą satysfakcję.',
    bodyEffects: [
      'Spontaniczny uśmiech i śmiech',
      'Poczucie lekkości w całym ciele',
      'Zwiększona energia i chęć do działania',
      'Rozluźnienie mięśni twarzy',
      'Przyspieszenie tętna z ekscytacji'
    ],
    culturalInsights: 'W większości kultur radość jest ceniona jako stan pożądany. Różne kultury wyrażają radość na różne sposoby - od głośnych celebracji po ciche, wewnętrzne zadowolenie. W kulturze polskiej radość często wyrażamy przez wspólne świętowanie.',
    copingStrategies: [
      'Dzielenie się radością z bliskimi osobami',
      'Prowadzenie dziennika wdzięczności',
      'Świętowanie nawet małych sukcesów',
      'Praktykowanie uważności w radosnych momentach',
      'Tworzenie wspomnień z radosnych chwil'
    ],
    soundscape: {
      title: 'Słoneczna Melodia',
      description: 'Radosne dźwięki przywołujące uśmiech',
      elements: ['Śpiew ptaków', 'Delikatne dzwoneczki', 'Akustyczna gitara', 'Dziecięcy śmiech']
    }
  },
  smutek: {
    id: 'smutek',
    name: 'Smutek',
    description: 'Naturalna reakcja na stratę i rozczarowanie',
    color: 'from-blue-500 to-indigo-600',
    icon: '😢',
    category: 'trudne',
    intensity: 'średnia',
    definition: 'Smutek to emocja, która pojawia się w odpowiedzi na stratę, rozczarowanie lub trudne doświadczenia. Jest naturalną częścią ludzkiego doświadczenia i pomaga nam przetworzyć trudne sytuacje.',
    examples: [
      'Śmierć bliskiej osoby',
      'Koniec ważnej relacji',
      'Niepowodzenie w ważnym przedsięwzięciu',
      'Nostalgiczne wspomnienia z przeszłości',
      'Rozstanie z przyjacielem'
    ],
    scientificExplanation: 'Smutek pomaga nam przetworzyć trudne doświadczenia i przystosować się do zmian. Aktywuje obszary mózgu odpowiedzialne za empatię i więzi społeczne, motywując nas do szukania wsparcia.',
    bodyEffects: [
      'Łzy i uczucie ściśnięcia w gardle',
      'Uczucie ciężkości w klatce piersiowej',
      'Zmniejszona energia i motywacja',
      'Potrzeba izolacji i samotności',
      'Spowolnienie ruchów i mowy'
    ],
    culturalInsights: 'Różne kultury mają różne podejście do wyrażania smutku. W kulturze polskiej smutek jest często wyrażany przez wspólne przeżywanie żałoby i udzielanie sobie wzajemnego wsparcia.',
    copingStrategies: [
      'Pozwalanie sobie na odczuwanie smutku',
      'Szukanie wsparcia u bliskich osób',
      'Wyrażanie emocji przez sztukę lub pisanie',
      'Praktykowanie samoopieki i łagodności wobec siebie',
      'Stopniowe wracanie do codziennych aktywności'
    ],
    soundscape: {
      title: 'Deszczowa Refleksja',
      description: 'Kojące dźwięki dla momentów zadumy',
      elements: ['Delikatny deszcz', 'Fortepiano', 'Odgłosy oceanu', 'Wiolonczela']
    }
  },
  strach: {
    id: 'strach',
    name: 'Strach',
    description: 'Mechanizm obronny chroniący przed zagrożeniem',
    color: 'from-purple-600 to-gray-700',
    icon: '😨',
    category: 'ochronne',
    intensity: 'wysoka',
    definition: 'Strach to podstawowa emocja mająca na celu ochronę nas przed potencjalnym niebezpieczeństwem. Jest kluczowy dla naszego przetrwania i pomaga nam unikać szkodliwych sytuacji.',
    examples: [
      'Reakcja na nagły, głośny hałas',
      'Lęk przed wystąpieniem publicznym',
      'Obawa o bezpieczeństwo bliskich',
      'Strach przed nieznanym miejscem',
      'Niepokój przed ważnym egzaminem'
    ],
    scientificExplanation: 'Strach aktywuje układ sympatyczny, przygotowując ciało do reakcji "walcz lub uciekaj". Uwalnia adrenalinę i kortyzol, zwiększając czujność, siłę i szybkość reakcji.',
    bodyEffects: [
      'Przyspieszone bicie serca',
      'Płytki, przyspieszony oddech',
      'Napięcie mięśni całego ciała',
      'Zwiększona czujność i koncentracja',
      'Pocenie się dłoni'
    ],
    culturalInsights: 'Różne kultury mają różne lęki i sposoby radzenia sobie ze strachem. To, czego się boimy, często jest kształtowane przez nasze doświadczenia kulturowe i społeczne.',
    copingStrategies: [
      'Głębokie, kontrolowane oddychanie',
      'Techniki uziemiania (5-4-3-2-1)',
      'Stopniowe konfrontowanie się z lękiem',
      'Szukanie wsparcia profesjonalnego',
      'Praktykowanie technik relaksacyjnych'
    ],
    soundscape: {
      title: 'Ochronna Harmonia',
      description: 'Uspokajające dźwięki przywracające poczucie bezpieczeństwa',
      elements: ['Kołysanka', 'Harfa', 'Miękkie tony', 'Spokojny oddech']
    }
  },
  zlosc: {
    id: 'zlosc',
    name: 'Złość',
    description: 'Energia do działania i obrony granic',
    color: 'from-red-500 to-orange-600',
    icon: '😠',
    category: 'energetyczne',
    intensity: 'wysoka',
    definition: 'Złość to emocja, która mobilizuje nas do działania w sytuacjach niesprawiedliwości lub gdy nasze granice są przekraczane. Może być konstruktywną siłą do zmiany.',
    examples: [
      'Doświadczenie niesprawiedliwego traktowania',
      'Przekroczenie osobistych granic',
      'Frustracja z powodu przeszkód',
      'Obrona wartości lub bliskich osób',
      'Reakcja na krzywdę innych'
    ],
    scientificExplanation: 'Złość aktywuje ciało migdałowate i korę przedczołową, przygotowując nas do konfrontacji. Może być konstruktywna, gdy jest wyrażana w zdrowy sposób i kanalizowana w pozytywne działania.',
    bodyEffects: [
      'Napięcie mięśni szczęk i ramion',
      'Przyspieszone bicie serca',
      'Zaciskanie pięści',
      'Uczucie gorąca w ciele',
      'Zwiększone ciśnienie krwi'
    ],
    culturalInsights: 'Różne kultury mają różne normy dotyczące wyrażania złości. W kulturze polskiej często uczy się kontrolowania złości, ale ważne jest znalezienie zdrowych sposobów jej wyrażania.',
    copingStrategies: [
      'Intensywne ćwiczenia fizyczne',
      'Asertywna, ale spokojna komunikacja',
      'Techniki oddechowe i relaksacyjne',
      'Identyfikacja przyczyn złości',
      'Przekierowanie energii w konstruktywne działania'
    ],
    soundscape: {
      title: 'Transformacyjny Rytm',
      description: 'Mocne dźwięki do uwolnienia napięcia',
      elements: ['Bębny', 'Gitara elektryczna', 'Grzmoty', 'Mocny rytm']
    }
  },
  spokoj: {
    id: 'spokoj',
    name: 'Spokój',
    description: 'Stan równowagi i wewnętrznej harmonii',
    color: 'from-green-400 to-teal-500',
    icon: '😌',
    category: 'równoważące',
    intensity: 'niska',
    definition: 'Spokój to stan emocjonalnej równowagi, charakteryzujący się poczuciem harmonii, bezpieczeństwa i wewnętrznego pokoju. Jest podstawą dla zdrowia psychicznego.',
    examples: [
      'Medytacja w ciszy',
      'Spacer w lesie o świcie',
      'Chwile głębokiej refleksji',
      'Uczucie bezpieczeństwa w domu',
      'Moment po rozwiązaniu problemu'
    ],
    scientificExplanation: 'Spokój aktywuje układ parasympatyczny, obniżając tętno i ciśnienie krwi. Sprzyja regeneracji, zdrowiu psychofizycznemu i lepszemu funkcjonowaniu układu immunologicznego.',
    bodyEffects: [
      'Wolniejszy, głębszy oddech',
      'Rozluźnienie wszystkich mięśni',
      'Obniżone tętno i ciśnienie',
      'Poczucie lekkości i harmonii',
      'Jasność myślenia'
    ],
    culturalInsights: 'Różne tradycje kultywują spokój przez medytację, modlitwę, kontakt z naturą czy praktyki duchowe. W kulturze polskiej spokój często znajdujemy w rodzinnym domu i naturze.',
    copingStrategies: [
      'Regularna medytacja lub modlitwa',
      'Spędzanie czasu w naturze',
      'Ograniczenie nadmiaru bodźców',
      'Praktyki mindfulness w codzienności',
      'Tworzenie spokojnych rytuałów'
    ],
    soundscape: {
      title: 'Leśna Cisza',
      description: 'Naturalne dźwięki przywracające spokój',
      elements: ['Szum lasu', 'Strumyk', 'Wiatr w liściach', 'Śpiew ptaków']
    }
  },
  ekscytacja: {
    id: 'ekscytacja',
    name: 'Ekscytacja',
    description: 'Energia entuzjazmu i oczekiwania',
    color: 'from-purple-500 to-pink-500',
    icon: '🤩',
    category: 'energetyczne',
    intensity: 'wysoka',
    definition: 'Ekscytacja to intensywne uczucie entuzjazmu i oczekiwania, które mobilizuje nas do działania i eksploracji. Jest motorem naszych marzeń i aspiracji.',
    examples: [
      'Oczekiwanie na ważne wydarzenie',
      'Rozpoczęcie nowego projektu',
      'Poznawanie nowych ludzi',
      'Planowanie przygody',
      'Moment przed wielkim sukcesem'
    ],
    scientificExplanation: 'Ekscytacja zwiększa poziom dopaminy i noradrenaliny, poprawiając koncentrację, motywację do działania i zdolność do uczenia się nowych rzeczy.',
    bodyEffects: [
      'Znacznie zwiększona energia',
      'Przyspieszone tętno z radości',
      'Trudność z siedzeniem w miejscu',
      'Poczucie lekkości i euforii',
      'Zwiększona ekspresja twarzy'
    ],
    culturalInsights: 'Różne kultury mają różne sposoby wyrażania ekscytacji - od głośnych okrzyków radości po ciche, wewnętrzne zadowolenie. Ważne jest znalezienie autentycznego sposobu wyrażania.',
    copingStrategies: [
      'Kanalizowanie energii w konkretne działania',
      'Dzielenie się entuzjazmem z innymi',
      'Planowanie i organizacja celów',
      'Ćwiczenia oddechowe dla uspokojenia',
      'Wykorzystanie energii do kreatywności'
    ],
    soundscape: {
      title: 'Energetyczna Fala',
      description: 'Dynamiczne dźwięki pobudzające do działania',
      elements: ['Syntetyzatory', 'Szybki beat', 'Elektronika', 'Taneczne rytmy']
    }
  }
};

export const emotionCategories = {
  pozytywne: {
    name: 'Pozytywne',
    color: 'from-yellow-400 to-orange-500',
    description: 'Emocje, które przynoszą radość i energię',
    icon: '☀️'
  },
  trudne: {
    name: 'Trudne',
    color: 'from-blue-500 to-indigo-600',
    description: 'Emocje wymagające szczególnej uwagi i wsparcia',
    icon: '🌧️'
  },
  ochronne: {
    name: 'Ochronne',
    color: 'from-purple-600 to-gray-700',
    description: 'Emocje chroniące nas przed zagrożeniem',
    icon: '🛡️'
  },
  energetyczne: {
    name: 'Energetyczne',
    color: 'from-red-500 to-pink-500',
    description: 'Emocje mobilizujące do działania',
    icon: '⚡'
  },
  równoważące: {
    name: 'Równoważące',
    color: 'from-green-400 to-teal-500',
    description: 'Emocje przywracające harmonię i spokój',
    icon: '⚖️'
  }
};

export const EmotionProvider = ({ children }) => {
  const [journalEntries, setJournalEntries] = useState([]);
  const [userPreferences, setUserPreferences] = useState({});

  useEffect(() => {
    const savedEntries = localStorage.getItem('emotionJournal');
    const savedPreferences = localStorage.getItem('userPreferences');
    
    if (savedEntries) {
      setJournalEntries(JSON.parse(savedEntries));
    }
    
    if (savedPreferences) {
      setUserPreferences(JSON.parse(savedPreferences));
    }
  }, []);

  const addJournalEntry = (entry) => {
    const newEntry = {
      ...entry,
      id: Date.now(),
      date: new Date().toISOString()
    };
    
    const updatedEntries = [newEntry, ...journalEntries];
    setJournalEntries(updatedEntries);
    localStorage.setItem('emotionJournal', JSON.stringify(updatedEntries));
  };

  const updateUserPreferences = (prefs) => {
    const updatedPrefs = { ...userPreferences, ...prefs };
    setUserPreferences(updatedPrefs);
    localStorage.setItem('userPreferences', JSON.stringify(updatedPrefs));
  };

  return (
    <EmotionContext.Provider value={{
      emotions,
      emotionCategories,
      journalEntries,
      userPreferences,
      addJournalEntry,
      updateUserPreferences
    }}>
      {children}
    </EmotionContext.Provider>
  );
};