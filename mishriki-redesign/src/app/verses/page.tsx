'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import RainCanvas from '@/components/RainCanvas';
import NavBar from '@/components/NavBar';

const verses = [
  {
    coptic: 'Ⲡⲉⲛⲓⲱⲧ ⲉⲧϧⲉⲛ ⲛⲓⲫⲏⲟⲩⲓ',
    english: 'Our Father who art in heaven',
    reference: 'Matthew 6:9'
  },
  {
    coptic: 'Ⲡⲉⲛⲓⲱⲧ ⲉⲧϧⲉⲛ ⲛⲓⲫⲏⲟⲩⲓ ⲙⲁⲣⲉϥⲥⲁⲛⲉⲛ ⲡⲉⲕⲣⲁⲛ',
    english: 'Our Father who art in heaven, hallowed be thy name',
    reference: 'Matthew 6:9'
  },
  {
    coptic: 'ⲁⲣⲉⲕⲉⲣⲭⲉ ⲙⲡⲉⲕⲙⲁⲛⲧⲉ ⲙⲁⲣⲉϥⲉⲣϣⲁⲓ',
    english: 'Thy kingdom come, thy will be done',
    reference: 'Matthew 6:10'
  },
  {
    coptic: 'ⲡⲉⲛⲟⲩⲟⲉⲓⲛ ⲙⲡⲉⲛⲟⲩⲟⲉⲓⲛ ⲙⲁⲣⲉϥⲉⲣϣⲁⲓ',
    english: 'Give us this day our daily bread',
    reference: 'Matthew 6:11'
  },
  {
    coptic: 'ⲁⲣⲉⲕⲉⲣⲭⲉ ⲙⲡⲉⲛⲟⲩⲟⲉⲓⲛ ⲙⲁⲣⲉϥⲉⲣϣⲁⲓ',
    english: 'And forgive us our trespasses',
    reference: 'Matthew 6:12'
  },
  {
    coptic: 'ⲁⲣⲉⲕⲉⲣⲭⲉ ⲙⲡⲉⲛⲟⲩⲟⲉⲓⲛ ⲙⲁⲣⲉϥⲉⲣϣⲁⲓ',
    english: 'As we forgive those who trespass against us',
    reference: 'Matthew 6:12'
  },
  {
    coptic: 'ⲁⲣⲉⲕⲉⲣⲭⲉ ⲙⲡⲉⲛⲟⲩⲟⲉⲓⲛ ⲙⲁⲣⲉϥⲉⲣϣⲁⲓ',
    english: 'And lead us not into temptation',
    reference: 'Matthew 6:13'
  },
  {
    coptic: 'ⲁⲣⲉⲕⲉⲣⲭⲉ ⲙⲡⲉⲛⲟⲩⲟⲉⲓⲛ ⲙⲁⲣⲉϥⲉⲣϣⲁⲓ',
    english: 'But deliver us from evil',
    reference: 'Matthew 6:13'
  }
];

export default function VersesPage() {
  const [currentVerse, setCurrentVerse] = useState(0);
  const [showEnglish, setShowEnglish] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Load Noto Sans Coptic font
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+Coptic:wght@400;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentVerse((prev) => (prev + 1) % verses.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextVerse = () => {
    setCurrentVerse((prev) => (prev + 1) % verses.length);
  };

  const prevVerse = () => {
    setCurrentVerse((prev) => (prev - 1 + verses.length) % verses.length);
  };

  const copyVerse = () => {
    const verse = verses[currentVerse];
    const text = showEnglish ? verse.english : verse.coptic;
    navigator.clipboard.writeText(text);
  };

  return (
    <main className="relative min-h-screen">
      <RainCanvas />
      <NavBar />
      
      <div className="pt-24 px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-mono font-bold text-matrix mb-8 text-center"
          >
            Ⲡⲓⲃⲓⲃⲗⲟⲥ
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-accent font-mono text-center mb-12"
          >
            Coptic Bible Verses
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-ink-1 border border-matrix/20 rounded-lg p-8 mb-8"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            {/* Verse Display */}
            <div className="text-center mb-8">
              <motion.div
                key={currentVerse}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-6"
              >
                <div className="text-2xl md:text-3xl text-matrix mb-4 leading-relaxed" style={{ fontFamily: 'Noto Sans Coptic, monospace' }}>
                  {verses[currentVerse].coptic}
                </div>
                
                {showEnglish && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-lg text-glow font-mono mb-2"
                  >
                    {verses[currentVerse].english}
                  </motion.div>
                )}
                
                <div className="text-sm text-matrix/70 font-mono">
                  {verses[currentVerse].reference}
                </div>
              </motion.div>
            </div>

            {/* Controls */}
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
              {/* Navigation */}
              <div className="flex items-center space-x-4">
                <motion.button
                  onClick={prevVerse}
                  className="p-2 border border-matrix/30 text-matrix hover:bg-matrix/10 rounded font-mono"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  ←
                </motion.button>
                
                <span className="text-glow font-mono text-sm">
                  {currentVerse + 1} / {verses.length}
                </span>
                
                <motion.button
                  onClick={nextVerse}
                  className="p-2 border border-matrix/30 text-matrix hover:bg-matrix/10 rounded font-mono"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  →
                </motion.button>
              </div>

              {/* Toggle English */}
              <motion.button
                onClick={() => setShowEnglish(!showEnglish)}
                className={`px-4 py-2 rounded font-mono text-sm transition-all duration-200 ${
                  showEnglish 
                    ? 'bg-matrix text-ink-0' 
                    : 'bg-matrix/10 text-matrix border border-matrix/30'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {showEnglish ? 'Hide English' : 'Show English'}
              </motion.button>

              {/* Copy Button */}
              <motion.button
                onClick={copyVerse}
                className="px-4 py-2 bg-matrix/10 text-matrix border border-matrix/30 rounded font-mono text-sm hover:bg-matrix/20 transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Copy
              </motion.button>
            </div>

            {/* Auto-play indicator */}
            <div className="text-center mt-6">
              <div className="flex items-center justify-center space-x-2 text-matrix/50 font-mono text-xs">
                <div className={`w-2 h-2 rounded-full ${isAutoPlaying ? 'bg-matrix animate-pulse' : 'bg-matrix/30'}`}></div>
                <span>{isAutoPlaying ? 'Auto-playing' : 'Paused'}</span>
              </div>
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center text-glow/70 font-mono text-sm"
          >
            <p>Hover over the verse to pause auto-play</p>
            <p className="mt-2">Click arrows to navigate manually</p>
          </motion.div>
        </div>
      </div>
      
      <footer className="py-8 px-4 md:px-6 lg:px-8 border-t border-matrix/20 mt-20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-4 text-sm text-matrix/70 font-mono">
            <span>© 2025 mishriki.org · all rights reserved</span>
            <span>•</span>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-matrix rounded-full animate-pulse"></div>
              <span>system status: ONLINE</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
