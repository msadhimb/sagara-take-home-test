import * as yup from "yup"
import { passwordResetRules } from "../../RegisterForm/validation/password"

export const forgotSchema = yup.object({
  email: yup.string().when("step", {
    is: "initial",
    then: (schema) =>
      schema
        .trim()
        .required("Email is required")
        .email("Enter a valid email address"),
  }),
  otp: yup.string().when("step", {
    is: "otp",
    then: (schema) =>
      schema
        .required("Verification code is required")
        .matches(/^\d+$/, "Code must contain only numbers")
        .length(6, "Code must be 6 digits"),
    otherwise: (schema) => schema.optional(),
  }),
  password: yup.string().when("step", {
    is: "reset",
    then: (schema) =>
      passwordResetRules.reduce(
        (acc, rule) =>
          acc.test(rule.id, rule.label, function (value) {
            return rule.test(value ?? "", this.parent)
          }),
        schema
      ),
    otherwise: (schema) => schema.optional(),
  }),
  confirm_password: yup.string().when("step", {
    is: "reset",
    then: (schema) =>
      schema
        .required("Confirm Password is required")
        .oneOf([yup.ref("password")], "Passwords do not match"),
    otherwise: (schema) => schema.optional(),
  }),
})

export type ForgotFormValues = yup.InferType<typeof forgotSchema>
