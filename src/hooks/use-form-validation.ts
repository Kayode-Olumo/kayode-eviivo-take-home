export const useFormValidation = () => {
    const validateBookForm = (bookForm: { title: string; genre: string[]; publishedYear: string }) => {
      const errors: Record<string, string> = {}
  
      if (!bookForm.title.trim()) {
        errors.title = "Book title is required"
      }
  
      if (bookForm.genre.length === 0) {
        errors.genre = "At least one genre is required"
      }
  
      if (!bookForm.publishedYear) {
        errors.publishedYear = "Published year is required"
      } else {
        const year = Number.parseInt(bookForm.publishedYear)
        if (isNaN(year) || year < 1000 || year > 2024) {
          errors.publishedYear = "Please enter a valid year between 1000 and 2024"
        }
      }
  
      return errors
    }
  
    const validateAuthorForm = (authorForm: { firstName: string; lastName: string; birthYear: string }) => {
      const errors: Record<string, string> = {}
  
      if (!authorForm.firstName.trim()) {
        errors.firstName = "First name is required"
      }
  
      if (!authorForm.lastName.trim()) {
        errors.lastName = "Last name is required"
      }
  
      if (!authorForm.birthYear) {
        errors.birthYear = "Birth year is required"
      } else {
        const year = Number.parseInt(authorForm.birthYear)
        if (isNaN(year) || year < 1800 || year > 2024) {
          errors.birthYear = "Please enter a valid year between 1800 and 2024"
        }
      }
  
      return errors
    }
  
    return { validateBookForm, validateAuthorForm }
  }
  