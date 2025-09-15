'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Glyph Mapper Component
function GlyphMapper() {
  const [mappedKeys, setMappedKeys] = useState<{ [key: string]: string }>({});
  const [isActive, setIsActive] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const katakanaChars = 'アカサタナハマヤラワガザダバパ';
  const copticChars = 'ⲀⲂⲄⲆⲈⲊⲌⲎⲐⲒⲔⲖⲘⲚⲜⲞⲠⲢⲤⲦⲨⲪⲬⲮⲰⲲⲴⲶⲸⲺⲼⲾⳀⳂⳄⳆⳈⳊⳌⳎⳐⳒⳔⳖⳘⳚⳜⳞⳠⳢ';

  const handleKeyPress = (e: KeyboardEvent) => {
    if (!isActive) return;
    
    const key = e.key.toLowerCase();
    if (key.length === 1) {
      const randomKatakana = katakanaChars[Math.floor(Math.random() * katakanaChars.length)];
      const randomCoptic = copticChars[Math.floor(Math.random() * copticChars.length)];
      
      setMappedKeys(prev => ({
        ...prev,
        [key]: Math.random() > 0.5 ? randomKatakana : randomCoptic
      }));

      // Create flowing glyph
      createFlowingGlyph(key, mappedKeys[key] || randomKatakana);
    }
  };

  const createFlowingGlyph = (key: string, glyph: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Create flowing animation
    let y = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#00ff95';
      ctx.font = '20px monospace';
      ctx.fillText(glyph, 50, y);
      
      y += 2;
      if (y < canvas.height) {
        requestAnimationFrame(animate);
      }
    };
    animate();
  };

  useEffect(() => {
    if (isActive) {
      document.addEventListener('keydown', handleKeyPress);
      return () => document.removeEventListener('keydown', handleKeyPress);
    }
  }, [isActive, mappedKeys, handleKeyPress]);

  return (
    <div className="bg-ink-1 border border-matrix/20 rounded-lg p-6 h-full">
      <h3 className="text-matrix font-mono font-bold mb-4">Glyph Mapper</h3>
      <p className="text-glow/70 font-mono text-sm mb-4">
        Click to activate, then type keys to map to glyphs
      </p>
      
      <motion.button
        onClick={() => setIsActive(!isActive)}
        className={`w-full py-2 px-4 rounded font-mono text-sm transition-all duration-200 ${
          isActive 
            ? 'bg-matrix text-ink-0' 
            : 'bg-matrix/10 text-matrix border border-matrix/30'
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {isActive ? 'ACTIVE - Type keys' : 'Click to Activate'}
      </motion.button>

      <div className="mt-4 space-y-2 max-h-32 overflow-y-auto">
        {Object.entries(mappedKeys).map(([key, glyph]) => (
          <div key={key} className="flex justify-between text-glow font-mono text-sm">
            <span>{key}</span>
            <span className="text-matrix">{glyph}</span>
          </div>
        ))}
      </div>

      <canvas
        ref={canvasRef}
        width={200}
        height={100}
        className="mt-4 w-full border border-matrix/10 rounded"
      />
    </div>
  );
}

// Code-Poems Component
function CodePoems() {
  const [currentPoem, setCurrentPoem] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const poems = [
    'while(true) { dream(); code(); repeat(); }',
    'const reality = await simulate(infinity);',
    'if (consciousness.exists) { explore(); }',
    'function create() { return new Universe(); }',
    'for (let i = 0; i < ∞; i++) { learn(); }',
    'const wisdom = experience.reduce((a, b) => a + b);',
  ];

  useEffect(() => {
    let index = 0;
    setDisplayText('');
    setIsTyping(true);

    const typeInterval = setInterval(() => {
      if (index < poems[currentPoem].length) {
        setDisplayText(poems[currentPoem].slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(typeInterval);
        
        setTimeout(() => {
          setCurrentPoem((prev) => (prev + 1) % poems.length);
        }, 3000);
      }
    }, 100);

    return () => clearInterval(typeInterval);
  }, [currentPoem, poems]);

  return (
    <div className="bg-ink-1 border border-matrix/20 rounded-lg p-6 h-full">
      <h3 className="text-matrix font-mono font-bold mb-4">Code-Poems</h3>
      
      <div className="bg-ink-0 border border-matrix/10 rounded p-4 mb-4 min-h-[120px] flex items-center justify-center">
        <div className="text-accent font-mono text-sm">
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
        </div>
      </div>

      <motion.button
        onClick={() => setShowModal(true)}
        className="w-full py-2 px-4 bg-matrix/10 text-matrix border border-matrix/30 rounded font-mono text-sm hover:bg-matrix/20 transition-all duration-200"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        View Shader
      </motion.button>

      {/* Shader Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-ink-0/95 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-ink-1 border border-matrix/30 rounded-lg p-8 max-w-2xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-mono font-bold text-matrix mb-6">
                Animated Shader Tile
              </h3>
              
              <div className="bg-ink-0 border border-matrix/20 rounded p-6 mb-6 h-64 flex items-center justify-center">
                <div className="text-matrix font-mono text-sm">
                  {/* Animated shader pattern */}
                  <div className="animate-pulse">
                    <div className="w-32 h-32 bg-gradient-to-br from-matrix/20 to-matrix/40 rounded"></div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <motion.button
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2 border border-matrix text-matrix font-mono font-bold rounded hover:bg-matrix/10 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Packet Stream Viz Component
function PacketStreamViz() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null);

  const labels = ['SDSU', 'VLI', 'LPL', 'CS596', 'MBA'];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
    }> = [];

    const createParticle = () => {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        life: 0,
        maxLife: 100 + Math.random() * 100,
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create new particles
      if (Math.random() < 0.1) {
        createParticle();
      }

      // Update and draw particles
      particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life++;

        const alpha = 1 - (particle.life / particle.maxLife);
        ctx.fillStyle = `rgba(0, 255, 149, ${alpha})`;
        ctx.fillRect(particle.x, particle.y, 2, 2);

        if (particle.life >= particle.maxLife) {
          particles.splice(index, 1);
        }
      });

      // Draw label if hovering
      if (hoveredLabel) {
        ctx.fillStyle = '#00ff95';
        ctx.font = '16px monospace';
        ctx.fillText(hoveredLabel, canvas.width / 2 - 20, canvas.height / 2);
      }

      requestAnimationFrame(animate);
    };

    animate();
  }, [hoveredLabel]);

  return (
    <div className="bg-ink-1 border border-matrix/20 rounded-lg p-6 h-full">
      <h3 className="text-matrix font-mono font-bold mb-4">Packet Stream Viz</h3>
      <p className="text-glow/70 font-mono text-sm mb-4">
        Hover to see network labels
      </p>
      
      <canvas
        ref={canvasRef}
        width={300}
        height={200}
        className="w-full border border-matrix/10 rounded mb-4"
        onMouseEnter={() => setHoveredLabel(labels[Math.floor(Math.random() * labels.length)])}
        onMouseLeave={() => setHoveredLabel(null)}
      />

      <div className="space-y-1">
        {labels.map((label) => (
          <div key={label} className="text-glow/70 font-mono text-xs">
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MatrixPlayground() {
  return (
    <section id="projects" className="py-20 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-mono font-bold text-matrix mb-12 text-center"
        >
          MATRIX PLAYGROUND
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <GlyphMapper />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <CodePoems />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <PacketStreamViz />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
