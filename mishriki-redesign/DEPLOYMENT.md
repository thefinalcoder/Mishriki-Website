# GitHub Pages Deployment Guide

## 🚀 Automatic Deployment (Recommended)

The project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Setup Steps:

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Add Matrix redesign with GitHub Pages support"
   git push origin main
   ```

2. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Navigate to Settings → Pages
   - Under "Source", select "GitHub Actions"
   - The workflow will automatically deploy on every push to main

3. **Access your site:**
   - Your site will be available at: `https://yourusername.github.io/mishriki-redesign/`
   - Or if using a custom domain: `https://mishriki.org`

## 🛠 Manual Deployment

If you prefer manual deployment:

```bash
# Build the static site
npm run build

# The static files will be in the 'out' directory
# You can upload these to any static hosting service
```

## 📁 Project Structure for GitHub Pages

- **Static Export**: Configured with `output: 'export'` in `next.config.ts`
- **Base Path**: Set to `/mishriki-redesign` for GitHub Pages subdirectory
- **Asset Optimization**: Images are unoptimized for static hosting
- **Trailing Slash**: Enabled for better GitHub Pages compatibility

## 🔧 Configuration Files

- `next.config.ts` - Static export configuration
- `.github/workflows/deploy.yml` - GitHub Actions deployment
- `package.json` - Build and deploy scripts

## ✅ Features Preserved

All Matrix aesthetic features work in static export:
- ✅ Matrix rain effect (WebGL)
- ✅ Modern navigation
- ✅ Interactive components
- ✅ Particle signature
- ✅ Terminal pulse
- ✅ All animations and effects

The site will work perfectly on GitHub Pages! 🎉
