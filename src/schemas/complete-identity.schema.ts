import { format, isAfter, isValid, parse, startOfToday } from "date-fns"
import { z } from "zod"

const DATE_PATTERN = /^\d{2}\/\d{2}\/\d{4}$/

export const completeIdentitySchema = z.object({
  dateOfBirth: z
    .string()
    .trim()
    .min(1, "Date of birth is required")
    .superRefine((value, ctx) => {
      if (!value) return

      if (!DATE_PATTERN.test(value)) {
        ctx.addIssue({
          code: "custom",
          message: "Use DD/MM/YYYY format",
        })
        return
      }

      const date = parse(value, "dd/MM/yyyy", new Date())

      if (!isValid(date) || format(date, "dd/MM/yyyy") !== value) {
        ctx.addIssue({
          code: "custom",
          message: "Enter a valid date",
        })
        return
      }

      if (isAfter(date, startOfToday())) {
        ctx.addIssue({
          code: "custom",
          message: "Date of birth cannot be in the future",
        })
      }
    }),
  companyName: z
    .string()
    .trim()
    .min(2, "Company name must be at least 2 characters")
    .max(100, "Company name is too long"),
})

export type CompleteIdentityValues = z.infer<typeof completeIdentitySchema>
