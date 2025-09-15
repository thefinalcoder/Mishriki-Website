'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Notes', href: '/notes' },
  { label: 'Contact', href: '/contact' },
];

export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Wordmark */}
          <motion.button
            onClick={handleWordmarkClick}
            className="wordmark text-xl font-mono font-bold text-matrix hover:text-glow transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            mishriki.org
          </motion.button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                className="relative text-glow hover:text-matrix transition-colors duration-200 font-mono text-sm"
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
                  transition={{ duration: 0.15, ease: 'easeOut' }}
                />
              </motion.a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-matrix hover:text-glow transition-colors duration-200"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <div className="flex flex-col space-y-1">
              <div className="w-6 h-0.5 bg-current"></div>
              <div className="w-6 h-0.5 bg-current"></div>
              <div className="w-6 h-0.5 bg-current"></div>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 bg-ink-1/95 backdrop-blur-xl rounded-lg border border-matrix/20 overflow-hidden"
            >
              <div className="py-4 space-y-2">
                {navItems.map((item) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    className="block px-6 py-3 text-glow hover:text-matrix hover:bg-matrix/10 transition-all duration-200 font-mono text-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
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
    </motion.nav>
  );
}
