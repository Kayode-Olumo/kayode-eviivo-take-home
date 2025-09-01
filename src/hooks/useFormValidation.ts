interface BookForm {
    title: string
    genre: string[]
    publishedYear: string
  }
  
  export const useFormValidation = () => {
    const validateBookForm = (form: BookForm) => {
      const errors: Record<string, string> = {}
  
      if (!form.title.trim()) {
        errors.title = "Book title is required"
      }
  
      if (!form.genre || form.genre.length === 0) {
        errors.genre = "At least one genre is required"
      }
  
      if (!form.publishedYear) {
        errors.publishedYear = "Published year is required"
      } else {
        const year = Number.parseInt(form.publishedYear)
        const currentYear = new Date().getFullYear()
        if (year < 1800 || year > currentYear) {
          errors.publishedYear = `Published year must be between 1800 and ${currentYear}`
        }
      }
  
      return errors
    }
  
    return { validateBookForm }
  }
  