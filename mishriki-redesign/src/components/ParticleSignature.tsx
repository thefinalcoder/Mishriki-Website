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
    
    // Animation loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      
      time += 0.01;
      
      const positions = particles.geometry.attributes.position.array as Float32Array;
      
      // Form signature every 12 seconds
      if (Math.floor(time / 12) !== Math.floor((time - 0.01) / 12)) {
        signaturePhase = 1; // Start forming
        setTimeout(() => {
          signaturePhase = 2; // Formed
          setTimeout(() => {
            signaturePhase = 3; // Start dispersing
            setTimeout(() => {
              signaturePhase = 0; // Back to random
            }, 2000);
          }, 3000);
        }, 2000);
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
          // Form big "E" pattern
          const particlesPerSegment = particleCount / 4;
          const segment = Math.floor(i / particlesPerSegment);
          const indexInSegment = i % particlesPerSegment;
          
          let targetX = 0, targetY = 0;
          
          if (segment === 0) {
            // Vertical spine of E (left side)
            targetX = -3;
            targetY = 3 - (indexInSegment / particlesPerSegment) * 6;
          } else if (segment === 1) {
            // Top horizontal bar
            targetX = -3 + (indexInSegment / particlesPerSegment) * 4;
            targetY = 3;
          } else if (segment === 2) {
            // Middle horizontal bar
            targetX = -3 + (indexInSegment / particlesPerSegment) * 3;
            targetY = 0;
          } else {
            // Bottom horizontal bar
            targetX = -3 + (indexInSegment / particlesPerSegment) * 4;
            targetY = -3;
          }
          
          positions[i3] += (targetX - positions[i3]) * 0.1;
          positions[i3 + 1] += (targetY - positions[i3 + 1]) * 0.1;
          positions[i3 + 2] += (0 - positions[i3 + 2]) * 0.1;
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
        
      </div>
    </section>
  );
}
