# 45-starter-react-vercel

**Perfect React Starter Pack for Production Apps**

A comprehensive, production-ready React starter with 10+ essential features. Built with React 19, TypeScript, Vite 6, and optimized for Vercel deployment.

## 🚀 Live Demo

| Platform | URL |
|----------|-----|
| **Vercel** | [45-starter-react-vercel.vercel.app](https://45-starter-react-vercel.vercel.app) |
| **Cloudflare** | [45-starter-react-vercel.pages.dev](https://45-starter-react-vercel.pages.dev) |
| **GitHub Pages** | [mk-knight23.github.io/45-starter-react-vercel](https://mk-knight23.github.io/45-starter-react-vercel) |

---

## ✨ 10+ Production-Ready Features

### 1. API Request Caching with React Query
- Automatic caching and stale-while-revalidate
- Request deduplication
- Retry logic with exponential backoff
- Optimistic updates support
- Cache management utilities

```typescript
import { useApiQuery, useApiMutation } from '@/services/apiClient'

const { data, isLoading } = useApiQuery(['users'], '/users')
const createMutation = useApiMutation<User, CreateUserInput>('/users', 'POST')
```

### 2. Form Validation with React Hook Form + Zod
- Type-safe form validation
- Pre-built common validation schemas
- Custom form hook with minimal boilerplate
- Error handling and display
- Password confirmation, email, phone validators

```typescript
import { useCustomForm, formSchemas } from '@/services/formValidation'

const { form, handleSubmit, renderField } = useCustomForm({
  schema: formSchemas.login,
  onSubmit: async (data) => { /* submit logic */ }
})
```

### 3. Toast Notification System
- Beautiful, non-intrusive notifications
- Success, error, warning, info variants
- Auto-dismiss with configurable duration
- Promise-based toasts
- Zustand state management

```typescript
import { toast } from '@/components/Toast'

toast.success('Changes saved!')
toast.error('Something went wrong')
toast.promise(apiCall(), {
  loading: 'Saving...',
  success: 'Saved!',
  error: 'Failed to save'
})
```

### 4. Modal/Dialog Component Library
- Accessible modal system
- Multiple sizes (sm, md, lg, xl, full)
- Confirmation and alert dialogs
- Keyboard (ESC) support
- Overlay click to close
- Stackable modals

```typescript
import { modal } from '@/components/Modal'

const confirmed = await modal.confirm('Are you sure?')
modal.alert('Operation complete')
modal.open({ title: 'Custom Modal', content: <div>...</div> })
```

### 5. Infinite Scroll Component
- Load more data as user scrolls
- Configurable threshold
- Custom loading and end messages
- Works with any data source
- Intersection Observer API

```typescript
import { InfiniteScroll, useInfiniteScroll } from '@/components/InfiniteScroll'

<InfiniteScroll
  items={items}
  renderItem={(item) => <div>{item.name}</div>}
  onLoadMore={loadMore}
  hasMore={hasMore}
/>
```

### 6. Virtual List for Large Datasets
- Efficient rendering of 10,000+ items
- Dynamic item heights
- Configurable overscan
- Binary search for performance
- Smooth scrolling

```typescript
import { VirtualList } from '@/components/VirtualList'

<VirtualList
  items={largeDataset}
  renderItem={(item) => <div>{item.name}</div>}
  itemHeight={50}
  containerHeight={600}
/>
```

### 7. Image Optimization Component
- Lazy loading with Intersection Observer
- WebP support with fallbacks
- Responsive srcset generation
- Blur-up placeholders
- Progressive loading

```typescript
import { OptimizedImage, Avatar, ImageGallery } from '@/components/OptimizedImage'

<OptimizedImage src="/image.jpg" webpSrc="/image.webp" alt="Description" />
<Avatar src="/avatar.jpg" alt="User" size="md" />
```

### 8. SEO Meta Tags Management
- Dynamic meta tags
- Open Graph support
- Twitter Card support
- Structured data (JSON-LD)
- Breadcrumb, Article, Organization schemas

```typescript
import { SEO, ArticleSchema, WebSiteSchema } from '@/components/SEO'

<SEO
  title="Page Title"
  description="Page description"
  image="/og-image.png"
/>
<ArticleSchema {...articleData} />
```

### 9. Internationalization (i18n) Support
- 10 built-in languages
- Context-based translations
- Parameter interpolation
- Language switcher component
- localStorage persistence
- RTL support for Arabic

```typescript
import { useI18n } from '@/services/i18n'

const { t, locale, setLocale } = useI18n()
t('common.welcome') // "Welcome"
t('errors.minLength', { min: 5 }) // "Must be at least 5 characters"
```

### 10. Unit Testing Setup with Vitest
- Ready-to-use test utilities
- Component testing examples
- Hook testing examples
- Mock API and localStorage
- Accessibility tests
- Performance tests

```typescript
import { renderWithProviders, screen } from '@/utils/test-utils'

test('renders correctly', () => {
  renderWithProviders(<MyComponent />)
  expect(screen.getByText('Hello')).toBeInTheDocument()
})
```

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Frontend** | React 19, TypeScript |
| **Routing** | React Router DOM 7 |
| **State** | Zustand, React Context |
| **Forms** | React Hook Form, Zod |
| **Data Fetching** | TanStack Query (React Query) |
| **Styling** | Tailwind CSS v4 |
| **Build Tool** | Vite 6 |
| **Testing** | Vitest, Testing Library |
| **Animations** | Framer Motion 12 |
| **Icons** | Lucide React |
| **SEO** | React Helmet Async |

---

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/mk-knight23/45-starter-react-vercel.git
cd 45-starter-react-vercel

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm run test
npm run test:ui
npm run test:coverage
```

---

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Toast.tsx       # Toast notification system
│   ├── Modal.tsx       # Modal/dialog library
│   ├── InfiniteScroll.tsx
│   ├── VirtualList.tsx
│   ├── OptimizedImage.tsx
│   └── SEO.tsx         # Meta tags and structured data
├── services/           # Business logic and utilities
│   ├── apiClient.ts    # React Query integration
│   ├── formValidation.ts  # Form validation with Zod
│   └── i18n.tsx        # Internationalization
├── utils/
│   ├── cn.ts          # Class name utility
│   └── test-utils.tsx  # Testing utilities
├── pages/             # Page components
├── features/          # Feature-based modules
│   ├── auth/          # Authentication
│   └── dashboard/     # Dashboard
└── App.tsx            # Main app with routing
```

---

## 🎯 Usage Examples

### API Client with Caching

```typescript
import { useApiQuery, ApiClient } from '@/services/apiClient'

// Using React Query hook
function UsersList() {
  const { data, isLoading, error } = useApiQuery<User[]>(['users'], '/users')

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading users</div>

  return (
    <ul>
      {data?.data.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  )
}

// Direct API calls
const users = await ApiClient.get<User[]>('/users')
const newUser = await ApiClient.post<User>('/users', { name: 'John' })
```

### Form Validation

```typescript
import { useCustomForm, formSchemas } from '@/services/formValidation'

function LoginForm() {
  const { form, handleSubmit, renderField } = useCustomForm({
    schema: formSchemas.login,
    defaultValues: { email: '', password: '' },
    onSubmit: async (data) => {
      await login(data)
      toast.success('Logged in successfully!')
    }
  })

  return (
    <form onSubmit={handleSubmit}>
      {renderField({
        name: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'you@example.com'
      })}
      {renderField({
        name: 'password',
        label: 'Password',
        type: 'password'
      })}
      <button type="submit">Login</button>
    </form>
  )
}
```

### Toast Notifications

```typescript
import { toast } from '@/components/Toast'

// Simple toasts
toast.success('Saved successfully!')
toast.error('Failed to save')
toast.warning('Please check your input')
toast.info('New message received')

// Promise-based toasts
await toast.promise(
  apiCall(),
  {
    loading: 'Saving...',
    success: 'Saved!',
    error: 'Failed to save'
  }
)
```

### Modals

```typescript
import { modal } from '@/components/Modal'

// Confirmation dialog
const confirmed = await modal.confirm('Delete this item?')
if (confirmed) {
  await deleteItem()
}

// Alert dialog
await modal.alert('Operation complete!')

// Custom modal
modal.open({
  title: 'Settings',
  content: <SettingsPanel />,
  size: 'lg',
  footer: (
    <>
      <button onClick={() => modal.closeAll()}>Cancel</button>
      <button onClick={saveSettings}>Save</button>
    </>
  )
})
```

### Internationalization

```typescript
import { useI18n, LanguageSwitcher } from '@/services/i18n'

function MyComponent() {
  const { t, locale, setLocale } = useI18n()

  return (
    <div>
      <h1>{t('common.welcome')}</h1>
      <p>{t('errors.minLength', { min: 5 })}</p>
      <LanguageSwitcher />
    </div>
  )
}
```

---

## 🧪 Testing

```bash
# Run tests
npm run test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

---

## 📄 License

MIT License - feel free to use this starter for your projects!

---

*Made with ❤️ by [Kazi Musharraf](https://github.com/mk-knight23)*
