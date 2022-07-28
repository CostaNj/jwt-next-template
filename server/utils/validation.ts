type Validator = {
  fieldName: string
  isValid: boolean
  message: string
}

export const validateBuilder = (
  fieldName: string,
  value: string,
  validate: (str: string) => boolean,
  message: string
): Validator => ({
  fieldName,
  isValid: validate(value),
  message
})

export const getValidationErrors = (fields: Validator[]) => {
  return fields
    .filter((validationResult) => !validationResult.isValid)
    .map((validationResult) => ({
      fieldName: validationResult.fieldName,
      message: validationResult.message
    }))
}
