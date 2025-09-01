"use client"

import { useState, useCallback } from "react"

interface ToastState {
  message: string
  isVisible: boolean
}

export const useToast = () => {
  const [toast, setToast] = useState<ToastState | null>(null)

  const showToast = useCallback((message: string) => {
    setToast({ message, isVisible: true })

    setTimeout(() => {
      setToast((prev) => (prev ? { ...prev, isVisible: false } : null))
    }, 2700)

    setTimeout(() => {
      setToast(null)
    }, 3000)
  }, [])

  return { toast, showToast }
}
