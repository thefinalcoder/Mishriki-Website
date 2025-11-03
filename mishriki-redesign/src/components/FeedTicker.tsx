'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import feedData from '@/content/feed.json';

export default function FeedTicker() {
  const [phrases, setPhrases] = useState<string[]>([]);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setPhrases(feedData.phrases);
  }, []);

  return (
    <section className="py-12 border-y border-[var(--border)]">
      <div className="overflow-hidden">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ 
            x: isHovered ? 0 : '-100%' 
          }}
          transition={{ 
            duration: 20, 
            ease: 'linear',
            repeat: Infinity,
            repeatType: 'loop'
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Duplicate content for seamless loop */}
          {[...phrases, ...phrases].map((phrase, index) => (
            <div key={index} className="flex items-center mx-8">
              <span className="text-matrix font-mono text-lg font-bold">
                {phrase}
              </span>
              <span className="text-matrix/30 mx-4">•</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
