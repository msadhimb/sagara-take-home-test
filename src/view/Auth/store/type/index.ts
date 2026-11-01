export interface User {
  name: string
  email: string
  password: string
  dateOfBirth?: string
  companyName?: string
  isProfileComplete: boolean
}

export interface LoginPayload {
  email: string
  password?: string
  name?: string
}
export interface UserState {
  user: User | null
  profilePrompt: boolean
  step: string
  login: (payload: LoginPayload) => void
  requestProfileCompletion: () => void
  dismissProfilePrompt: () => void
  logout: () => void
  setStep: (step: string) => void
}
