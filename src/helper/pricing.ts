export interface PricingAddOn {
  amount: number
  qty: number
}

export interface PricingVoucher {
  type: "percentage" | "fixed"
  value: number
}

export interface PricingInput {
  productAmount: number
  addOns?: PricingAddOn[]
  voucher?: PricingVoucher | null
}

export interface PricingResult {
  productAmount: number
  addOnAmount: number
  subtotal: number
  discount: number
  total: number
}

const safeAmount = (value: number) =>
  Number.isFinite(value) && value > 0 ? value : 0

const safeQty = (value: number) =>
  Number.isFinite(value) && value > 0 ? Math.floor(value) : 0

export const calculateDiscount = (
  subtotal: number,
  voucher?: PricingVoucher | null
) => {
  if (!voucher) return 0

  const raw =
    voucher.type === "percentage"
      ? (subtotal * safeAmount(voucher.value)) / 100
      : safeAmount(voucher.value)

  return Math.min(subtotal, Math.round(raw))
}

export const calculateTotal = ({
  productAmount,
  addOns = [],
  voucher,
}: PricingInput): PricingResult => {
  const safeProductAmount = safeAmount(productAmount)
  const addOnAmount = addOns.reduce(
    (sum, addOn) => sum + safeAmount(addOn.amount) * safeQty(addOn.qty),
    0
  )
  const subtotal = safeProductAmount + addOnAmount
  const discount = calculateDiscount(subtotal, voucher)

  return {
    productAmount: safeProductAmount,
    addOnAmount,
    subtotal,
    discount,
    total: Math.max(0, subtotal - discount),
  }
}
