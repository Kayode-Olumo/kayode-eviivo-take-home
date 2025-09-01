"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "@/hooks/use-form"
import { componentStyles } from "@/lib/design-system"
import { cn } from "@/lib/utils"

interface AuthorFormData {
  firstName: string
  lastName: string
  birthYear: string
}

const initialData: AuthorFormData = {
  firstName: "",
  lastName: "",
  birthYear: "",
}

const validateAuthorForm = (data: AuthorFormData): Record<string, string> => {
  const errors: Record<string, string> = {}

  if (!data.firstName.trim()) {
    errors.firstName = "First name is required"
  } else if (data.firstName.trim().length < 2) {
    errors.firstName = "First name must be at least 2 characters"
  }

  if (!data.lastName.trim()) {
    errors.lastName = "Last name is required"
  } else if (data.lastName.trim().length < 2) {
    errors.lastName = "Last name must be at least 2 characters"
  }

  if (!data.birthYear) {
    errors.birthYear = "Birth year is required"
  } else {
    const year = Number.parseInt(data.birthYear)
    const currentYear = new Date().getFullYear()
    if (year < 1800 || year > currentYear) {
      errors.birthYear = `Year must be between 1800 and ${currentYear}`
    }
  }

  return errors
}

export const AuthorForm = React.memo(() => {
  const { formData, errors, handleChange, handleSubmit, isSubmitting } = useForm<AuthorFormData>({
    initialData,
    validate: validateAuthorForm,
    onSubmit: (data) => {
      alert(JSON.stringify(data, null, 2))
    },
  })

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-900 mb-2">Add New Author</h2>
        <p className="text-slate-600 text-sm">Fill in the details to add an author to your collection</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <Label htmlFor="firstName" className="text-sm font-medium text-slate-700 mb-2 block">
              First Name
            </Label>
            <Input
              id="firstName"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter first name"
              className={cn(componentStyles.input.base, errors.firstName && componentStyles.input.error)}
              required
              aria-invalid={!!errors.firstName}
              aria-describedby={errors.firstName ? "firstName-error" : undefined}
            />
            {errors.firstName && (
              <p id="firstName-error" className="mt-2 text-sm text-red-600" role="alert">
                {errors.firstName}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="lastName" className="text-sm font-medium text-slate-700 mb-2 block">
              Last Name
            </Label>
            <Input
              id="lastName"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter last name"
              className={cn(componentStyles.input.base, errors.lastName && componentStyles.input.error)}
              required
              aria-invalid={!!errors.lastName}
              aria-describedby={errors.lastName ? "lastName-error" : undefined}
            />
            {errors.lastName && (
              <p id="lastName-error" className="mt-2 text-sm text-red-600" role="alert">
                {errors.lastName}
              </p>
            )}
          </div>

          <div className="sm:col-span-2">
            <Label htmlFor="birthYear" className="text-sm font-medium text-slate-700 mb-2 block">
              Birth Year
            </Label>
            <Input
              id="birthYear"
              name="birthYear"
              type="number"
              min="1800"
              max={new Date().getFullYear()}
              value={formData.birthYear}
              onChange={handleChange}
              placeholder="e.g., 1975"
              className={cn(componentStyles.input.base, errors.birthYear && componentStyles.input.error)}
              required
              aria-invalid={!!errors.birthYear}
              aria-describedby={errors.birthYear ? "birthYear-error" : undefined}
            />
            {errors.birthYear && (
              <p id="birthYear-error" className="mt-2 text-sm text-red-600" role="alert">
                {errors.birthYear}
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
              Adding Author...
            </>
          ) : (
            "Add Author"
          )}
        </Button>
      </form>
    </div>
  )
})

AuthorForm.displayName = "AuthorForm"
