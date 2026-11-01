import { CLOSE_HOUR, OPEN_HOUR, blockedSlots } from "@/data/availability"
import { products, type Product } from "@/data/products"
import { vouchers, type Voucher } from "@/data/vouchers"
import { toIsoDate } from "@/helper/formatDate"
import { calculateDiscount, calculateTotal } from "@/helper/pricing"
import { getAddOnUnit } from "@/helper/product"
import { simulateRequest } from "./auth"

export interface BookingAddOnInput {
  id: string
  qty: number
}

export interface CreateBookingPayload {
  productId: string
  date: string
  start: string
  end: string
  additionalRequest?: string
  addOns: BookingAddOnInput[]
  voucherCode?: string
}

export interface BookingAddOn {
  id: string
  name: string
  unit: string
  unitPrice: number
  qty: number
  amount: number
}

export interface BookingVoucher {
  id: string
  code: string
  title: string
  discount: number
}

export interface BookingProduct {
  id: string
  name: string
  type: string
  badgeClass: string
  image: string
  people: number
  period: string
  location: Product["location"]
}

export interface Booking {
  id: string
  reference: string
  createdAt: string
  product: BookingProduct
  date: string
  start: string
  end: string
  additionalRequest: string
  addOns: BookingAddOn[]
  voucher: BookingVoucher | null
  productAmount: number
  addOnAmount: number
  subtotal: number
  discount: number
  total: number
}

export type VoucherErrorCode =
  | "not-found"
  | "expired"
  | "not-applicable"
  | "used"
  | "min-transaction"

export interface VoucherValidationResult {
  valid: boolean
  code?: VoucherErrorCode
  message?: string
  voucher?: Voucher
  discount?: number
}

export interface AvailabilityInput {
  productId: string
  date: string
  start: string
  end: string
}

export interface AvailabilityResult {
  available: boolean
  message?: string
}

const TIME_PATTERN = /^([01]\d|2[0-3]):([0-5]\d)$/

const findProduct = (productId: string) =>
  products.find((product) => product.id === productId) ??
  products.find((product) => product.slug === productId)

const minutesOf = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number)
  return hours * 60 + minutes
}

const isVoucherInPeriod = (voucher: Voucher) => {
  const today = toIsoDate(new Date())
  return today >= voucher.validFrom && today <= voucher.validUntil
}

const isVoucherApplicable = (voucher: Voucher, product: Product) =>
  voucher.applicableTypes.length === 0 ||
  voucher.applicableTypes.includes(product.type)

const validateVoucherSync = (
  voucher: Voucher,
  product: Product,
  subtotal: number
): VoucherValidationResult => {
  if (voucher.used) {
    return {
      valid: false,
      code: "used",
      message: "This voucher has already been used",
    }
  }

  if (!isVoucherInPeriod(voucher)) {
    return {
      valid: false,
      code: "expired",
      message: "This voucher is expired",
    }
  }

  if (!isVoucherApplicable(voucher, product)) {
    return {
      valid: false,
      code: "not-applicable",
      message: "This voucher is not valid for this room type",
    }
  }

  if (subtotal < voucher.minTransaction) {
    return {
      valid: false,
      code: "min-transaction",
      message: `Minimum transaction for this voucher is Rp${voucher.minTransaction.toLocaleString(
        "en-US"
      )}`,
    }
  }

  return {
    valid: true,
    voucher,
    discount: calculateDiscount(subtotal, voucher),
  }
}

export const getProduct = async (productId: string): Promise<Product> => {
  await simulateRequest(450)

  const product = findProduct(productId)

  if (!product) {
    throw new Error("Product not found")
  }

  return product
}

export const getAvailableVouchers = async (
  productId: string
): Promise<Voucher[]> => {
  await simulateRequest(400)

  const product = findProduct(productId)

  if (!product) return []

  return vouchers.filter(
    (voucher) =>
      !voucher.used &&
      isVoucherInPeriod(voucher) &&
      isVoucherApplicable(voucher, product)
  )
}

export const validateVoucher = async (
  productId: string,
  code: string,
  subtotal: number
): Promise<VoucherValidationResult> => {
  await simulateRequest(550)

  const product = findProduct(productId)

  if (!product) {
    return {
      valid: false,
      code: "not-applicable",
      message: "Product not found",
    }
  }

  const normalized = code.trim().toUpperCase()
  const voucher = vouchers.find((item) => item.code === normalized)

  if (!voucher) {
    return {
      valid: false,
      code: "not-found",
      message: "Voucher code not found",
    }
  }

  return validateVoucherSync(voucher, product, subtotal)
}

