import { beforeEach, describe, expect, it } from "vitest"
import type { Booking } from "@/lib/booking"
import { useAuthStore } from "./index"

const makeBooking = (reference: string): Booking => ({
  id: `booking-${reference}`,
  reference,
  createdAt: "2026-11-01T00:00:00.000Z",
  product: {
    id: "prd-test",
    name: "Test Room",
    type: "Meeting Room",
    badgeClass: "",
    image: "",
    people: 4,
    period: "hour",
    location: {
      name: "Test Tower",
      address: "Test Address",
      latitude: 0,
      longitude: 0,
    },
  },
  date: "2026-11-10",
  start: "09:00",
  end: "10:00",
  additionalRequest: "",
  addOns: [],
  voucher: null,
  productAmount: 0,
  addOnAmount: 0,
  subtotal: 0,
  discount: 0,
  total: 0,
})

beforeEach(() => {
  useAuthStore.setState({
    user: null,
    profilePrompt: false,
    step: "identify",
  })
})

describe("auth store bookings", () => {
  it("starts a new account with no bookings", () => {
    useAuthStore.getState().login({ email: "User@Example.com" })

    const user = useAuthStore.getState().user

    expect(user?.email).toBe("user@example.com")
    expect(user?.bookings).toEqual([])
  })

  it("adds a booking to the active account", () => {
    useAuthStore.getState().login({ email: "user@example.com" })
    useAuthStore.getState().addBooking(makeBooking("CS-1"))

    expect(useAuthStore.getState().user?.bookings).toHaveLength(1)
    expect(useAuthStore.getState().user?.bookings[0].reference).toBe("CS-1")
  })

  it("replaces a booking with the same reference", () => {
    useAuthStore.getState().login({ email: "user@example.com" })
    useAuthStore.getState().addBooking(makeBooking("CS-1"))
    useAuthStore.getState().addBooking(makeBooking("CS-1"))

    expect(useAuthStore.getState().user?.bookings).toHaveLength(1)
  })

  it("ignores bookings without an active account", () => {
    useAuthStore.getState().addBooking(makeBooking("CS-1"))

    expect(useAuthStore.getState().user).toBeNull()
  })

  it("clears the account and its bookings on logout", () => {
    useAuthStore.getState().login({ email: "user@example.com" })
    useAuthStore.getState().addBooking(makeBooking("CS-1"))
    useAuthStore.getState().logout()

    expect(useAuthStore.getState().user).toBeNull()
  })
})
