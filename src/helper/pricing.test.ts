import { describe, expect, it } from "vitest"
import { calculateDiscount, calculateTotal } from "./pricing"

describe("calculateTotal", () => {
  it("returns the product amount when there are no add-ons or voucher", () => {
    expect(calculateTotal({ productAmount: 2880000 })).toEqual({
      productAmount: 2880000,
      addOnAmount: 0,
      subtotal: 2880000,
      discount: 0,
      total: 2880000,
    })
  })

  it("multiplies add-on amount by quantity", () => {
    const result = calculateTotal({
      productAmount: 2880000,
      addOns: [
        { amount: 85000, qty: 2 },
        { amount: 1200000, qty: 1 },
      ],
    })

    expect(result.addOnAmount).toBe(1370000)
    expect(result.subtotal).toBe(4250000)
    expect(result.total).toBe(4250000)
  })

  it("applies a percentage voucher to the subtotal", () => {
    const result = calculateTotal({
      productAmount: 2880000,
      addOns: [{ amount: 85000, qty: 2 }],
      voucher: { type: "percentage", value: 10 },
    })

    expect(result.subtotal).toBe(3050000)
    expect(result.discount).toBe(305000)
    expect(result.total).toBe(2745000)
  })

  it("rounds percentage discounts to whole rupiah", () => {
    const result = calculateTotal({
      productAmount: 100000,
      voucher: { type: "percentage", value: 12.5 },
    })

    expect(result.discount).toBe(12500)
  })

  it("applies a fixed voucher", () => {
    const result = calculateTotal({
      productAmount: 2880000,
      voucher: { type: "fixed", value: 50000 },
    })

    expect(result.discount).toBe(50000)
    expect(result.total).toBe(2830000)
  })

  it("never discounts more than the subtotal", () => {
    const result = calculateTotal({
      productAmount: 30000,
      voucher: { type: "fixed", value: 50000 },
    })

    expect(result.discount).toBe(30000)
    expect(result.total).toBe(0)
  })

  it("ignores invalid quantities and amounts", () => {
    const result = calculateTotal({
      productAmount: 100000,
      addOns: [
        { amount: 50000, qty: 0 },
        { amount: 50000, qty: -2 },
      ],
    })

    expect(result.addOnAmount).toBe(0)
    expect(result.total).toBe(100000)
  })
})

describe("calculateDiscount", () => {
  it("returns zero without a voucher", () => {
    expect(calculateDiscount(100000, null)).toBe(0)
  })

  it("caps a fixed discount at the subtotal", () => {
    expect(calculateDiscount(40000, { type: "fixed", value: 50000 })).toBe(40000)
  })
})
