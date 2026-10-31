/**
 * Mocked auth API. Replace the bodies with real network calls later.
 *
 * Test rules:
 * - code "999999" verifies successfully, any other code fails
 * - email "offline@example.com" simulates a network failure (throws)
 */
const MOCK_DELAY = 900
const SUCCESS_CODE = "999999"
const OFFLINE_EMAIL = "offline@example.com"

const wait = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms))

export const simulateRequest = (ms = 800) => wait(ms)

export interface VerificationResponse {
  ok: boolean
}

interface VerifyEmailPayload {
  email: string
  code: string
}

interface ResendVerificationPayload {
  email: string
}

const isOffline = (email: string) =>
  email.trim().toLowerCase() === OFFLINE_EMAIL

export async function verifyEmail({
  email,
  code,
}: VerifyEmailPayload): Promise<VerificationResponse> {
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

/**
 * Mocked profile completion request. Replace with the real endpoint later.
 * Company name "offline" simulates a network failure for error-state testing.
 */
export async function completeIdentity(
  payload: CompleteIdentityPayload
): Promise<void> {
  await wait(MOCK_DELAY)

  if (payload.companyName.trim().toLowerCase() === "offline") {
    throw new Error("Network error. Please check your connection.")
  }
}
