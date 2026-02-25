/**
 * Form Validation with React Hook Form + Zod
 * Type-safe form validation with minimal boilerplate
 */

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// Common validation schemas
export const commonSchemas = {
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  url: z.string().url('Invalid URL'),
  phone: z.string().regex(/^[+]?[\d\s-()]+$/, 'Invalid phone number'),

  // Password confirmation
  passwordConfirm: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .refine((data) => {
      // Will be validated against password field
      return true
    }, 'Passwords do not match')
}

// Form field types
export interface FormField {
  name: string
  label: string
  type: 'text' | 'email' | 'password' | 'number' | 'textarea' | 'select' | 'checkbox' | 'radio'
  placeholder?: string
  required?: boolean
  options?: { value: string; label: string }[]
  validation?: any
}

// Form configuration type
export interface FormConfig {
  fields: FormField[]
  onSubmit: (data: any) => void | Promise<void>
  defaultValues?: Record<string, any>
  schema?: z.ZodSchema
}

/**
 * Custom form hook
 */
export function useCustomForm(config: FormConfig) {
  const { fields, onSubmit, defaultValues = {}, schema } = config

  const form = useForm({
    resolver: schema ? zodResolver(schema) : undefined,
    defaultValues
  })

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      await onSubmit(data)
    } catch (error) {
      console.error('Form submission error:', error)
    }
  })

  const renderField = (field: FormField) => {
    const { name, label, type, placeholder, required, options } = field

    switch (type) {
      case 'textarea':
        return (
          <div key={name} className="space-y-1">
            <label htmlFor={name} className="block text-sm font-medium">
              {label} {required && <span className="text-red-500">*</span>}
            </label>
            <textarea
              id={name}
              placeholder={placeholder}
              {...form.register(name)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
            />
            {form.formState.errors[name] && (
              <p className="text-sm text-red-500">
                {form.formState.errors[name]?.message as string}
              </p>
            )}
          </div>
        )

      case 'select':
        return (
          <div key={name} className="space-y-1">
            <label htmlFor={name} className="block text-sm font-medium">
              {label} {required && <span className="text-red-500">*</span>}
            </label>
            <select
              id={name}
              {...form.register(name)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
            >
              {options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {form.formState.errors[name] && (
              <p className="text-sm text-red-500">
                {form.formState.errors[name]?.message as string}
              </p>
            )}
          </div>
        )

      case 'checkbox':
        return (
          <div key={name} className="flex items-center space-x-2">
            <input
              id={name}
              type="checkbox"
              {...form.register(name)}
              className="w-4 h-4 border rounded focus:ring-2 focus:ring-black"
            />
            <label htmlFor={name} className="text-sm font-medium">
              {label} {required && <span className="text-red-500">*</span>}
            </label>
            {form.formState.errors[name] && (
              <p className="text-sm text-red-500">
                {form.formState.errors[name]?.message as string}
              </p>
            )}
          </div>
        )

      default:
        return (
          <div key={name} className="space-y-1">
            <label htmlFor={name} className="block text-sm font-medium">
              {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input
              id={name}
              type={type}
              placeholder={placeholder}
              {...form.register(name)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
            />
            {form.formState.errors[name] && (
              <p className="text-sm text-red-500">
                {form.formState.errors[name]?.message as string}
              </p>
            )}
          </div>
        )
    }
  }

  return {
    form,
    handleSubmit,
    renderField,
    isSubmitting: form.formState.isSubmitting,
    errors: form.formState.errors
  }
}

// Pre-built form schemas
export const formSchemas = {
  login: z.object({
    email: commonSchemas.email,
    password: commonSchemas.password
  }),

  register: z.object({
    name: commonSchemas.name,
    email: commonSchemas.email,
    password: commonSchemas.password,
    confirmPassword: commonSchemas.passwordConfirm
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
  }),

  contact: z.object({
    name: commonSchemas.name,
    email: commonSchemas.email,
    subject: z.string().min(5, 'Subject must be at least 5 characters'),
    message: z.string().min(10, 'Message must be at least 10 characters')
  }),

  newsletter: z.object({
    email: commonSchemas.email
  })
}

export default useCustomForm
