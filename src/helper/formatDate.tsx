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
