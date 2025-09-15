'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Ⲡⲓⲃⲓⲃⲗⲟⲥ', href: '/verses' },
  { label: 'About', href: '/about' },
  { label: 'Notes', href: '/notes' },
  { label: 'Contact', href: '/contact' },
];

export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOverflowOpen, setIsOverflowOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('Home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWordmarkClick = () => {
    // Subtle glitch effect
    const wordmark = document.querySelector('.wordmark');
    if (wordmark) {
      wordmark.classList.add('animate-flicker');
      setTimeout(() => {
        wordmark.classList.remove('animate-flicker');
      }, 300);
    }
  };

  // Mobile pills layout - show first 3 items, rest in overflow
  const visibleItems = navItems.slice(0, 3);
  const overflowItems = navItems.slice(3);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-ink-1/90 backdrop-blur-xl border-b border-matrix/20' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Wordmark */}
          <motion.button
            onClick={handleWordmarkClick}
            className="wordmark text-lg md:text-xl font-mono font-bold text-matrix hover:text-glow transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            mishriki.org
          </motion.button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                className="relative text-glow hover:text-matrix transition-colors duration-200 font-mono text-base"
                onMouseEnter={() => setActiveItem(item.label)}
                onMouseLeave={() => setActiveItem('')}
                whileHover={{ y: -2 }}
              >
                {item.label}
                
                {/* Neon underline */}
                <motion.div
                  className="absolute -bottom-1 left-0 h-0.5 bg-matrix"
                  initial={{ width: 0 }}
                  animate={{ 
                    width: activeItem === item.label ? '100%' : 0 
                  }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                />
              </motion.a>
            ))}
          </div>

          {/* Tablet/Mobile Pills Navigation */}
          <div className="lg:hidden flex items-center space-x-2">
            {/* Visible pills */}
            <div className="flex items-center space-x-2">
              {visibleItems.map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  className="px-3 py-1.5 text-glow hover:text-matrix hover:bg-matrix/10 transition-all duration-200 font-mono text-sm rounded-full border border-matrix/20"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.label}
                </motion.a>
              ))}
            </div>

            {/* Overflow button */}
            {overflowItems.length > 0 && (
              <div className="relative">
                <motion.button
                  onClick={() => setIsOverflowOpen(!isOverflowOpen)}
                  className="px-3 py-1.5 text-matrix hover:text-glow hover:bg-matrix/10 transition-all duration-200 font-mono text-sm rounded-full border border-matrix/20"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="More navigation items"
                >
                  •••
                </motion.button>

                {/* Overflow menu */}
                <AnimatePresence>
                  {isOverflowOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      className="absolute top-full right-0 mt-2 bg-ink-1/95 backdrop-blur-xl rounded-lg border border-matrix/20 overflow-hidden shadow-lg"
                    >
                      <div className="py-2">
                        {overflowItems.map((item) => (
                          <motion.a
                            key={item.label}
                            href={item.href}
                            className="block px-4 py-2 text-glow hover:text-matrix hover:bg-matrix/10 transition-all duration-200 font-mono text-sm"
                            onClick={() => setIsOverflowOpen(false)}
                            whileHover={{ x: 4 }}
                          >
                            {item.label}
                          </motion.a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
