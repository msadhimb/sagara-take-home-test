import { create } from "zustand"
import type { CompleteIdentityValues } from "@/schemas/complete-identity.schema"

export interface User {
  name: string
  email: string
  password: string
  dateOfBirth?: string
  companyName?: string
  isProfileComplete: boolean
}

const DUMMY_NAME = "Sagara User"
const DUMMY_PASSWORD = "dummy-password"

interface LoginPayload {
  email: string
  password?: string
  name?: string
}

interface UserState {
  user: User | null
  profilePrompt: boolean
  login: (payload: LoginPayload) => void
  requestProfileCompletion: () => void
  completeProfile: (values: CompleteIdentityValues) => void
  dismissProfilePrompt: () => void
  logout: () => void
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  profilePrompt: false,
  login: ({ email, password = DUMMY_PASSWORD, name = DUMMY_NAME }) =>
    set({
      user: {
        name,
        email,
        password,
        isProfileComplete: false,
      },
      profilePrompt: false,
    }),
  requestProfileCompletion: () =>
    set((state) =>
      state.user && !state.user.isProfileComplete
        ? { profilePrompt: true }
        : state
    ),
  completeProfile: ({ dateOfBirth, companyName }) =>
    set((state) =>
      state.user
        ? {
            user: {
              ...state.user,
              dateOfBirth,
              companyName,
              isProfileComplete: true,
            },
            profilePrompt: false,
          }
        : state
    ),
  dismissProfilePrompt: () => set({ profilePrompt: false }),
  logout: () => set({ user: null, profilePrompt: false }),
}))
