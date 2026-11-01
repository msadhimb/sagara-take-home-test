import { format, isValid, parse } from "date-fns"

export const parseDateValue = (value?: Date | string | null) => {
  if (!value) return undefined

  const date =
    typeof value === "string" ? parse(value, "dd/MM/yyyy", new Date()) : value

  if (!isValid(date)) return undefined

  return date
}

export const formatDate = (value?: Date | string | null) => {
  const date = parseDateValue(value)

  if (!date) return ""

  return format(date, "dd/MM/yyyy")
}

export const parseIsoDate = (value?: string | null) => {
  if (!value) return undefined

  const date = parse(value, "yyyy-MM-dd", new Date())

  if (!isValid(date)) return undefined

  return date
}

export const toIsoDate = (value: Date) => format(value, "yyyy-MM-dd")

export const formatDateLong = (value?: Date | string | null) => {
  if (!value) return ""

  const date = typeof value === "string" ? parseIsoDate(value) : value

  if (!date || !isValid(date)) return ""

  return format(date, "EEE, dd MMMM yyyy")
}
