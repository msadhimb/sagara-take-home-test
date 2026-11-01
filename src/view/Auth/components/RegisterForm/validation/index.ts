import * as yup from "yup"
import { isPasswordValid } from "../../../helper/password"

export const registerSchema = yup.object({
  name: yup.string().trim().required("Name is required"),
  email: yup
    .string()
    .trim()
    .required("Email is required")
    .email("Enter a valid email address"),
  phone_number: yup.string().trim().required("Phone Number is required"),
  password: yup
    .string()
    .required("Password is required")
    .test(
      "password-strength",
      "Password does not meet all requirements",
      (value) => isPasswordValid(value ?? "")
    ),
})

export type RegisterFormValues = yup.InferType<typeof registerSchema>
