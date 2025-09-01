"use client"

import type React from "react"
import { useState } from "react"
import { useFormValidation } from "./hooks/use-form-validation"
import { useToast } from "./hooks/use-toast"
import { useDropdown } from "./hooks/use-dropdown"
import { Toast } from "./components/Toast"
import { MultiSelectDropdown } from "./components/MultiSelectDropdown"
import { YearDropdown } from "./components/YearDropdown"
import "./App.css"

interface BookForm {
  title: string
  genre: string[]
  publishedYear: string
}

interface AuthorForm {
  firstName: string
  lastName: string
  birthYear: string
}

const GENRES = [
  "Fiction",
  "Non-Fiction",
  "Mystery",
  "Romance",
  "Science Fiction",
  "Fantasy",
  "Biography",
  "History",
  "Self-Help",
  "Poetry",
  "Drama",
  "Comedy",
  "Thriller",
  "Horror",
  "Adventure",
]

function App() {
  const [activeTab, setActiveTab] = useState<"books" | "authors">("books")
  const { toast, showToast } = useToast()
  const { closeAllDropdowns } = useDropdown()

  // Book form state
  const [bookForm, setBookForm] = useState<BookForm>({
    title: "",
    genre: [],
    publishedYear: "",
  })

  // Author form state
  const [authorForm, setAuthorForm] = useState<AuthorForm>({
    firstName: "",
    lastName: "",
    birthYear: "",
  })

  const [bookErrors, setBookErrors] = useState<Record<string, string>>({})
  const [authorErrors, setAuthorErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { validateBookForm } = useFormValidation()

  const validateAuthorForm = (form: AuthorForm) => {
    const errors: Record<string, string> = {}

    if (!form.firstName.trim()) {
      errors.firstName = "First name is required"
    }

    if (!form.lastName.trim()) {
      errors.lastName = "Last name is required"
    }

    if (!form.birthYear) {
      errors.birthYear = "Birth year is required"
    } else {
      const year = Number.parseInt(form.birthYear)
      const currentYear = new Date().getFullYear()
      if (year < 1900 || year > currentYear) {
        errors.birthYear = `Birth year must be between 1900 and ${currentYear}`
      }
    }

    return errors
  }

  const handleBookSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const errors = validateBookForm(bookForm)
    setBookErrors(errors)

    if (Object.keys(errors).length === 0) {
      // Show JSON alert
      alert(JSON.stringify(bookForm, null, 2))

      // Show toast notification
      showToast("Book submitted successfully!")

      // Reset form
      setBookForm({ title: "", genre: [], publishedYear: "" })
    }

    setIsSubmitting(false)
  }

  const handleAuthorSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const errors = validateAuthorForm(authorForm)
    setAuthorErrors(errors)

    if (Object.keys(errors).length === 0) {
      // Show JSON alert
      alert(JSON.stringify(authorForm, null, 2))

      // Show toast notification
      showToast("Author submitted successfully!")

      // Reset form
      setAuthorForm({ firstName: "", lastName: "", birthYear: "" })
    }

    setIsSubmitting(false)
  }

  const clearBookError = (field: string, value: string) => {
    if (bookErrors[field]) {
      const errors = validateBookForm({ ...bookForm, [field]: value })
      if (!errors[field]) {
        setBookErrors((prev) => ({ ...prev, [field]: "" }))
      }
    }
  }

  const clearAuthorError = (field: string, value: string) => {
    if (authorErrors[field]) {
      const errors = validateAuthorForm({ ...authorForm, [field]: value })
      if (!errors[field]) {
        setAuthorErrors((prev) => ({ ...prev, [field]: "" }))
      }
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left Section - Gradient */}
        <div className="lg:w-1/2 p-8 flex items-center justify-center">
          <div
            className="w-full max-w-md h-96 lg:h-[500px] rounded-3xl p-8 flex flex-col justify-end relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #FFC8E1 0%, #A0E4D0 50%, #AFC9DC 100%)",
            }}
          >
            <div className="relative z-10">
              <h1 className="text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
                Organise Your <span className="font-medium">Library</span>
              </h1>
              <p className="text-white/90 text-lg leading-relaxed">
                Build your personal collection. Track the books that inspire you and the authors who shape your world.
              </p>
            </div>
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="lg:w-1/2 p-8 flex flex-col justify-center">
          <div className="w-full max-w-md mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h2 className="text-3xl lg:text-4xl font-black text-black mb-2">
                Add Your <span className="font-medium">/ {activeTab === "books" ? "Books" : "Authors"}</span>
              </h2>
            </div>

            {/* Tabs */}
            <div className="flex mb-8 gap-2">
              <button
                onClick={() => {
                  setActiveTab("books")
                  closeAllDropdowns()
                }}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                  activeTab === "books" ? "text-black" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                style={{
                  backgroundColor: activeTab === "books" ? "#A0E4D0" : undefined,
                }}
              >
                Books
              </button>
              <button
                onClick={() => {
                  setActiveTab("authors")
                  closeAllDropdowns()
                }}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                  activeTab === "authors" ? "text-black" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                style={{
                  backgroundColor: activeTab === "authors" ? "#D9C5E6" : undefined,
                }}
              >
                Authors
              </button>
            </div>

            {/* Forms */}
            {activeTab === "books" ? (
              <form onSubmit={handleBookSubmit} className="space-y-6">
                {/* Book Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Book Title*</label>
                  <input
                    type="text"
                    value={bookForm.title}
                    onChange={(e) => {
                      setBookForm((prev) => ({ ...prev, title: e.target.value }))
                      clearBookError("title", e.target.value)
                    }}
                    className={`w-full px-4 py-3 rounded-2xl transition-all duration-200 ${
                      bookErrors.title
                        ? "border-2 border-red-500 bg-red-50 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        : "border border-gray-200 bg-gray-50 focus:ring-2 focus:border-transparent"
                    }`}
                    style={{
                      focusRingColor: !bookErrors.title ? "#A0E4D0" : undefined,
                    }}
                    placeholder="Enter book title"
                  />
                  {bookErrors.title && <p className="mt-1 text-sm text-red-600">{bookErrors.title}</p>}
                </div>

                {/* Genre */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Genre*</label>
                  <MultiSelectDropdown
                    options={GENRES}
                    selectedValues={bookForm.genre}
                    onChange={(genres) => {
                      setBookForm((prev) => ({ ...prev, genre: genres }))
                      clearBookError("genre", genres.join(","))
                    }}
                    placeholder="Select genres"
                    error={bookErrors.genre}
                    accentColor="#A0E4D0"
                  />
                  {bookErrors.genre && <p className="mt-1 text-sm text-red-600">{bookErrors.genre}</p>}
                </div>

                {/* Published Year */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Published Year*</label>
                  <YearDropdown
                    value={bookForm.publishedYear}
                    onChange={(year) => {
                      setBookForm((prev) => ({ ...prev, publishedYear: year }))
                      clearBookError("publishedYear", year)
                    }}
                    placeholder="Select year"
                    startYear={1800}
                    endYear={new Date().getFullYear()}
                    error={bookErrors.publishedYear}
                    accentColor="#A0E4D0"
                  />
                  {bookErrors.publishedYear && <p className="mt-1 text-sm text-red-600">{bookErrors.publishedYear}</p>}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-black text-white py-3 px-6 rounded-2xl font-medium hover:bg-gray-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </form>
            ) : (
              <form onSubmit={handleAuthorSubmit} className="space-y-6">
                {/* First Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name*</label>
                  <input
                    type="text"
                    value={authorForm.firstName}
                    onChange={(e) => {
                      setAuthorForm((prev) => ({ ...prev, firstName: e.target.value }))
                      clearAuthorError("firstName", e.target.value)
                    }}
                    className={`w-full px-4 py-3 rounded-2xl transition-all duration-200 ${
                      authorErrors.firstName
                        ? "border-2 border-red-500 bg-red-50 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        : "border border-gray-200 bg-gray-50 focus:ring-2 focus:border-transparent"
                    }`}
                    style={{
                      focusRingColor: !authorErrors.firstName ? "#D9C5E6" : undefined,
                    }}
                    placeholder="Enter first name"
                  />
                  {authorErrors.firstName && <p className="mt-1 text-sm text-red-600">{authorErrors.firstName}</p>}
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name*</label>
                  <input
                    type="text"
                    value={authorForm.lastName}
                    onChange={(e) => {
                      setAuthorForm((prev) => ({ ...prev, lastName: e.target.value }))
                      clearAuthorError("lastName", e.target.value)
                    }}
                    className={`w-full px-4 py-3 rounded-2xl transition-all duration-200 ${
                      authorErrors.lastName
                        ? "border-2 border-red-500 bg-red-50 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        : "border border-gray-200 bg-gray-50 focus:ring-2 focus:border-transparent"
                    }`}
                    style={{
                      focusRingColor: !authorErrors.lastName ? "#D9C5E6" : undefined,
                    }}
                    placeholder="Enter last name"
                  />
                  {authorErrors.lastName && <p className="mt-1 text-sm text-red-600">{authorErrors.lastName}</p>}
                </div>

                {/* Birth Year */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Birth Year*</label>
                  <YearDropdown
                    value={authorForm.birthYear}
                    onChange={(year) => {
                      setAuthorForm((prev) => ({ ...prev, birthYear: year }))
                      clearAuthorError("birthYear", year)
                    }}
                    placeholder="Select year"
                    startYear={1900}
                    endYear={new Date().getFullYear()}
                    error={authorErrors.birthYear}
                    accentColor="#D9C5E6"
                  />
                  {authorErrors.birthYear && <p className="mt-1 text-sm text-red-600">{authorErrors.birthYear}</p>}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-black text-white py-3 px-6 rounded-2xl font-medium hover:bg-gray-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {toast && <Toast {...toast} />}
    </div>
  )
}

export default App