const checkAvailabilitySync = ({
  productId,
  date,
  start,
  end,
}: AvailabilityInput): AvailabilityResult => {
  if (!findProduct(productId)) {
    return { available: false, message: "Product not found" }
  }

  if (!date) {
    return { available: false, message: "Please select a date" }
  }

  if (!TIME_PATTERN.test(start) || !TIME_PATTERN.test(end)) {
    return { available: false, message: "Please select a valid time" }
  }

  if (minutesOf(start) >= minutesOf(end)) {
    return { available: false, message: "End time must be after start time" }
  }

  if (
    minutesOf(start) < OPEN_HOUR * 60 ||
    minutesOf(end) > CLOSE_HOUR * 60
  ) {
    return {
      available: false,
      message: `Room is only available between ${String(OPEN_HOUR).padStart(
        2,
        "0"
      )}:00 and ${String(CLOSE_HOUR).padStart(2, "0")}:00`,
    }
  }

  const today = toIsoDate(new Date())

  if (date < today) {
    return { available: false, message: "The selected date has passed" }
  }

  if (date === today) {
    const now = new Date()
    const nowMinutes = now.getHours() * 60 + now.getMinutes()

    if (minutesOf(start) <= nowMinutes) {
      return { available: false, message: "The selected time has passed" }
    }
  }

  const overlap = blockedSlots.some(
    (slot) =>
      slot.productId === productId &&
      slot.date === date &&
      minutesOf(start) < minutesOf(slot.end) &&
      minutesOf(end) > minutesOf(slot.start)
  )

  if (overlap) {
    return {
      available: false,
      message: "This time slot is no longer available",
    }
  }

  return { available: true }
}

export const checkAvailability = async (
  input: AvailabilityInput
): Promise<AvailabilityResult> => {
  await simulateRequest(500)
  return checkAvailabilitySync(input)
}

const createReference = () =>
  `CS-${Date.now().toString(36).toUpperCase()}-${Math.random()
    .toString(36)
    .slice(2, 6)
    .toUpperCase()}`

export const createBooking = async (
  payload: CreateBookingPayload
): Promise<Booking> => {
  await simulateRequest(900)

  const product = findProduct(payload.productId)

  if (!product) {
    throw new Error("Product not found")
  }

  const availability = checkAvailabilitySync(payload)

  if (!availability.available) {
    throw new Error(availability.message ?? "This slot is not available")
  }

  const addOns: BookingAddOn[] = payload.addOns.map((input) => {
    const addOn = product.addOns.find((item) => item.id === input.id)

    if (!addOn) {
      throw new Error("One of the selected add-ons is not available")
    }

    const qty = Math.min(
      Math.max(1, Math.floor(input.qty)),
      Math.max(1, addOn.maxQty)
    )

    return {
      id: addOn.id,
      name: addOn.name,
      unit: getAddOnUnit(addOn),
      unitPrice: addOn.amount,
      qty,
      amount: addOn.amount * qty,
    }
  })

  const primaryPrice = product.prices[0]
  const preliminarySubtotal =
    primaryPrice.amount + addOns.reduce((sum, addOn) => sum + addOn.amount, 0)

  let voucher: BookingVoucher | null = null
  let voucherRule: Voucher | null = null

  if (payload.voucherCode) {
    const normalized = payload.voucherCode.trim().toUpperCase()
    const found = vouchers.find((item) => item.code === normalized)
    const result = found
      ? validateVoucherSync(found, product, preliminarySubtotal)
      : {
          valid: false,
          code: "not-found" as const,
          message: "Voucher code not found",
        }

    if (!result.valid || !result.voucher) {
      throw new Error(result.message ?? "Voucher is not valid")
    }

    voucherRule = result.voucher
    voucher = {
      id: result.voucher.id,
      code: result.voucher.code,
      title: result.voucher.title,
      discount: result.discount ?? 0,
    }
  }

  const totals = calculateTotal({
    productAmount: primaryPrice.amount,
    addOns: addOns.map((addOn) => ({ amount: addOn.unitPrice, qty: addOn.qty })),
    voucher: voucherRule,
  })

  if (voucher) {
    voucher = { ...voucher, discount: totals.discount }
  }

  return {
    id: `booking-${Date.now().toString(36)}`,
    reference: createReference(),
    createdAt: new Date().toISOString(),
    product: {
      id: product.id,
      name: product.name,
      type: product.type,
      badgeClass: product.badgeClass,
      image: product.image,
      people: product.people,
      period: primaryPrice.period,
      location: product.location,
    },
    date: payload.date,
    start: payload.start,
    end: payload.end,
    additionalRequest: payload.additionalRequest?.trim() ?? "",
    addOns,
    voucher,
    productAmount: totals.productAmount,
    addOnAmount: totals.addOnAmount,
    subtotal: totals.subtotal,
    discount: totals.discount,
    total: totals.total,
  }
}
