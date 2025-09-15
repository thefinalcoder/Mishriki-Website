import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          0: '#0b0e11',
          1: '#101418',
        },
        matrix: '#00ff95',
        accent: '#9ae6b4',
        glow: '#b9ffd9',
      },
      fontSize: {
        'clamp-sm': 'clamp(0.875rem, 2vw, 1rem)',
        'clamp-base': 'clamp(1rem, 2.5vw, 1.125rem)',
        'clamp-lg': 'clamp(1.125rem, 3vw, 1.25rem)',
        'clamp-xl': 'clamp(1.25rem, 4vw, 1.5rem)',
        'clamp-2xl': 'clamp(1.5rem, 5vw, 2rem)',
        'clamp-3xl': 'clamp(2rem, 6vw, 3rem)',
        'clamp-4xl': 'clamp(2.5rem, 8vw, 4rem)',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'matrix-fall': 'matrixFall linear infinite',
        'typewriter': 'typewriter 2s steps(20) forwards',
        'scanline': 'scanline 0.1s linear',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite alternate',
        'flicker': 'flicker 0.15s infinite linear',
      },
      keyframes: {
        matrixFall: {
          '0%': { transform: 'translateY(-100vh)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        typewriter: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100vh)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        glowPulse: {
          '0%': { textShadow: '0 0 5px #00ff95' },
          '100%': { textShadow: '0 0 20px #00ff95, 0 0 30px #00ff95' },
        },
        flicker: {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': {
            opacity: '0.99',
            filter: 'brightness(0.4) contrast(1.1)',
          },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': {
            opacity: '0.4',
            filter: 'brightness(1.2) contrast(1.3)',
          },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
export default config;
