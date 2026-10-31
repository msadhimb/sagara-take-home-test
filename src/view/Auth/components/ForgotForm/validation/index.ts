import * as yup from "yup"

export const forgotSchema = yup.object({
  email: yup
    .string()
    .trim()
    .required("Email is required")
    .email("Enter a valid email address"),
})

export type ForgotFormValues = yup.InferType<typeof forgotSchema>
