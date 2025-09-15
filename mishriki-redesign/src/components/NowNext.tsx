'use client';

import { motion } from 'framer-motion';

const nowItems = [
  'finishing my degree at SDSU (graduating December 2026)',
  'Software Engineer at VLI',
  'TA for CS 596 Wireless Security and Cyber Security Tutor',
];

const nextItems = [
  'Systems Engineer at LPL Financial',
  'Working on a start up',
  'Possibly get an MBA',
  'Enjoy life',
];

export default function NowNext() {
  return (
    <section className="py-20 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-mono font-bold text-matrix mb-12 text-center"
        >
          NOW / NEXT
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Now */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-ink-1 border border-matrix/20 rounded-lg p-8"
          >
            <h3 className="text-xl font-mono font-bold text-matrix mb-6 flex items-center">
              <span className="w-3 h-3 bg-matrix rounded-full mr-3 animate-pulse"></span>
              NOW
            </h3>
            
            <ul className="space-y-4">
              {nowItems.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-glow font-mono text-sm flex items-start"
                >
                  <span className="text-matrix mr-3">•</span>
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Next */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-ink-1 border border-matrix/20 rounded-lg p-8"
          >
            <h3 className="text-xl font-mono font-bold text-matrix mb-6 flex items-center">
              <span className="w-3 h-3 bg-accent rounded-full mr-3"></span>
              NEXT
            </h3>
            
            <ul className="space-y-4">
              {nextItems.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-glow font-mono text-sm flex items-start"
                >
                  <span className="text-accent mr-3">→</span>
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
