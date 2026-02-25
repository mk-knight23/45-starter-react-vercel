/**
 * Modal/Dialog Component Library
 * Accessible, customizable modals
 */

import { create } from 'zustand'
import { useEffect } from 'react'
import { X } from 'lucide-react'

export interface Modal {
  id: string
  title: string
  content: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  closeOnOverlay?: boolean
  showClose?: boolean
  footer?: React.ReactNode
}

interface ModalStore {
  modals: Modal[]
  openModal: (modal: Omit<Modal, 'id'>) => string
  closeModal: (id: string) => void
  closeAll: () => void
}

export const useModalStore = create<ModalStore>((set) => ({
  modals: [],
  openModal: (modal) => {
    const id = Math.random().toString(36).substr(2, 9)
    set((state) => ({
      modals: [...state.modals, { ...modal, id }]
    }))
    return id
  },
  closeModal: (id) =>
    set((state) => ({
      modals: state.modals.filter((m) => m.id !== id)
    })),
  closeAll: () => set({ modals: [] })
}))

const sizeClasses = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-full mx-4'
}

/**
 * Modal Component
 */
export function ModalContainer() {
  const { modals, closeModal } = useModalStore()

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && modals.length > 0) {
        closeModal(modals[modals.length - 1].id)
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [modals, closeModal])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (modals.length > 0) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [modals.length])

  return (
    <>
      {modals.map((modal, index) => (
        <div
          key={modal.id}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ zIndex: 50 + index }}
        >
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => modal.closeOnOverlay !== false && closeModal(modal.id)}
          />

          {/* Modal */}
          <div
            className={`relative bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full ${sizeClasses[modal.size || 'md']} animate-scale-in`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold">{modal.title}</h2>
              {modal.showClose !== false && (
                <button
                  onClick={() => closeModal(modal.id)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Content */}
            <div className="p-6 max-h-[70vh] overflow-y-auto">
              {modal.content}
            </div>

            {/* Footer */}
            {modal.footer && (
              <div className="flex items-center justify-end gap-3 p-6 border-t">
                {modal.footer}
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  )
}

/**
 * Modal helper functions
 */
export const modal = {
  open: (props: Omit<Modal, 'id'>) => {
    return useModalStore.getState().openModal(props)
  },
  close: (id: string) => {
    useModalStore.getState().closeModal(id)
  },
  closeAll: () => {
    useModalStore.getState().closeAll()
  },
  confirm: (message: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const id = modal.open({
        title: 'Confirm',
        content: <p>{message}</p>,
        footer: (
          <>
            <button
              onClick={() => {
                modal.close(id)
                resolve(false)
              }}
              className="px-4 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                modal.close(id)
                resolve(true)
              }}
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
            >
              Confirm
            </button>
          </>
        )
      })
    })
  },
  alert: (message: string): Promise<void> => {
    return new Promise((resolve) => {
      const id = modal.open({
        title: 'Alert',
        content: <p>{message}</p>,
        footer: (
          <button
            onClick={() => {
              modal.close(id)
              resolve()
            }}
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
          >
            OK
          </button>
        )
      })
    })
  }
}

export default ModalContainer
