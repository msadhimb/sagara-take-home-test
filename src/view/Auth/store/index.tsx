import { create } from "zustand"
import type { UserState } from "./type"

export const useAuthStore = create<UserState>((set) => ({
  user: null,
  profilePrompt: false,
  step: "identify",
  login: ({ email, name = "User" }) =>
    set((state) => {
      const normalized = email.trim().toLowerCase()
      const current = state.user

      return {
        user:
          current?.email === normalized
            ? current
            : {
                name,
                email: normalized,
                isProfileComplete: false,
                bookings: [],
              },
        profilePrompt: false,
      }
    }),
  addBooking: (booking) =>
    set((state) => {
      if (!state.user) return state

      const exists = state.user.bookings.some(
        (item) => item.reference === booking.reference
      )
      const bookings = exists
        ? state.user.bookings.map((item) =>
            item.reference === booking.reference ? booking : item
          )
        : [...state.user.bookings, booking]

      return { user: { ...state.user, bookings } }
    }),
  requestProfileCompletion: () =>
    set((state) =>
      state.user && !state.user.isProfileComplete
        ? { profilePrompt: true }
        : state
    ),

  dismissProfilePrompt: () => set({ profilePrompt: false }),
  logout: () => set({ user: null, profilePrompt: false }),
  setStep: (step) => set({ step }),
}))
