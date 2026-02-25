/**
 * API Client with React Query Integration
 * Provides caching, retry logic, and request deduplication
 */

import { useQuery, useMutation, useQueryClient, type UseQueryOptions } from '@tanstack/react-query'

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'
const DEFAULT_TIMEOUT = 10000

// Request/Response Types
export interface ApiResponse<T> {
  data: T
  message?: string
  error?: string
}

export interface ApiError {
  message: string
  code?: string
  status?: number
}

// Request Options
interface RequestOptions extends RequestInit {
  timeout?: number
  retries?: number
  cache?: RequestCache
}

/**
 * Enhanced fetch with timeout and retry logic
 */
async function fetchWithTimeout<T>(
  url: string,
  options: RequestOptions = {}
): Promise<ApiResponse<T>> {
  const { timeout = DEFAULT_TIMEOUT, retries = 3, ...fetchOptions } = options

  let lastError: Error | null = null

  for (let attempt = 0; attempt <= retries!; attempt++) {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), timeout)

      const response = await fetch(`${API_BASE_URL}${url}`, {
        ...fetchOptions,
        signal: controller.signal
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      lastError = error as Error

      // Don't retry on 4xx errors
      if (lastError.message.includes('HTTP 4')) {
        throw lastError
      }

      // Wait before retry (exponential backoff)
      if (attempt < retries!) {
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000))
      }
    }
  }

  throw lastError
}

/**
 * API Client Class
 */
export class ApiClient {
  /**
   * GET request
   */
  static async get<T>(url: string, options?: RequestOptions): Promise<ApiResponse<T>> {
    return fetchWithTimeout<T>(url, { ...options, method: 'GET' })
  }

  /**
   * POST request
   */
  static async post<T>(url: string, data?: any, options?: RequestOptions): Promise<ApiResponse<T>> {
    return fetchWithTimeout<T>(url, {
      ...options,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers
      },
      body: JSON.stringify(data)
    })
  }

  /**
   * PUT request
   */
  static async put<T>(url: string, data?: any, options?: RequestOptions): Promise<ApiResponse<T>> {
    return fetchWithTimeout<T>(url, {
      ...options,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers
      },
      body: JSON.stringify(data)
    })
  }

  /**
   * PATCH request
   */
  static async patch<T>(url: string, data?: any, options?: RequestOptions): Promise<ApiResponse<T>> {
    return fetchWithTimeout<T>(url, {
      ...options,
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers
      },
      body: JSON.stringify(data)
    })
  }

  /**
   * DELETE request
   */
  static async delete<T>(url: string, options?: RequestOptions): Promise<ApiResponse<T>> {
    return fetchWithTimeout<T>(url, { ...options, method: 'DELETE' })
  }
}

/**
 * React Query Hooks
 */

// Custom hook for GET requests
export function useApiQuery<T>(
  key: string[],
  url: string,
  options?: Omit<UseQueryOptions<ApiResponse<T>>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: key,
    queryFn: () => ApiClient.get<T>(url),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
    ...options
  })
}

// Custom hook for mutations
export function useApiMutation<T, TData = any>(
  url: string,
  method: 'POST' | 'PUT' | 'PATCH' | 'DELETE' = 'POST'
) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data?: TData) => {
      const methods = {
        POST: () => ApiClient.post<T>(url, data),
        PUT: () => ApiClient.put<T>(url, data),
        PATCH: () => ApiClient.patch<T>(url, data),
        DELETE: () => ApiClient.delete<T>(url)
      }
      return methods[method]()
    },
    onSuccess: () => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: [url.split('/')[0]] })
    }
  })
}

/**
 * Cache Management
 */
export const cacheManager = {
  clear: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('api_cache')
    }
  },

  get: (key: string) => {
    if (typeof window === 'undefined') return null
    const cached = localStorage.getItem(`api_cache_${key}`)
    return cached ? JSON.parse(cached) : null
  },

  set: (key: string, data: any, ttl: number = 300000) => {
    if (typeof window === 'undefined') return
    localStorage.setItem(
      `api_cache_${key}`,
      JSON.stringify({ data, expires: Date.now() + ttl })
    )
  }
}

export default ApiClient
