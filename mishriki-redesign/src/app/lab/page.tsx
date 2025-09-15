import RainCanvas from '@/components/RainCanvas';
import NavBar from '@/components/NavBar';

export default function LabPage() {
  return (
    <main className="relative min-h-screen">
      <RainCanvas />
      <NavBar />
      
      <div className="pt-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-mono font-bold text-matrix mb-8">
            LAB
          </h1>
          
          <div className="bg-ink-1 border border-matrix/20 rounded-lg p-8">
            <h2 className="text-xl font-mono font-bold text-matrix mb-4">
              Shader Experiments
            </h2>
            <p className="text-glow font-mono text-sm mb-6">
              This is where shader experiments and creative coding projects will live.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-ink-0 border border-matrix/10 rounded p-6">
                <h3 className="text-matrix font-mono font-bold mb-2">Coming Soon</h3>
                <p className="text-glow/70 font-mono text-sm">
                  Interactive shader playground
                </p>
              </div>
              
              <div className="bg-ink-0 border border-matrix/10 rounded p-6">
                <h3 className="text-matrix font-mono font-bold mb-2">Coming Soon</h3>
                <p className="text-glow/70 font-mono text-sm">
                  WebGL experiments
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <footer className="py-8 px-6 border-t border-matrix/20 mt-20">
        <div className="max-w-7xl mx-auto text-center">
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
