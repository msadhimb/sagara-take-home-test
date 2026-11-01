import * as yup from "yup"

export const bookingSchema = yup.object({
  additionalRequest: yup
    .string()
    .trim()
    .max(500, "Additional request must be 500 characters or less")
    .default(""),
})

export type BookingFormValues = yup.InferType<typeof bookingSchema>

export const voucherSchema = yup.object({
  code: yup.string().trim().required("Enter a voucher code"),
})
