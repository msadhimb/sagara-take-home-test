export const formatTime = (seconds: number) => {
  const safe = Math.max(0, seconds)
  const minutes = Math.floor(safe / 60)
  const rest = safe % 60

  return `${String(minutes).padStart(2, "0")}:${String(rest).padStart(2, "0")}`
}
