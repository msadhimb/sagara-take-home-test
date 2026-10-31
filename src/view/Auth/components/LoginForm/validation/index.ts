import * as yup from "yup"

export const loginSchema = yup.object({
  email: yup
    .string()
    .trim()
    .required("Email is required")
    .email("Enter a valid email address"),
  password: yup.string().required("Password is required"),
  remember: yup.boolean().default(true),
})

export type LoginFormValues = yup.InferType<typeof loginSchema>
