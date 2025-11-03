'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';

export default function ParticleSignature() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 400 / 200, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    
    sceneRef.current = scene;
    rendererRef.current = renderer;

    renderer.setSize(400, 200);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Create particles
    const particleCount = 1000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    
    // Initialize particles in random positions
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      
      velocities[i * 3] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const material = new THREE.PointsMaterial({
      color: 0x00ff95,
      size: 0.1,
      transparent: true,
      opacity: 0.8,
    });
    
    const particles = new THREE.Points(geometry, material);
    particlesRef.current = particles;
    scene.add(particles);
    
    camera.position.z = 15;
    
    let time = 0;
    let signaturePhase = 0; // 0: random, 1: forming, 2: formed, 3: dispersing
    let currentShape = 0; // 0: ring, 1: pyramid, 2: cube, 3: sphere, 4: spiral
    const shapes = ['ring', 'pyramid', 'cube', 'sphere', 'spiral'];
    
    // Animation loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      
      time += 0.01;
      
      const positions = particles.geometry.attributes.position.array as Float32Array;
      
      // Form signature every 8 seconds, cycle through shapes
      if (Math.floor(time / 8) !== Math.floor((time - 0.01) / 8)) {
        signaturePhase = 1; // Start forming
        setTimeout(() => {
          signaturePhase = 2; // Formed
          setTimeout(() => {
            signaturePhase = 3; // Start dispersing
            setTimeout(() => {
              signaturePhase = 0; // Back to random
              currentShape = (currentShape + 1) % shapes.length; // Next shape
            }, 1500);
          }, 2500);
        }, 1500);
      }
      
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        
        if (signaturePhase === 0) {
          // Random movement
          positions[i3] += velocities[i3];
          positions[i3 + 1] += velocities[i3 + 1];
          positions[i3 + 2] += velocities[i3 + 2];
          
          // Wrap around
          if (positions[i3] > 10) positions[i3] = -10;
          if (positions[i3] < -10) positions[i3] = 10;
          if (positions[i3 + 1] > 5) positions[i3 + 1] = -5;
          if (positions[i3 + 1] < -5) positions[i3 + 1] = 5;
        } else if (signaturePhase === 1) {
          // Forming signature
          const targetX = Math.sin(i / particleCount * Math.PI * 2) * 3;
          const targetY = Math.cos(i / particleCount * Math.PI * 2) * 2;
          
          positions[i3] += (targetX - positions[i3]) * 0.05;
          positions[i3 + 1] += (targetY - positions[i3 + 1]) * 0.05;
        } else if (signaturePhase === 2) {
          // Form different shapes based on currentShape
          let targetX = 0, targetY = 0, targetZ = 0;
          
          if (currentShape === 0) {
            // RING
            const angle = (i / particleCount) * Math.PI * 2;
            targetX = Math.cos(angle) * 4;
            targetY = Math.sin(angle) * 2.5;
            targetZ = 0;
          } else if (currentShape === 1) {
            // PYRAMID
            const layer = Math.floor(Math.sqrt(i / particleCount) * 10);
            const posInLayer = i - (layer * layer * particleCount / 100);
            const layerSize = (10 - layer) / 10;
            const angle = (posInLayer / (particleCount / 10)) * Math.PI * 2;
            targetX = Math.cos(angle) * layerSize * 3;
            targetY = -3 + layer * 0.6;
            targetZ = Math.sin(angle) * layerSize * 3;
          } else if (currentShape === 2) {
            // CUBE
            const face = Math.floor(i / (particleCount / 6));
            const posInFace = i % (particleCount / 6);
            const gridSize = Math.sqrt(particleCount / 6);
            const row = Math.floor(posInFace / gridSize);
            const col = posInFace % gridSize;
            const u = (col / gridSize - 0.5) * 4;
            const v = (row / gridSize - 0.5) * 4;
            
            if (face === 0) { targetX = 2; targetY = v; targetZ = u; }       // right
            else if (face === 1) { targetX = -2; targetY = v; targetZ = -u; } // left
            else if (face === 2) { targetX = u; targetY = 2; targetZ = v; }   // top
            else if (face === 3) { targetX = u; targetY = -2; targetZ = -v; } // bottom
            else if (face === 4) { targetX = u; targetY = v; targetZ = 2; }   // front
            else { targetX = -u; targetY = v; targetZ = -2; }                 // back
          } else if (currentShape === 3) {
            // SPHERE
            const phi = Math.acos(-1 + (2 * i) / particleCount);
            const theta = Math.sqrt(particleCount * Math.PI) * phi;
            const radius = 3;
            targetX = radius * Math.cos(theta) * Math.sin(phi);
            targetY = radius * Math.sin(theta) * Math.sin(phi);
            targetZ = radius * Math.cos(phi);
          } else {
            // SPIRAL
            const t = (i / particleCount) * Math.PI * 6;
            const radius = 0.3 + t * 0.3;
            targetX = Math.cos(t) * radius;
            targetY = (i / particleCount - 0.5) * 6;
            targetZ = Math.sin(t) * radius;
          }
          
          positions[i3] += (targetX - positions[i3]) * 0.08;
          positions[i3 + 1] += (targetY - positions[i3 + 1]) * 0.08;
          positions[i3 + 2] += (targetZ - positions[i3 + 2]) * 0.08;
        } else if (signaturePhase === 3) {
          // Dispersing
          positions[i3] += velocities[i3] * 2;
          positions[i3 + 1] += velocities[i3 + 1] * 2;
          positions[i3 + 2] += velocities[i3 + 2] * 2;
        }
      }
      
      particles.geometry.attributes.position.needsUpdate = true;
      particles.rotation.y = time * 0.1;
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <section className="py-16 px-[clamp(16px,4vw,32px)]">
      <div className="max-w-[1200px] mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-mono font-bold text-matrix mb-8"
        >
          PARTICLE SIGNATURE
        </motion.h2>
        
        <div className="flex justify-center">
          <canvas
            ref={canvasRef}
            className="border border-[var(--border)] rounded-lg"
            style={{ width: '400px', height: '200px' }}
          />
        </div>
        
        <p className="text-accent font-mono text-sm mt-4">
          particles cycle through shapes every 8s • ring → pyramid → cube → sphere → spiral
        </p>
      </div>
    </section>
  );
}
