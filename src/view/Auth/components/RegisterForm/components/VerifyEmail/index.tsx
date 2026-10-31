"use client"

import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { Loader2, Timer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCountdown } from "@/hooks/useCountdown"
import { resendVerification, verifyEmail } from "@/lib/auth"
import { cn } from "@/lib/utils"
import FormOtp from "@/components/Form/FormOtp"
import { formatTime } from "@/helper/formatTime"

interface VerifyEmailProps {
  email: string
  onVerified: () => void
}

interface VerifyEmailValues {
  code: string
}

const VerifyEmail = ({ email, onVerified }: VerifyEmailProps) => {
  const { control, watch, reset, handleSubmit } = useForm<VerifyEmailValues>({
    defaultValues: { code: "" },
  })

  const code = watch("code")

  const { remaining, isFinished, restart } = useCountdown(
    119,
    `sagara:verify-email:countdown:${email}`
  )

  const [error, setError] = useState<string | null>(null)
  const [verifying, setVerifying] = useState(false)
  const [resending, setResending] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [lockUntil, setLockUntil] = useState<number | null>(null)
  const [lockRemaining, setLockRemaining] = useState(0)
  const [toast, setToast] = useState<string | null>(null)
  const [otpKey, setOtpKey] = useState(0)

  const isLocked = lockRemaining > 0
  const isComplete = code.length === 6
  const canVerify = isComplete && !verifying && !isLocked

  const errorMessage = isLocked
    ? `Too many attempts. Please try again in ${formatTime(lockRemaining)}.`
    : error

  const handleVerify = async (values: VerifyEmailValues) => {
    if (values.code.length !== 6 || verifying || isLocked) return

    setVerifying(true)
    setError(null)

    try {
      const result = await verifyEmail({ email, code: values.code })

      if (result.ok) {
        onVerified()
        return
      }

      const nextAttempts = attempts + 1
      setAttempts(nextAttempts)

      if (nextAttempts >= 5) {
        setAttempts(0)
        setLockUntil(Date.now() + 30 * 1000)
      } else {
        setError("The code is incorrect. Please try again.")
      }
    } catch {
      setToast("Network error. Please check your connection and try again.")
    } finally {
      setVerifying(false)
    }
  }

  const handleResend = async () => {
    if (resending || verifying) return

    setResending(true)

    try {
      await resendVerification({ email })

      reset({ code: "" })
      setError(null)
      setAttempts(0)
      setOtpKey((key) => key + 1)
      restart()
    } catch {
      setToast("Couldn't resend the code. Please try again.")
    } finally {
      setResending(false)
    }
  }

  useEffect(() => {
    if (!lockUntil) return

    const tick = () => {
      const left = Math.max(0, Math.ceil((lockUntil - Date.now()) / 1000))
      setLockRemaining(left)

      if (left === 0) setLockUntil(null)
    }

    tick()
    const id = window.setInterval(tick, 1000)

    return () => window.clearInterval(id)
  }, [lockUntil])

  useEffect(() => {
    if (!toast) return

    const id = window.setTimeout(() => setToast(null), 4000)

    return () => window.clearTimeout(id)
  }, [toast])

  return (
    <div className="w-full overflow-hidden">
      <div className="flex flex-col items-center justify-center gap-5 text-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Email Verification
          </h1>
          <p className="mt-1.5 text-sm break-words text-neutral-500">
            We have sent a verification code to {email}
          </p>
        </div>

        <div className="flex w-full flex-col items-center gap-4">
          <Controller
            name="code"
            control={control}
            render={({ field }) => (
              <FormOtp
                key={otpKey}
                value={field.value}
                onChange={(next: string) => {
                  field.onChange(next)

                  if (error) setError(null)
                }}
                error={errorMessage}
                disabled={verifying || isLocked || resending}
                autoFocus
                className="w-full"
              />
            )}
          />

          {errorMessage ? (
            <p role="alert" className="text-center text-sm text-destructive">
              {errorMessage}
            </p>
          ) : null}

          <Button
            type="button"
            onClick={handleSubmit(handleVerify)}
            disabled={!canVerify}
            aria-busy={verifying}
            className={cn(
              "h-11 w-full rounded-sm text-sm disabled:opacity-100",
              !canVerify &&
                !verifying &&
                "pointer-events-none bg-neutral-200 text-neutral-400 hover:bg-neutral-200"
            )}
          >
            {verifying && (
              <Loader2
                className="size-4 motion-safe:animate-spin"
                aria-hidden
              />
            )}
            Verify
          </Button>
        </div>

        <div className="text-sm text-neutral-500">
          <p>Didn&apos;t receive the code?</p>

          {isFinished ? (
            <button
              type="button"
              onClick={handleResend}
              disabled={verifying || resending}
              className="mt-1 font-medium text-primary underline-offset-4 hover:underline disabled:pointer-events-none disabled:opacity-50"
            >
              {resending ? "Sending..." : "Resend Code"}
            </button>
          ) : (
            <p className="mt-1 inline-flex items-center gap-1.5">
              <Timer className="size-3.5" aria-hidden />
              Resend new code in{" "}
              <span className="font-semibold text-primary">
                {formatTime(remaining)}
              </span>
            </p>
          )}
        </div>

        <p className="sr-only" aria-live="polite">
          {isFinished ? "You can request a new code now" : ""}
        </p>
      </div>

      {toast ? (
        <div
          role="alert"
          className="fixed inset-x-4 bottom-6 z-50 mx-auto max-w-sm rounded-md bg-neutral-900 px-4 py-3 text-center text-sm text-white shadow-lg"
        >
          {toast}
        </div>
      ) : null}
    </div>
  )
}

export default VerifyEmail
