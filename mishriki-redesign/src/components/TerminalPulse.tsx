'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const terminalSnippets = [
  { command: 'uptime', output: '23:45:12 up 127 days, 4:32, 1 user, load average: 0.12, 0.08, 0.05' },
  { command: 'git log --oneline -1', output: 'a1b2c3d feat: implement matrix rain effect' },
  { command: 'date', output: 'Sat Sep 14 22:58:45 UTC 2024' },
  { command: 'echo $STATUS', output: 'ONLINE' },
  { command: 'cat /proc/version', output: 'Linux version 5.4.0-74-generic' },
];

const asciiBanner = [
  '⠀⠀⠀⠀⠀⠀⢀⣀⣤⣤⣤⣤⣤⣤⣤⣤⣤⣄⣀⣀⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀',
  '⠀⠀⠀⠀⢀⡴⠋⠀⢀⡤⣖⡫⠭⠭⠭⠭⣍⣑⣒⣒⣒⣻⠭⢝⠲⣄⡀⠀⠀⠀',
  '⠀⠀⠀⢀⡾⠁⠠⢖⡽⣪⡑⠬⡭⠭⢙⡄⠀⠀⠀⢐⠒⠒⠒⢤⠀⠀⠹⡄⠀⠀',
  '⠀⠀⣠⡞⠁⠀⠀⢈⡜⠁⠁⣠⣭⣄⠐⢈⢦⠀⠀⢠⠒⠈⠉⣩⠉⠲⢄⢷⡀⠀',
  '⠀⡴⡻⢛⣩⠥⣄⡙⢆⢀⠄⠛⠿⠋⠀⠅⡼⠁⠲⣇⠁⠀⠺⣿⠗⠀⢄⡧⡹⡆',
  '⢸⢱⢀⡏⠀⣰⣄⡉⠀⠉⠒⠛⠓⠚⣚⡉⠀⠀⠀⢯⣐⠠⠴⠤⠄⡒⠛⢸⢰⡇',
  '⢸⡄⡈⡇⠉⢻⡀⠙⢳⣦⣄⡉⠉⠁⣏⠤⠦⠄⠀⠀⡽⠇⠄⡀⢀⣿⡄⡊⢲⠇',
  '⠀⠻⣌⠒⠀⠈⣿⣶⣬⣧⣀⠉⠙⡷⠶⠤⢤⣄⣘⣛⣁⣠⣤⠖⡏⢻⡇⢠⡏⠀',
  '⠀⠀⠘⢧⠀⠀⣿⣿⣿⣿⣿⣿⣶⣧⣤⣀⣸⣇⣀⣸⣀⣀⣼⣤⣿⣾⣷⠘⡇⠀',
  '⠀⠀⠀⠘⢧⡀⢸⡿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⡇⠀',
  '⠀⠀⠀⠀⠈⠻⣆⠹⣌⢻⠻⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⡇⠀',
  '⠀⠀⠀⠀⠀⠀⠈⢳⡈⠻⣀⠀⠈⡟⠛⠻⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⡇⠀',
  '⠀⠀⠀⠀⠀⠀⠀⠀⠙⢦⡈⠓⢾⣇⡀⠀⢸⡇⠀⢸⠏⠉⡏⢹⣃⣷⠃⢠⠇⠀',
  '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠲⢤⣌⣉⠙⠛⠓⠒⠚⠓⠚⠋⠉⠉⣀⣠⠏⠀⠀',
  '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠉⠛⠛⠛⠛⠛⠛⠛⠛⠉⠉⠀⠀⠀⠀',
];

export default function TerminalPulse() {
  const [currentSnippet, setCurrentSnippet] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const snippet = terminalSnippets[currentSnippet];
    let index = 0;
    setDisplayText('');
    setIsTyping(true);

    const typeInterval = setInterval(() => {
      if (index < snippet.output.length) {
        setDisplayText(snippet.output.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(typeInterval);
        
        // Move to next snippet after delay
        setTimeout(() => {
          setCurrentSnippet((prev) => (prev + 1) % terminalSnippets.length);
        }, 3000);
      }
    }, 80);

    return () => clearInterval(typeInterval);
  }, [currentSnippet]);

  return (
    <section className="py-16 px-[clamp(16px,4vw,32px)]">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-transparent border border-[var(--border)] rounded-lg p-6 font-mono"
        >
          {/* Terminal Header */}
          <div className="flex items-center space-x-2 mb-4 pb-2 border-b border-[var(--border)]">
            <div className="flex space-x-1">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <span className="text-matrix/70 text-sm">terminal@mishriki.org</span>
          </div>

          {/* ASCII Banner */}
          <div className="text-matrix/60 text-xs mb-4">
            {asciiBanner.map((line, index) => (
              <div key={index}>{line}</div>
            ))}
          </div>

          {/* Command Line */}
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-matrix">$</span>
            <span className="text-accent">
              {terminalSnippets[currentSnippet].command}
            </span>
          </div>

          {/* Output */}
          <div className="text-glow">
            {displayText}
            {isTyping && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="text-matrix"
              >
                _
              </motion.span>
            )}
          </div>

          {/* Status Indicator */}
          <div className="mt-4 flex items-center space-x-2 text-xs text-matrix/50">
            <div className="w-2 h-2 bg-matrix rounded-full animate-pulse"></div>
            <span>system active</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
