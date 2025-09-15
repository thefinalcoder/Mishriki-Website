'use client';

import { useEffect } from 'react';

export default function PerformanceOptimizer() {
  useEffect(() => {
    // Performance optimizations
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Reduce animations when tab is not visible
        document.body.style.setProperty('--animation-duration', '0s');
      } else {
        document.body.style.removeProperty('--animation-duration');
      }
    };

    const handleBatteryChange = () => {
      // @ts-ignore - Battery API is experimental
      if (navigator.getBattery) {
        navigator.getBattery().then((battery: any) => {
          if (battery.charging === false && battery.level < 0.2) {
            // Reduce performance on low battery
            document.body.classList.add('low-power-mode');
          } else {
            document.body.classList.remove('low-power-mode');
          }
        });
      }
    };

    // Reduced motion support
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReducedMotion.matches) {
      document.body.classList.add('reduced-motion');
    }

    // Intersection Observer for lazy loading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section) => observer.observe(section));

    // Event listeners
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleVisibilityChange);
    window.addEventListener('blur', handleVisibilityChange);
    
    // Battery API (if available)
    if ('getBattery' in navigator) {
      handleBatteryChange();
    }

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleVisibilityChange);
      window.removeEventListener('blur', handleVisibilityChange);
      observer.disconnect();
    };
  }, []);

  return null;
}
