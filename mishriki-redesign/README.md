# mishriki.org - Matrix Aesthetic Redesign

A modern, interactive personal website with a Matrix-inspired aesthetic built with Next.js, Three.js, and Framer Motion.

## Features

### 🎨 Visual Design
- **Matrix Rain Effect**: Full-screen WebGL canvas with parallax layers and depth of field
- **Monochrome Palette**: Deep blacks with Matrix green accents
- **CRT Effects**: Subtle scanlines and vignette for cinema feel
- **Typography**: JetBrains Mono for code, Inter for UI

### 🧭 Navigation
- **Modern Glass Nav**: Always-visible navigation with backdrop blur
- **Neon Underlines**: Animated Matrix green underlines on hover
- **Mobile Responsive**: Collapsible menu for mobile devices
- **Keyboard Accessible**: Full keyboard navigation support

### 🏠 Homepage Modules
1. **Hero Section**: Typewriter effect with interactive cursor trail
2. **Signal Grid**: 3×2 project showcase with shader thumbnails
3. **Feed Ticker**: Horizontal marquee with real phrases
4. **Terminal Pulse**: Live mini console with cycling snippets
5. **Particle Signature**: Particles forming "ELI" every 12 seconds
6. **Now/Next**: Minimalist cards with current and future projects

### ⚡ Performance & Accessibility
- **Reduced Motion Support**: Respects user preferences
- **Battery Optimization**: Reduces effects on low battery
- **Intersection Observer**: Lazy loading for better performance
- **WCAG AA Compliant**: High contrast and keyboard navigation
- **GPU Optimized**: 60fps canvas animations with fallbacks

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with custom Matrix theme
- **Animation**: Framer Motion + GSAP
- **3D Graphics**: Three.js for WebGL effects
- **Icons**: Lucide React
- **Fonts**: JetBrains Mono + Inter

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
src/
├── app/
│   ├── lab/           # Shader experiments route
│   ├── globals.css    # Global styles and Matrix theme
│   ├── layout.tsx     # Root layout
│   └── page.tsx       # Homepage
├── components/
│   ├── RainCanvas.tsx      # WebGL Matrix rain
│   ├── NavBar.tsx          # Modern navigation
│   ├── Hero.tsx            # Hero section with typewriter
│   ├── SignalGrid.tsx      # Project showcase
│   ├── FeedTicker.tsx      # Horizontal marquee
│   ├── TerminalPulse.tsx   # Live console
│   ├── ParticleSignature.tsx # ELI particle formation
│   ├── NowNext.tsx         # Current/future projects
│   └── PerformanceOptimizer.tsx # Performance & a11y
└── content/
    └── feed.json       # Ticker phrases
```

## Customization

### Colors
The Matrix theme uses CSS custom properties defined in `globals.css`:
- `--ink-0`: Deep background (#0b0e11)
- `--ink-1`: Secondary background (#101418)
- `--matrix`: Primary Matrix green (#00ff95)
- `--accent`: Secondary green (#9ae6b4)
- `--glow`: Light accent (#b9ffd9)

### Content
- Update `src/content/feed.json` for ticker phrases
- Modify project data in `SignalGrid.tsx`
- Edit Now/Next items in `NowNext.tsx`

## Performance Notes

- Canvas animations are capped at 60fps
- Degrades to 30fps on battery saver mode
- Heavy shaders are deferred offscreen
- Uses `requestIdleCallback` for non-critical updates
- Respects `prefers-reduced-motion`

## Browser Support

- Modern browsers with WebGL support
- Graceful degradation for older browsers
- Mobile-optimized with touch support

## License

© 2025 mishriki.org · All rights reserved