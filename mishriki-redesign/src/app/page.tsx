import RainCanvas from '@/components/RainCanvas';
import NavBar from '@/components/NavBar';
import Hero from '@/components/Hero';
import SignalGrid from '@/components/SignalGrid';
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
      
      {/* Signal Grid */}
      <SignalGrid />
      
      {/* Feed Ticker */}
      <FeedTicker />
      
      {/* Terminal Pulse */}
      <TerminalPulse />
      
      {/* Particle Signature */}
      <ParticleSignature />
      
      {/* Now/Next */}
      <NowNext />
      
      {/* Footer */}
      <footer className="pt-16 pb-8 border-t border-[var(--border)]">
        <div className="text-center" style={{ maxWidth: 'var(--page-max)', margin: '0 auto', paddingInline: 'clamp(16px, 4vw, 32px)' }}>
          <div className="flex items-center justify-center space-x-4 text-sm text-matrix/70 font-mono">
            <span>© 2025 mishriki.org · all rights reserved</span>
            <span>•</span>
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