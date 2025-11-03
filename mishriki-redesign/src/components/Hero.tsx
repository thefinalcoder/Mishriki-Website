'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const matrixChars = ['ア', 'カ', '七', '中', '本', '日', '月', '火', '水', '木', '金', '土'];

export default function Hero() {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const cursorTrailRef = useRef<HTMLDivElement>(null);
  const fullText = 'WELCOME TO MISHRIKI.ORG';

  useEffect(() => {
    let index = 0;
    const typeInterval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayText(fullText.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(typeInterval);
      }
    }, 100);

    return () => clearInterval(typeInterval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cursorTrailRef.current) return;

      // Create trailing character
      const char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
      const trail = document.createElement('div');
      
      trail.textContent = char;
      trail.className = 'fixed pointer-events-none text-matrix text-sm font-mono z-50';
      trail.style.left = e.clientX + 'px';
      trail.style.top = e.clientY + 'px';
      trail.style.transform = 'translate(-50%, -50%)';
      
      document.body.appendChild(trail);

      // Animate and remove
      setTimeout(() => {
        trail.style.transition = 'all 1s ease-out';
        trail.style.opacity = '0';
        trail.style.transform = 'translate(-50%, -50%) scale(0)';
        
        setTimeout(() => {
          if (trail.parentNode) {
            trail.parentNode.removeChild(trail);
          }
        }, 1000);
      }, 100);
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="hero relative overflow-hidden">
      <div className="text-center z-10">
        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-6xl md:text-8xl font-mono font-bold text-glow mb-8"
        >
          <span className="inline-block">
            {displayText}
            {isTyping && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="text-matrix"
              >
                |
              </motion.span>
            )}
          </span>
        </motion.h1>

        {/* Scanline Effect */}
        <motion.div
          initial={{ y: '-100vh' }}
          animate={{ y: '100vh' }}
          transition={{ duration: 0.1, delay: 2 }}
          className="absolute inset-0 w-full h-0.5 bg-matrix/30 pointer-events-none"
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.5 }}
          className="text-xl md:text-2xl text-accent font-mono mt-8"
        >
          Software Engineer • Cybersecurity • Student
        </motion.p>
      </div>

      {/* CRT Vignette */}
      <div className="crt-vignette" />
      
      {/* Scanline Overlay */}
      <div className="crt-overlay" />
    </section>
  );
}
