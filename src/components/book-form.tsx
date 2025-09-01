"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "@/hooks/use-form"
import { componentStyles } from "@/lib/design-system"
import { cn } from "@/lib/utils"

interface BookFormData {
  title: string
  genre: string
  publishedYear: string
}

const initialData: BookFormData = {
  title: "",
  genre: "",
  publishedYear: "",
}

const validateBookForm = (data: BookFormData): Record<string, string> => {
  const errors: Record<string, string> = {}

  if (!data.title.trim()) {
    errors.title = "Book title is required"
  } else if (data.title.trim().length < 2) {
    errors.title = "Book title must be at least 2 characters"
  }

  if (!data.genre.trim()) {
    errors.genre = "Genre is required"
  }

  if (!data.publishedYear) {
    errors.publishedYear = "Published year is required"
  } else {
    const year = Number.parseInt(data.publishedYear)
    const currentYear = new Date().getFullYear()
    if (year < 1000 || year > currentYear) {
      errors.publishedYear = `Year must be between 1000 and ${currentYear}`
    }
  }

  return errors
}

export const BookForm = React.memo(() => {
  const { formData, errors, handleChange, handleSubmit, isSubmitting } = useForm<BookFormData>({
    initialData,
    validate: validateBookForm,
    onSubmit: (data) => {
      alert(JSON.stringify(data, null, 2))
    },
  })

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-900 mb-2">Add New Book</h2>
        <p className="text-slate-600 text-sm">Fill in the details to add a book to your collection</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Label htmlFor="title" className="text-sm font-medium text-slate-700 mb-2 block">
              Book Title
            </Label>
            <Input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter the book title"
              className={cn(componentStyles.input.base, errors.title && componentStyles.input.error)}
              required
              aria-invalid={!!errors.title}
              aria-describedby={errors.title ? "title-error" : undefined}
            />
            {errors.title && (
              <p id="title-error" className="mt-2 text-sm text-red-600" role="alert">
                {errors.title}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="genre" className="text-sm font-medium text-slate-700 mb-2 block">
              Genre
            </Label>
            <Input
              id="genre"
              name="genre"
              type="text"
              value={formData.genre}
              onChange={handleChange}
              placeholder="e.g., Fiction, Mystery, Romance"
              className={cn(componentStyles.input.base, errors.genre && componentStyles.input.error)}
              required
              aria-invalid={!!errors.genre}
              aria-describedby={errors.genre ? "genre-error" : undefined}
            />
            {errors.genre && (
              <p id="genre-error" className="mt-2 text-sm text-red-600" role="alert">
                {errors.genre}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="publishedYear" className="text-sm font-medium text-slate-700 mb-2 block">
              Published Year
            </Label>
            <Input
              id="publishedYear"
              name="publishedYear"
              type="number"
              min="1000"
              max={new Date().getFullYear()}
              value={formData.publishedYear}
              onChange={handleChange}
              placeholder="e.g., 2023"
              className={cn(componentStyles.input.base, errors.publishedYear && componentStyles.input.error)}
              required
              aria-invalid={!!errors.publishedYear}
              aria-describedby={errors.publishedYear ? "publishedYear-error" : undefined}
            />
            {errors.publishedYear && (
              <p id="publishedYear-error" className="mt-2 text-sm text-red-600" role="alert">
                {errors.publishedYear}
              </p>
            )}
          </div>
        </div>

        {errors.submit && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-700" role="alert">
              {errors.submit}
            </p>
          </div>
        )}

        <Button
          type="submit"
          disabled={isSubmitting}
          className={cn(componentStyles.button.base, componentStyles.button.primary, "w-full py-3")}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Adding Book...
            </>
          ) : (
            "Add Book"
          )}
        </Button>
      </form>
    </div>
  )
})

BookForm.displayName = "BookForm"
