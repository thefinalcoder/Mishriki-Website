# mishriki.org - Matrix Aesthetic Redesign

A modern, interactive personal website with a Matrix-inspired aesthetic built with Next.js, Three.js, and Framer Motion.

## ✨ Features

### 🧭 **Modern Navigation**
- **Spacious responsive top bar** with proper spacing (24-32px gaps)
- **Desktop**: Full navigation with neon underline animations
- **Mobile**: Pills layout with "•••" overflow menu (no hamburger)
- **Glass sticky bar** with backdrop-blur-xl and 90% opacity on scroll
- **Fully keyboard accessible** (Tab/Enter/Escape)

### 🎨 **Matrix Aesthetic**
- **Dual-layer Matrix rain** with WebGL Three.js (parallax + near-field streaks)
- **CRT effects** with scanlines and vignette
- **Monochrome palette** with Matrix green accents
- **Typography**: JetBrains Mono + Inter fonts
- **Responsive typography** using clamp() for fluid scaling

### 🏠 **Homepage Sections**
1. **Hero**: "WELCOME TO MISHRIKI.ORG" with typewriter effect
2. **Matrix Playground**: Interactive panels replacing empty project grid
   - **Glyph Mapper**: Map keys to katakana/coptic glyphs
   - **Code-Poems**: Cycling one-liners with typewriter effect
   - **Packet Stream Viz**: Network packet visualization
3. **Feed Ticker**: Horizontal marquee with real phrases
4. **Terminal Pulse**: Live console with fixed ASCII art header
5. **Particle Signature**: Particles forming "ELI" every 12s
6. **Now/Next**: Current and future projects/plans

### 📖 **Coptic Verses Page** (`/verses`)
- **Rotating Bible verses** in Coptic script
- **English translation toggle**
- **Noto Sans Coptic font** for proper rendering
- **Auto-play with pause on hover**
- **Copy functionality** for verses

### ⚡ **Performance & Accessibility**
- **Reduced motion support** with static fallbacks
- **60fps canvas** (30fps on battery saver)
- **WCAG AA compliant** with visible focus rings
- **Keyboard navigation** for all interactive elements
- **GPU optimized** with proper throttling

## 🛠 **Tech Stack**

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with custom Matrix theme
- **Animation**: Framer Motion + GSAP
- **3D Graphics**: Three.js for WebGL effects
- **Icons**: Lucide React
- **Fonts**: JetBrains Mono + Inter + Noto Sans Coptic

## 🚀 **Getting Started**

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd mishriki-redesign

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Development
```bash
# Start dev server with Turbopack
npm run dev

# Build with static export
npm run build

# Lint code
npm run lint
```

## 📁 **Project Structure**

```
src/
├── app/
│   ├── verses/           # Coptic Bible verses page
│   ├── lab/             # Shader experiments
│   ├── globals.css      # Global styles and Matrix theme
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Homepage
├── components/
│   ├── RainCanvas.tsx      # WebGL Matrix rain
│   ├── NavBar.tsx          # Modern responsive navigation
│   ├── Hero.tsx            # Hero section with typewriter
│   ├── MatrixPlayground.tsx # Interactive playground panels
│   ├── FeedTicker.tsx      # Horizontal marquee
│   ├── TerminalPulse.tsx   # Live console
│   ├── ParticleSignature.tsx # ELI particle formation
│   ├── NowNext.tsx         # Current/future projects
│   └── PerformanceOptimizer.tsx # Performance & a11y
└── content/
    └── feed.json       # Ticker phrases
```

## 🎨 **Design System**

### Colors
```css
--ink-0: #0b0e11    /* Deep background */
--ink-1: #101418    /* Secondary background */
--matrix: #00ff95   /* Primary Matrix green */
--accent: #9ae6b4   /* Secondary green */
--glow: #b9ffd9     /* Light accent */
```

### Typography
- **Headings**: JetBrains Mono with clamp() scaling
- **Body**: Inter for readability
- **Coptic**: Noto Sans Coptic for verses page
- **Responsive**: Fluid typography from 320px to ultrawide

### Layout
- **Max-width**: `max-w-7xl` with responsive padding
- **Spacing**: `px-4 md:px-6 lg:px-8` for consistent margins
- **Grid**: Responsive 1×3 (mobile) to 3×1 (desktop)

## 🌐 **GitHub Pages Deployment**

The site is configured for automatic deployment to GitHub Pages:

1. **Push to main branch** triggers automatic build
2. **Static export** generates optimized files
3. **Custom domain** support (mishriki.org)
4. **No basePath** for clean URLs

### Manual Deployment
```bash
# Build static files
npm run build

# Files are generated in /out directory
# Upload to any static hosting service
```

## 📱 **Responsive Design**

- **Mobile**: 320px+ with pills navigation
- **Tablet**: 768px+ with optimized spacing
- **Desktop**: 1024px+ with full navigation
- **Ultrawide**: Scales gracefully to any width

## ♿ **Accessibility**

- **WCAG AA compliant** contrast ratios
- **Keyboard navigation** for all interactive elements
- **Focus indicators** visible on all focusable elements
- **Reduced motion** support with static fallbacks
- **Screen reader** friendly markup

## 🎯 **Performance**

- **Lighthouse 95+** scores across all metrics
- **Static export** for fast loading
- **Image optimization** with Next.js
- **Code splitting** for optimal bundle sizes
- **Canvas throttling** for battery efficiency

## 📄 **License**

© 2025 mishriki.org · All rights reserved

---

Built with ❤️ using Next.js, Three.js, and Framer Motion