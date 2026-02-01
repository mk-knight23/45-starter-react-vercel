# 45-starter-react-vercel

**Theme: Black & White Minimal**

A production-ready React application featuring a sophisticated monochromatic design system, multi-page routing, interactive components, and modern best practices. Built for seamless Vercel deployment.

## Live Demo

- **Vercel**: https://45-starter-react-vercel.vercel.app *(placeholder)*
- **GitHub Pages**: https://mk-knight23.github.io/45-starter-react-vercel/ *(placeholder)*

## Features

### Core Features
- 🚀 **Multi-Page Application** - Home, About, Contact, and Blog pages with React Router
- ⚫ **Black & White Minimal Design** - Pure monochromatic aesthetic with sophisticated typography
- 📱 **Fully Responsive** - Mobile-first design that works on all devices
- ⚛️ **React 19** - Latest React features and performance improvements
- ⚡ **Vite 6** - Lightning-fast development and optimized production builds

### Interactive Elements
- 🎯 **Dynamic Navigation** - Active state highlighting with smooth transitions
- 📝 **Contact Form** - Form validation with loading and success states
- 🔍 **Blog Search & Filter** - Real-time search with category filtering
- 🎨 **Smooth Animations** - Framer Motion powered reveal animations

### Advanced UI Patterns
- 🎭 **Error Boundary** - Graceful error handling with user-friendly fallbacks
- ⏳ **Loading States** - Consistent loading indicators across the application
- 📭 **Empty States** - Thoughtful empty state components for better UX
- 🌙 **Mobile Menu** - Animated mobile navigation with backdrop blur

### Production Concerns
- ✅ **Error Handling** - Error boundary catches and displays errors gracefully
- ✅ **Loading States** - Visual feedback during async operations
- ✅ **Empty States** - Clear messaging when no content is available
- ✅ **Form Validation** - Client-side validation with user feedback
- ✅ **Accessibility** - ARIA labels, semantic HTML, keyboard navigation

## Tech Stack
- **Frontend**: React 19, TypeScript
- **Routing**: React Router DOM 7
- **Styling**: Tailwind CSS v4
- **Build Tool**: Vite 6
- **Icons**: Lucide React
- **Animations**: Framer Motion 12
- **Utilities**: clsx, tailwind-merge

## Quick Start

```bash
# Install dependencies
npm install

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

## Project Structure

```
45-starter-react-vercel/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── ErrorBoundary.tsx
│   │   ├── Loading.tsx
│   │   ├── EmptyState.tsx
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   ├── Pricing.tsx
│   │   ├── CTA.tsx
│   │   └── Footer.tsx
│   ├── pages/           # Page components
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   └── Blog.tsx
│   ├── App.tsx          # Main app with routing
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles
├── public/              # Static assets
├── docs/               # Documentation
├── vercel.json         # Vercel deployment config
└── package.json
```

## Deployment

### Vercel
1. Push code to GitHub
2. Import project in Vercel
3. Deploy automatically on push to main branch

### GitHub Pages
1. Build the project: `npm run build`
2. Deploy `dist` folder to `gh-pages` branch
3. Enable GitHub Pages in repository settings

### Netlify
1. Connect repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`

## Documentation
- [Architecture Overview](docs/ARCHITECTURE.md)
- [Design System](docs/DESIGN.md)
- [Deployment Guide](docs/DEPLOY.md)

## Screenshots

### Home Page
- Hero section with animated headline
- Feature grid with hover effects
- Pricing cards with featured plan
- Call-to-action section

### About Page
- Company mission and values
- Timeline of milestones
- Team member profiles
- Contact information

### Contact Page
- Contact form with validation
- Office hours display
- Contact information cards
- Success/error states

### Blog Page
- Featured article highlight
- Article grid with categories
- Search and filter functionality
- Newsletter subscription

## Theme Identity

This application uses a **Black & White Minimal** aesthetic:
- **Color Palette**: Pure black (#000000) and white (#ffffff) only
- **Typography**: Clean, bold typography with generous whitespace
- **Borders**: Thin black borders at 10-20% opacity
- **Animations**: Subtle, smooth transitions that enhance UX
- **No Color Accents**: Purely monochromatic design

## License

MIT License - see [LICENSE](LICENSE) for details.

---

*Maintained by [Kazi Musharraf](https://github.com/mk-knight23)*
