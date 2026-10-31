export const passwordRules = [
  {
    id: "length",
    label: "At least 8 characters",
    test: (value: string) => value.length >= 8,
  },
  {
    id: "uppercase",
    label: "At least one uppercase letter",
    test: (value: string) => /[A-Z]/.test(value),
  },
  {
    id: "number",
    label: "At least one number",
    test: (value: string) => /\d/.test(value),
  },
] as const

export const isPasswordValid = (value: string) =>
  passwordRules.every((rule) => rule.test(value))
