# Deployment Guide

## Prerequisites

- Node.js 18+ installed
- Git installed and configured
- Vercel CLI (optional): `npm i -g vercel`
- Netlify CLI (optional): `npm i -g netlify`

## Quick Deploy to Vercel

### Option 1: Via Vercel Dashboard (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "feat: initial SaaS starter with auth and dashboard"
   git push origin main
   ```

2. **Import in Vercel**
   - Go to https://vercel.com/new
   - Import your GitHub repository
   - Framework preset: "Vite"
   - Build command: `npm run build`
   - Output directory: `dist`
   - Click "Deploy"

3. **Environment Variables** (Optional)
   - Add any required environment variables in Vercel dashboard
   - See `.env.example` for available variables

### Option 2: Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

## Deploy to Netlify

### Option 1: Via Netlify Dashboard

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "feat: initial SaaS starter"
   git push origin main
   ```

2. **Import in Netlify**
   - Go to https://app.netlify.com/start
   - Import your GitHub repository
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Click "Deploy site"

### Option 2: Via Netlify CLI

```bash
# Install Netlify CLI
npm i -g netlify

# Login to Netlify
netlify login

# Initialize site
netlify init

# Deploy to production
netlify deploy --prod
```

## Deploy to GitHub Pages

1. **Update vite.config.ts**
   ```typescript
   export default defineConfig({
     // ... other config
     base: '/your-repo-name/',
   })
   ```

2. **Build and Deploy**
   ```bash
   npm run build

   # Install gh-pages if needed
   npm i -D gh-pages

   # Deploy to gh-pages branch
   npx gh-pages -d dist
   ```

3. **Enable GitHub Pages**
   - Go to repository Settings > Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages` / `root`
   - Click Save

## Pre-Deployment Checklist

### Build Tests

```bash
# Run all checks
bash .claude/scripts/build.sh

# Or manually:
npm run type-check  # TypeScript checks
npm run lint        # ESLint checks
npm run build       # Production build
```

### Verify

- [ ] Build completes without errors
- [ ] `dist/` folder is created
- [ ] `.env.local` is NOT in git (use `.env.example`)
- [ ] No hardcoded secrets in code
- [ ] All npm scripts work (dev, build, preview, type-check, lint)

## Environment Variables

### Local Development

```bash
cp .env.example .env.local
# Edit .env.local with your values
npm run dev
```

### Production (Vercel)

1. Go to Project Settings > Environment Variables
2. Add variables from `.env.example`
3. Redeploy if needed

### Production (Netlify)

1. Go to Site settings > Build & deploy > Environment
2. Add variables from `.env.example`
3. Redeploy if needed

## Post-Deployment

### Verify Deployment

1. **Check the deployed URL**
2. **Test key flows**:
   - Landing page loads
   - Auth pages (login/signup) render
   - Dashboard accessible after "login"
   - All navigation works
   - Mobile responsive

3. **Check browser console** for errors

### Performance Checks

- **Lighthouse Score**: Run Lighthouse audit (aim for 90+)
- **Build Size**: Check bundle size in build output
- **Load Time**: Test on slow 3G connection

## Troubleshooting

### Build Fails

1. Check Node.js version: `node --version` (should be 18+)
2. Clear cache: `rm -rf node_modules dist && npm install`
3. Check error messages in build output
4. Verify TypeScript compilation: `npm run type-check`

### Deployment Fails

1. Check build logs in platform dashboard
2. Verify environment variables are set
3. Ensure `vercel.json` or `netlify.toml` is present
4. Check build command matches: `npm run build`

### Routes Not Working

1. Verify SPA rewrite rules in `vercel.json` or `netlify.toml`
2. Check React Router configuration in `App.tsx`
3. Test on different routes directly

## Maintenance

### Update Dependencies

```bash
# Check for updates
npm outdated

# Update dependencies
npm update

# Test everything
bash .claude/scripts/build.sh
```

### Monitor Performance

- Use Vercel Analytics (built-in)
- Set up error tracking (Sentry, LogRocket)
- Monitor bundle size with `bundlesize`

## Custom Domains

### Vercel

1. Go to Project Settings > Domains
2. Add custom domain
3. Configure DNS (CNAME record)
4. Wait for SSL certificate

### Netlify

1. Go to Domain settings
2. Add custom domain
3. Configure DNS
4. Enable HTTPS

## CI/CD

### GitHub Actions (Optional)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

## Support

For issues or questions:
- Check `.claude/workflows/audit.md` for known issues
- Review documentation in `docs/`
- Open an issue on GitHub
