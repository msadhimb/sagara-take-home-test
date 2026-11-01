export const formatCurrency = (amount: number) => {
  const safe = Number.isFinite(amount) ? Math.round(amount) : 0
  return `Rp${safe.toLocaleString("en-US")}`
}
