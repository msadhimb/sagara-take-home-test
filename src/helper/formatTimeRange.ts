export const formatTimeRange = (start?: string, end?: string) => {
  if (!start && !end) return ""
  if (start && end) return `${start} - ${end}`
  return start ?? end ?? ""
}
