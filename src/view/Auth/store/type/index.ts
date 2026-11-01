import type { Booking } from "@/lib/booking"

export interface User {
  name: string
  email: string
  dateOfBirth?: string
  companyName?: string
  isProfileComplete: boolean
  bookings: Booking[]
}

export interface LoginPayload {
  email: string
  name?: string
}
export interface UserState {
  user: User | null
  profilePrompt: boolean
  step: string
  login: (payload: LoginPayload) => void
  addBooking: (booking: Booking) => void
  requestProfileCompletion: () => void
  dismissProfilePrompt: () => void
  logout: () => void
  setStep: (step: string) => void
}
