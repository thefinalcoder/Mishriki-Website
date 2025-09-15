import RainCanvas from '@/components/RainCanvas';
import NavBar from '@/components/NavBar';
import Hero from '@/components/Hero';
import MatrixPlayground from '@/components/MatrixPlayground';
import FeedTicker from '@/components/FeedTicker';
import TerminalPulse from '@/components/TerminalPulse';
import ParticleSignature from '@/components/ParticleSignature';
import NowNext from '@/components/NowNext';
import PerformanceOptimizer from '@/components/PerformanceOptimizer';

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Performance Optimizer */}
      <PerformanceOptimizer />
      
      {/* Matrix Rain Background */}
      <RainCanvas />
      
      {/* Navigation */}
      <NavBar />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Matrix Playground */}
      <MatrixPlayground />
      
      {/* Feed Ticker */}
      <FeedTicker />
      
      {/* Terminal Pulse */}
      <TerminalPulse />
      
      {/* Particle Signature */}
      <ParticleSignature />
      
      {/* Now/Next */}
      <NowNext />
      
      {/* Footer */}
      <footer className="py-8 px-4 md:px-6 lg:px-8 border-t border-matrix/20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-4 text-sm text-matrix/70 font-mono">
            <span>© 2025 mishriki.org · all rights reserved</span>
            <span className="hidden md:inline">•</span>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-matrix rounded-full animate-pulse"></div>
              <span>system status: ONLINE</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}