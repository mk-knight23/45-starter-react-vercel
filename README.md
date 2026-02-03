# 45-starter-react-vercel

**Theme: ⚡ Ultra-Modern Animated SaaS**

A production-ready React SaaS starter featuring authentication, dashboard, mock API services, and stunning animations. Built with React 19, Vite 6, and optimized for Vercel deployment.

## Live Demo

- **Vercel**: https://45-starter-react-vercel.vercel.app *(placeholder)*
- **GitHub Pages**: https://mk-knight23.github.io/45-starter-react-vercel/ *(placeholder)*

## Features

### Core SaaS Features
- 🔐 **Authentication Ready** - Mock login/signup pages with auth context and protected routes
- 📊 **Dashboard Shell** - Complete dashboard layout with sidebar navigation and user profile
- 🔌 **Mock API Services** - Pre-built API service layer for auth, users, and dashboard data
- 🎨 **Ultra-Modern Design** - Gradient backgrounds, glassmorphism, and smooth animations
- 🌓 **Dark Mode Ready** - Theme system with light/dark mode toggle support
- 📱 **Fully Responsive** - Mobile-first design that works on all devices

### Page Structure
- 🏠 **Landing Page** - Hero with animated gradients, features, pricing, and CTA sections
- 🔐 **Auth Pages** - Login and signup with form validation and demo credentials
- 📊 **Dashboard Pages** - Overview with stats, charts, and settings page
- ℹ️ **About Page** - Company information and team
- 📧 **Contact Page** - Contact form with validation
- 📝 **Blog Page** - Blog listing with search and filters

### Advanced UI Patterns
- 🎭 **Error Boundary** - Graceful error handling with user-friendly fallbacks
- ⏳ **Loading States** - Consistent loading indicators and skeleton screens
- 📭 **Empty States** - Thoughtful empty state components for better UX
- 🎨 **Framer Motion** - Smooth page transitions and scroll animations
- 🎯 **Protected Routes** - Route guards for authenticated pages

### Production Ready
- ✅ **TypeScript** - Full type safety with strict mode
- ✅ **ESLint** - Code quality and consistency checks
- ✅ **Vercel Config** - Optimized for Vercel deployment
- ✅ **Environment Variables** - .env.example template included
- ✅ **Shell Scripts** - Setup, build, lint, and deploy automation
- ✅ **Feature-Based Structure** - Organized by feature (auth, dashboard)

## Tech Stack
- **Frontend**: React 19, TypeScript
- **Routing**: React Router DOM 7
- **Styling**: Tailwind CSS v4 with custom gradients and utilities
- **Build Tool**: Vite 6
- **Animations**: Framer Motion 12
- **Icons**: Lucide React
- **Utilities**: clsx, tailwind-merge

## Quick Start

```bash
# Clone the repository
git clone https://github.com/mk-knight23/45-starter-react-vercel.git
cd 45-starter-react-vercel

# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run type-check

# Lint code
npm run lint
```

### Using Shell Scripts

```bash
# Full setup (install deps, type-check, build)
bash .claude/scripts/setup.sh

# Build with checks (type-check + lint + build)
bash .claude/scripts/build.sh

# Lint with auto-fix
bash .claude/scripts/lint.sh

# Deploy preparation (build + preview)
bash .claude/scripts/deploy.sh
```

### Demo Credentials

The mock auth system accepts any password with these demo emails:

- Email: `demo@example.com`
- Password: `any password`

## Project Structure

```
45-starter-react-vercel/
├── src/
│   ├── components/       # Shared UI components
│   │   ├── ErrorBoundary.tsx
│   │   ├── Loading.tsx
│   │   ├── EmptyState.tsx
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   ├── Pricing.tsx
│   │   ├── CTA.tsx
│   │   └── Footer.tsx
│   ├── pages/           # Landing page components
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   └── Blog.tsx
│   ├── features/        # Feature-based modules
│   │   ├── auth/       # Authentication feature
│   │   │   ├── AuthContext.tsx
│   │   │   ├── LoginPage.tsx
│   │   │   ├── SignupPage.tsx
│   │   │   └── ProtectedRoute.tsx
│   │   └── dashboard/  # Dashboard feature
│   │       ├── DashboardLayout.tsx
│   │       ├── DashboardHome.tsx
│   │       └── SettingsPage.tsx
│   ├── services/        # Mock API services
│   │   ├── api.ts
│   │   ├── auth.ts
│   │   └── dashboard.ts
│   ├── App.tsx          # Main app with routing
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles with theme
├── .claude/
│   ├── workflows/       # Documentation and workflows
│   │   └── audit.md
│   └── scripts/         # Automation scripts
│       ├── setup.sh
│       ├── build.sh
│       ├── lint.sh
│       └── deploy.sh
├── public/              # Static assets
├── docs/               # Documentation
├── vercel.json         # Vercel deployment config
├── .env.example        # Environment variables template
└── package.json
```

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Build settings are pre-configured in `vercel.json`
4. Deploy automatically on push to main branch

### Netlify

1. Connect repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Config file: `netlify.toml`

### GitHub Pages

1. Update `vite.config.ts` base path
2. Build: `npm run build`
3. Deploy `dist` folder to `gh-pages` branch
4. Enable GitHub Pages in repository settings

### Environment Variables

Create `.env.local` from `.env.example`:

```bash
cp .env.example .env.local
```

Add your environment-specific variables there.

## Documentation
- [Architecture Overview](docs/ARCHITECTURE.md)
- [Design System](docs/DESIGN.md)
- [Deployment Guide](docs/DEPLOY.md)

## Theme Identity

This application uses an **⚡ Ultra-Modern Animated SaaS** aesthetic:
- **Color Palette**: Indigo-to-purple gradients with glassmorphism effects
- **Typography**: Bold, modern Inter font with generous whitespace
- **Animations**: Framer Motion powered reveals and transitions
- **Gradients**: Smooth color transitions on buttons, backgrounds, and text
- **Shadows**: Soft, colored shadows for depth
- **Dark Mode Ready**: Theme system supports light/dark mode toggle

## Authentication

The starter includes a complete authentication system:

- **Auth Context**: React Context for global auth state
- **Mock API**: Pre-built auth service with login/signup/logout
- **Protected Routes**: Route guards for authenticated pages
- **Login/Signup Pages**: Beautiful, animated auth forms
- **Demo Credentials**: Built-in demo account for testing

## Dashboard

A complete dashboard shell is included:

- **Dashboard Layout**: Sidebar navigation with collapsible sections
- **Stats Overview**: Animated stat cards with trends
- **Chart Mockups**: Revenue and user growth visualizations
- **Settings Page**: Profile, notifications, and security settings
- **Responsive Design**: Mobile-friendly sidebar with backdrop

## Customization

### Changing Colors

Edit `src/index.css` to customize the gradient colors:

```css
.gradient-bg {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### Adding Pages

1. Create a new component in `src/pages/`
2. Add a route in `src/App.tsx`
3. Add navigation link in Navbar component

### Extending API Services

Add new services in `src/services/`:

```typescript
export const myService = {
  async getData(): Promise<ApiResponse<MyData>> {
    return mockRequest({ /* data */ });
  }
};
```

## License

MIT License - see [LICENSE](LICENSE) for details.

---

*Maintained by [Kazi Musharraf](https://github.com/mk-knight23)*
