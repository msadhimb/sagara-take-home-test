const MOCK_DELAY = 900
const SUCCESS_CODE = "999999"
const OFFLINE_EMAIL = "offline@example.com"

const wait = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms))

export const simulateRequest = (ms = 800) => wait(ms)

export interface VerificationResponse {
  ok: boolean
}

interface otpVerifyPayload {
  email: string
  code: string
}

interface ResendVerificationPayload {
  email: string
}

const isOffline = (email: string) =>
  email.trim().toLowerCase() === OFFLINE_EMAIL

export async function otpVerify({
  email,
  code,
}: otpVerifyPayload): Promise<VerificationResponse> {
  await wait(MOCK_DELAY)

  if (isOffline(email)) {
    throw new Error("Network error. Please check your connection.")
  }

  return { ok: code === SUCCESS_CODE }
}

export async function resendVerification({
  email,
}: ResendVerificationPayload): Promise<VerificationResponse> {
  await wait(600)

  if (isOffline(email)) {
    throw new Error("Network error. Please check your connection.")
  }

  return { ok: true }
}

export interface CompleteIdentityPayload {
  dateOfBirth: string
  companyName: string
}

export async function completeIdentity(
  payload: CompleteIdentityPayload
): Promise<void> {
  await wait(MOCK_DELAY)

  if (payload.companyName.trim().toLowerCase() === "offline") {
    throw new Error("Network error. Please check your connection.")
  }
}
