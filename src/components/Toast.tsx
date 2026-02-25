/**
 * Toast Notification System
 * Beautiful, non-intrusive notifications
 */

import { create } from 'zustand'
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface Toast {
  id: string
  type: ToastType
  message: string
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

interface ToastStore {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, 'id'>) => void
  removeToast: (id: string) => void
  clearToasts: () => void
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (toast) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newToast = { ...toast, id }

    set((state) => ({
      toasts: [...state.toasts, newToast]
    }))

    // Auto-remove after duration
    if (toast.duration !== 0) {
      setTimeout(() => {
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== id)
        }))
      }, toast.duration || 5000)
    }
  },
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id)
    })),
  clearToasts: () => set({ toasts: [] })
}))

// Toast icons
const toastIcons = {
  success: <CheckCircle className="w-5 h-5 text-green-500" />,
  error: <XCircle className="w-5 h-5 text-red-500" />,
  warning: <AlertCircle className="w-5 h-5 text-yellow-500" />,
  info: <Info className="w-5 h-5 text-blue-500" />
}

// Toast styles
const toastStyles = {
  success: 'border-green-500 bg-green-50 dark:bg-green-900/20',
  error: 'border-red-500 bg-red-50 dark:bg-red-900/20',
  warning: 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20',
  info: 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
}

/**
 * Toast Component
 */
export function ToastContainer() {
  const { toasts, removeToast } = useToastStore()

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center gap-3 px-4 py-3 border-l-4 rounded-lg shadow-lg min-w-[300px] max-w-md animate-slide-in ${toastStyles[toast.type]}`}
        >
          {toastIcons[toast.type]}
          <div className="flex-1">
            <p className="text-sm font-medium">{toast.message}</p>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="p-1 hover:bg-black/10 rounded transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  )
}

/**
 * Toast helper functions
 */
export const toast = {
  success: (message: string, duration?: number) => {
    useToastStore.getState().addToast({ type: 'success', message, duration })
  },
  error: (message: string, duration?: number) => {
    useToastStore.getState().addToast({ type: 'error', message, duration })
  },
  warning: (message: string, duration?: number) => {
    useToastStore.getState().addToast({ type: 'warning', message, duration })
  },
  info: (message: string, duration?: number) => {
    useToastStore.getState().addToast({ type: 'info', message, duration })
  },
  promise: async <T,>(
    promise: Promise<T>,
    messages: {
      loading?: string
      success: string
      error: string
    }
  ): Promise<T> => {
    const id = Math.random().toString(36).substr(2, 9)

    if (messages.loading) {
      useToastStore.getState().addToast({
        type: 'info',
        message: messages.loading,
        duration: 0
      })
    }

    try {
      const result = await promise
      useToastStore.getState().removeToast(id)
      useToastStore.getState().addToast({
        type: 'success',
        message: messages.success
      })
      return result
    } catch (error) {
      useToastStore.getState().removeToast(id)
      useToastStore.getState().addToast({
        type: 'error',
        message: messages.error
      })
      throw error
    }
  }
}

export default ToastContainer
