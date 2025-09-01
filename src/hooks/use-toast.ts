"use client"

import { useState } from "react"

export const useToast = () => {
  const [toast, setToast] = useState<{ message: string; visible: boolean; isVisible: boolean }>({
    message: "",
    visible: false,
    isVisible: false,
  })

  const showToast = (message: string) => {
    setToast({ message, visible: true, isVisible: true })
    setTimeout(() => setToast((prev) => ({ ...prev, isVisible: false })), 2700)
    setTimeout(() => setToast({ message: "", visible: false, isVisible: false }), 3000)
  }

  return { toast, showToast }
}
