import { create } from "zustand"
import type { BookingState } from "./type"

const initialState = {
  product: null,
  date: "",
  start: "",
  end: "",
  additionalRequest: "",
  addOns: {},
  voucher: null,
}

export const useBookingStore = create<BookingState>((set) => ({
  product: null,
  date: "",
  start: "",
  end: "",
  additionalRequest: "",
  addOns: {},
  voucher: null,
  initialize: ({ product, date, start, end }) =>
    set({ ...initialState, product, date, start, end }),
  setAdditionalRequest: (additionalRequest) => set({ additionalRequest }),
  setAddOns: (addOns) => set({ addOns }),
  setAddOnQty: (id, qty) =>
    set((state) => {
      const next = { ...state.addOns }

      if (qty <= 0) {
        delete next[id]
      } else {
        next[id] = qty
      }

      return { addOns: next }
    }),
  setVoucher: (voucher) => set({ voucher }),
  reset: () => set(initialState),
}))
