export type ValidationError = {
  message: string
  fieldName: string
}

export type Error = {
  message: string
  validationErrors?: ValidationError[]
}
