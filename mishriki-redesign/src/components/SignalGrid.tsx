'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const projects = [
  { id: 'project-01', label: 'Project-01', slug: 'project-01' },
  { id: 'project-02', label: 'Project-02', slug: 'project-02' },
  { id: 'project-03', label: 'Project-03', slug: 'project-03' },
  { id: 'project-04', label: 'Project-04', slug: 'project-04' },
  { id: 'project-05', label: 'Project-05', slug: 'project-05' },
  { id: 'project-06', label: 'Project-06', slug: 'project-06' },
];

const codePoems = {
  'project-01': 'while(true) { dream(); code(); repeat(); }',
  'project-02': 'const reality = await simulate(infinity);',
  'project-03': 'if (consciousness.exists) { explore(); }',
  'project-04': 'function create() { return new Universe(); }',
  'project-05': 'for (let i = 0; i < ∞; i++) { learn(); }',
  'project-06': 'const wisdom = experience.reduce((a, b) => a + b);',
};

export default function SignalGrid() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const canvasRefs = useRef<{ [key: string]: HTMLCanvasElement | null }>({});

  useEffect(() => {
    projects.forEach((project) => {
      const canvas = canvasRefs.current[project.id];
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const animate = () => {
        ctx.fillStyle = '#0b0e11';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw matrix-style pattern
        const time = Date.now() * 0.001;
        const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        
        ctx.fillStyle = '#00ff95';
        ctx.font = '12px JetBrains Mono';
        
        for (let x = 0; x < canvas.width; x += 20) {
          for (let y = 0; y < canvas.height; y += 20) {
            const char = chars[Math.floor((x + y + time * 100) % chars.length)];
            const opacity = Math.sin(time + x * 0.01 + y * 0.01) * 0.5 + 0.5;
            ctx.globalAlpha = opacity * 0.3;
            ctx.fillText(char, x, y);
          }
        }
        
        ctx.globalAlpha = 1;
        requestAnimationFrame(animate);
      };

      animate();
    });
  }, []);

  const handleProjectClick = (projectId: string) => {
    setSelectedProject(projectId);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-mono font-bold text-matrix mb-12 text-center"
        >
          SIGNAL GRID
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group cursor-pointer"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              onClick={() => handleProjectClick(project.id)}
            >
              {/* Project Card */}
              <div className="relative aspect-square bg-ink-1 border border-matrix/20 rounded-lg overflow-hidden">
                {/* Shader Canvas */}
                <canvas
                  ref={(el) => {
                    canvasRefs.current[project.id] = el;
                  }}
                  width={400}
                  height={400}
                  className="w-full h-full"
                />

                {/* Hover Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: hoveredProject === project.id ? 1 : 0 
                  }}
                  className="absolute inset-0 bg-matrix/10 flex items-center justify-center"
                >
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ 
                      scale: hoveredProject === project.id ? 1 : 0.8,
                      opacity: hoveredProject === project.id ? 1 : 0
                    }}
                    className="text-matrix font-mono text-lg font-bold"
                  >
                    {project.label}
                  </motion.div>
                </motion.div>

                {/* Border Glow */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: hoveredProject === project.id ? 1 : 0 
                  }}
                  className="absolute inset-0 border-2 border-matrix rounded-lg"
                />
              </div>

              {/* Project Label */}
              <div className="mt-4 text-center">
                <span className="text-glow font-mono text-sm">
                  {project.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-ink-0/95 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-ink-1 border border-matrix/30 rounded-lg p-8 max-w-2xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <h3 className="text-2xl font-mono font-bold text-matrix mb-6">
                  {projects.find(p => p.id === selectedProject)?.label}
                </h3>
                
                <div className="bg-ink-0 border border-matrix/20 rounded p-6 mb-6">
                  <code className="text-accent font-mono text-lg">
                    {codePoems[selectedProject as keyof typeof codePoems]}
                  </code>
                </div>

                <div className="flex justify-center space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2 bg-matrix text-ink-0 font-mono font-bold rounded hover:bg-accent transition-colors"
                  >
                    View Details
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={closeModal}
                    className="px-6 py-2 border border-matrix text-matrix font-mono font-bold rounded hover:bg-matrix/10 transition-colors"
                  >
                    Close
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
