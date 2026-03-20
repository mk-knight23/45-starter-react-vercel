# Deployment Guide

## Vercel Deployment

1. Push your repository to GitHub
2. Import the project in Vercel
3. Vercel automatically detects Vite configuration
4. Deploy!

### Build Command
```bash
npm run build
```

### Output Directory
```
dist
```

## Environment Variables
No environment variables required for the base starter.

## Performance
- Tree-shaken icon set for minimal bundle size
- Optimized CSS with Tailwind v4
- Vite-bundled assets with caching headers
