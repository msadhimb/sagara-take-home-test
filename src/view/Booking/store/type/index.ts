import type { Product } from "@/data/products"
import type { Voucher } from "@/data/vouchers"

export interface BookingContext {
  product: Product
  date: string
  start: string
  end: string
}

export interface AppliedVoucher {
  voucher: Voucher
  discount: number
}

export interface BookingState {
  product: Product | null
  date: string
  start: string
  end: string
  additionalRequest: string
  addOns: Record<string, number>
  voucher: AppliedVoucher | null
  initialize: (context: BookingContext) => void
  setAdditionalRequest: (value: string) => void
  setAddOns: (addOns: Record<string, number>) => void
  setAddOnQty: (id: string, qty: number) => void
  setVoucher: (voucher: AppliedVoucher | null) => void
  reset: () => void
}
