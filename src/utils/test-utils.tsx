/**
 * Unit Testing Setup with Vitest
 * Ready-to-use test utilities and examples
 */

import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

/**
 * Test Utilities
 */

// Custom render function with providers
export function renderWithProviders(
  ui: React.ReactElement,
  options = {}
) {
  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return <>{children}</>
  }

  return render(ui, { wrapper: Wrapper, ...options })
}

// Mock localStorage
export const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn()
}

// Mock IntersectionObserver
export const mockIntersectionObserver = vi.fn()

mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null
})

window.IntersectionObserver = mockIntersectionObserver as any

/**
 * Test Examples
 */

// Example: Component Test
describe('Example Component', () => {
  it('renders correctly', () => {
    renderWithProviders(<div>Hello World</div>)
    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })
})

// Example: Async Test
describe('Async Operations', () => {
  it('handles loading state', async () => {
    const TestComponent = () => {
      const [data, setData] = React.useState<string>('loading')
      React.useEffect(() => {
        setTimeout(() => setData('loaded'), 100)
      }, [])
      return <div>{data}</div>
    }

    renderWithProviders(<TestComponent />)
    expect(screen.getByText('loading')).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText('loaded')).toBeInTheDocument()
    })
  })
})

// Example: User Interaction Test
describe('User Interactions', () => {
  it('handles button click', async () => {
    const handleClick = vi.fn()
    renderWithProviders(<button onClick={handleClick}>Click me</button>)

    const button = screen.getByRole('button', { name: /click me/i })
    await userEvent.click(button)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})

// Example: Form Test
describe('Form Validation', () => {
  it('validates email input', async () => {
    const TestForm = () => {
      const [email, setEmail] = React.useState('')
      const [error, setError] = React.useState('')

      const validate = () => {
        if (!email.includes('@')) {
          setError('Invalid email')
        }
      }

      return (
        <form>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            data-testid="email-input"
          />
          {error && <span data-testid="error-message">{error}</span>}
          <button type="button" onClick={validate}>Submit</button>
        </form>
      )
    }

    renderWithProviders(<TestForm />)

    const input = screen.getByTestId('email-input')
    const button = screen.getByRole('button')

    await userEvent.type(input, 'invalid-email')
    await userEvent.click(button)

    expect(screen.getByTestId('error-message')).toHaveTextContent('Invalid email')
  })
})

// Example: API Test
describe('API Calls', () => {
  it('fetches data successfully', async () => {
    const mockData = { id: 1, name: 'Test' }
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData)
      } as Response)
    )

    // Your component that fetches data
    const TestComponent = () => {
      const [data, setData] = React.useState<any>(null)
      React.useEffect(() => {
        fetch('/api/test').then(res => res.json()).then(setData)
      }, [])

      return data ? <div>{data.name}</div> : <div>Loading...</div>
    }

    renderWithProviders(<TestComponent />)

    await waitFor(() => {
      expect(screen.getByText('Test')).toBeInTheDocument()
    })

    expect(fetch).toHaveBeenCalledWith('/api/test')
  })
})

// Example: Hook Test
describe('Custom Hook', () => {
  it('manages state correctly', () => {
    const { renderHook, result } = require('@testing-library/react')

    const { result: hookResult } = renderHook(() => useCustomHook())

    expect(hookResult.current.value).toBe('initial')

    act(() => {
      hookResult.current.update('new value')
    })

    expect(hookResult.current.value).toBe('new value')
  })
})

// Example: Snapshot Test
describe('Snapshot Tests', () => {
  it('matches snapshot', () => {
    const { container } = renderWithProviders(<div>Snapshot Test</div>)
    expect(container).toMatchSnapshot()
  })
})

/**
 * Test Helpers
 */

// Wait for element to appear
export async function waitForElement(
  getByText: (text: string) => HTMLElement,
  text: string
) {
  return waitFor(() => {
    expect(getByText(text)).toBeInTheDocument()
  })
}

// Mock API response
export function mockApiResponse(data: any, delay = 0) {
  return vi.fn(() =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          ok: true,
          json: () => Promise.resolve(data)
        })
      }, delay)
    })
  )
}

// Mock router
export const mockNavigate = vi.fn()
export const mockParams = { id: '123' }

vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useParams: () => mockParams
}))

/**
 * Performance Testing
 */
describe('Performance', () => {
  it('renders quickly', () => {
    const start = performance.now()

    renderWithProviders(<div>Performance Test</div>)

    const end = performance.now()
    expect(end - start).toBeLessThan(100) // Should render in less than 100ms
  })
})

/**
 * Accessibility Tests
 */
describe('Accessibility', () => {
  it('has proper ARIA labels', () => {
    renderWithProviders(
      <button aria-label="Close dialog">×</button>
    )

    expect(screen.getByLabelText('Close dialog')).toBeInTheDocument()
  })

  it('is keyboard accessible', async () => {
    const handleClick = vi.fn()
    renderWithProviders(
      <button onClick={handleClick}>Accessible Button</button>
    )

    const button = screen.getByRole('button')
    button.focus()
    await userEvent.keyboard('{Enter}')

    expect(handleClick).toHaveBeenCalled()
  })
})

export default {
  renderWithProviders,
  mockLocalStorage,
  mockIntersectionObserver,
  waitForElement,
  mockApiResponse
}
