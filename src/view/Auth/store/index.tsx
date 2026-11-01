import { create } from "zustand"
import { UserState } from "./type"

export const useAuthStore = create<UserState>((set) => ({
  user: null,
  profilePrompt: false,
  step: "initial",
  login: ({ email, password = "password", name = "User" }) =>
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

  dismissProfilePrompt: () => set({ profilePrompt: false }),
  logout: () => set({ user: null, profilePrompt: false }),
  setStep: (step) => set({ step }),
}))
