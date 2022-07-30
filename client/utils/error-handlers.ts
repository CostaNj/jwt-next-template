import { AxiosError } from 'axios'

import { Error, ValidationError } from '../../dtos/error'

type Field = {
  fieldName: string
  setError: (message: string) => void
}

export const validationErrorHandler = (
  fields: Field[],
  errors: ValidationError[]
) => {
  errors.forEach((error) => {
    const field = fields.find((field) => field.fieldName === error.fieldName)
    if (field && error.message) {
      field.setError(error.message)
    }
  })
}

export const errorHandler = (fields?: Field[]) => (axiosError: AxiosError<Error>) => {
  if (axiosError) {
    const status = axiosError?.response?.status
    const error = axiosError?.response?.data
    if (status === 400 && error) {
      const validationErrors = error?.validationErrors
      if (fields && validationErrors) {
        validationErrorHandler(fields, validationErrors)
      }
    }
  }
}
