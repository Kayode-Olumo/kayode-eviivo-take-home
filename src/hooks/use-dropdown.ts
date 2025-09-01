"use client"

import { useState, useEffect } from "react"

export const useDropdown = () => {
  const [isGenreDropdownOpen, setIsGenreDropdownOpen] = useState(false)
  const [isPublishedYearDropdownOpen, setIsPublishedYearDropdownOpen] = useState(false)
  const [isBirthYearDropdownOpen, setIsBirthYearDropdownOpen] = useState(false)

  const closeAllDropdowns = () => {
    setIsGenreDropdownOpen(false)
    setIsPublishedYearDropdownOpen(false)
    setIsBirthYearDropdownOpen(false)
  }

  const handleGenreDropdownToggle = () => {
    closeAllDropdowns()
    setIsGenreDropdownOpen(true)
  }

  const handlePublishedYearDropdownToggle = () => {
    closeAllDropdowns()
    setIsPublishedYearDropdownOpen(true)
  }

  const handleBirthYearDropdownToggle = () => {
    closeAllDropdowns()
    setIsBirthYearDropdownOpen(true)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      const isClickInsideDropdown = target.closest("[data-dropdown]")

      if (!isClickInsideDropdown) {
        closeAllDropdowns()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return {
    isGenreDropdownOpen,
    isPublishedYearDropdownOpen,
    isBirthYearDropdownOpen,
    setIsGenreDropdownOpen,
    setIsPublishedYearDropdownOpen,
    setIsBirthYearDropdownOpen,
    handleGenreDropdownToggle,
    handlePublishedYearDropdownToggle,
    handleBirthYearDropdownToggle,
  }
}
