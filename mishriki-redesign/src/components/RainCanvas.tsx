'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function RainCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const animationRef = useRef<number>();

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    
    sceneRef.current = scene;
    rendererRef.current = renderer;

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Matrix characters
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    
    // Create rain columns
    const columns: THREE.Mesh[] = [];
    const columnCount = Math.floor(window.innerWidth / 20);
    
    for (let i = 0; i < columnCount; i++) {
      const geometry = new THREE.PlaneGeometry(1, 1);
      const material = new THREE.MeshBasicMaterial({
        color: 0x00ff95,
        transparent: true,
        opacity: 0.8,
      });
      
      const column = new THREE.Mesh(geometry, material);
      column.position.x = (i - columnCount / 2) * 20;
      column.position.y = Math.random() * 100 - 50;
      column.position.z = -50;
      
      // Add text texture
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      canvas.width = 64;
      canvas.height = 64;
      
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, 64, 64);
      ctx.fillStyle = '#00ff95';
      ctx.font = '12px JetBrains Mono';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // Random characters for this column
      const columnChars = Array.from({ length: 20 }, () => 
        chars[Math.floor(Math.random() * chars.length)]
      );
      
      columnChars.forEach((char, j) => {
        ctx.fillText(char, 32, j * 3 + 10);
      });
      
      const texture = new THREE.CanvasTexture(canvas);
      material.map = texture;
      material.needsUpdate = true;
      
      columns.push(column);
      scene.add(column);
    }
    
    // Add depth of field effect
    const depthMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec2 resolution;
        varying vec2 vUv;
        
        float noise(vec2 p) {
          return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
        }
        
        void main() {
          vec2 uv = vUv;
          float grain = noise(uv * 1000.0 + time) * 0.1;
          gl_FragColor = vec4(grain, grain, grain, 1.0);
        }
      `,
    });
    
    const depthPlane = new THREE.PlaneGeometry(2, 2);
    const depthMesh = new THREE.Mesh(depthPlane, depthMaterial);
    depthMesh.position.z = -1;
    scene.add(depthMesh);
    
    camera.position.z = 0;
    
    // Animation loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      
      const time = Date.now() * 0.001;
      
      // Animate columns
      columns.forEach((column, i) => {
        column.position.y -= 0.5 + Math.sin(time + i) * 0.1;
        
        if (column.position.y < -100) {
          column.position.y = 100;
        }
        
        // Fade effect
        const material = column.material as THREE.MeshBasicMaterial;
        const distance = Math.abs(column.position.y);
        material.opacity = Math.max(0.1, 1 - distance / 100);
      });
      
      // Update depth material
      depthMaterial.uniforms.time.value = time;
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle resize
    const handleResize = () => {
      if (!renderer || !camera) return;
      
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="matrix-canvas"
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none'
      }}
    />
  );
}
