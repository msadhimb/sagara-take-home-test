import { addDays } from "date-fns"
import { describe, expect, it } from "vitest"
import { toIsoDate } from "@/helper/formatDate"
import { checkAvailability, createBooking, validateVoucher } from "./booking"

const futureDate = toIsoDate(addDays(new Date(), 7))

const base = {
  productId: "prd-axa-tower-meeting-room",
  date: futureDate,
  start: "09:00",
  end: "12:00",
}

describe("checkAvailability", () => {
  it("accepts an open slot", async () => {
    await expect(checkAvailability(base)).resolves.toEqual({ available: true })
  })

  it("rejects a slot that overlaps a blocked slot", async () => {
    const result = await checkAvailability({
      ...base,
      date: "2026-11-05",
      start: "10:30",
      end: "11:30",
    })

    expect(result.available).toBe(false)
  })

  it("rejects a time outside opening hours", async () => {
    const result = await checkAvailability({
      ...base,
      start: "07:00",
      end: "09:00",
    })

    expect(result.available).toBe(false)
  })

  it("rejects an end time before the start time", async () => {
    const result = await checkAvailability({
      ...base,
      start: "12:00",
      end: "09:00",
    })

    expect(result.available).toBe(false)
  })
})

describe("createBooking", () => {
  it("prices add-ons from the product data", async () => {
    const booking = await createBooking({
      ...base,
      addOns: [{ id: "addon-projector", qty: 2 }],
      additionalRequest: "  Extra chairs  ",
    })

    expect(booking.productAmount).toBe(2880000)
    expect(booking.addOnAmount).toBe(500000)
    expect(booking.subtotal).toBe(3380000)
    expect(booking.total).toBe(3380000)
    expect(booking.additionalRequest).toBe("Extra chairs")
    expect(booking.reference).toMatch(/^CS-/)
  })

  it("rejects an expired voucher", async () => {
    await expect(
      createBooking({ ...base, addOns: [], voucherCode: "EXPIRED10" })
    ).rejects.toThrow("expired")
  })

  it("rejects an unavailable slot", async () => {
    await expect(
      createBooking({
        ...base,
        date: "2026-11-05",
        start: "10:30",
        end: "11:30",
        addOns: [],
      })
    ).rejects.toThrow()
  })
})

describe("validateVoucher", () => {
  it("accepts an applicable voucher", async () => {
    const result = await validateVoucher(
      "prd-axa-tower-meeting-room",
      "MEET10",
      2880000
    )

    expect(result.valid).toBe(true)
    expect(result.discount).toBe(288000)
  })

  it("reports a voucher for another room type", async () => {
    const result = await validateVoucher(
      "prd-axa-tower-meeting-room",
      "OFFICE20",
      2880000
    )

    expect(result.valid).toBe(false)
    expect(result.code).toBe("not-applicable")
  })

  it("reports a voucher below its minimum transaction", async () => {
    const result = await validateVoucher(
      "prd-axa-tower-meeting-room",
      "MEET15",
      500000
    )

    expect(result.valid).toBe(false)
    expect(result.code).toBe("min-transaction")
  })
})
