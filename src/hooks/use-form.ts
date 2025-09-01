"use client"

import type React from "react"
import { useState, useCallback } from "react"

interface UseFormOptions<T> {
  initialData: T
  onSubmit: (data: T) => void | Promise<void>
  validate?: (data: T) => Record<string, string>
}

interface UseFormReturn<T> {
  formData: T
  errors: Record<string, string>
  isSubmitting: boolean
  handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
  handleSubmit: (event: React.FormEvent) => Promise<void>
  resetForm: () => void
  clearErrors: () => void
}

export function useForm<T extends Record<string, any>>({
  initialData,
  onSubmit,
  validate,
}: UseFormOptions<T>): UseFormReturn<T> {
  const [formData, setFormData] = useState<T>(initialData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = event.target
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))

      if (errors[name]) {
        setErrors((prev) => {
          const newErrors = { ...prev }
          delete newErrors[name]
          return newErrors
        })
      }
    },
    [errors],
  )

  const handleSubmit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault()

      setErrors({})

      if (validate) {
        const validationErrors = validate(formData)
        if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors)
          return
        }
      }

      setIsSubmitting(true)

      try {
        await onSubmit(formData)
        // Reset form after successful submission
        setFormData(initialData)
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred"
        setErrors({ submit: errorMessage })
        console.error("Form submission error:", error)
      } finally {
        setIsSubmitting(false)
      }
    },
    [formData, onSubmit, initialData, validate],
  )

  const resetForm = useCallback(() => {
    setFormData(initialData)
    setErrors({})
  }, [initialData])

  const clearErrors = useCallback(() => {
    setErrors({})
  }, [])

  return {
    formData,
    errors,
    handleChange,
    handleSubmit,
    resetForm,
    clearErrors,
    isSubmitting,
  }
}
