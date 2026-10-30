import { id as idLocale } from "date-fns/locale"
import { format } from "date-fns"

export const formatDate = (date: Date) =>
  format(date, "d MMM yyyy", { locale: idLocale })
