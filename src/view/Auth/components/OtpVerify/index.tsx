"use client"

import { useState } from "react"
import { Controller, useFormContext, useWatch } from "react-hook-form"
import { Loader2, Timer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCountdown } from "@/hooks/useCountdown"
import { resendVerification, otpVerify } from "@/lib/auth"
import { cn } from "@/lib/utils"
import FormOtp from "@/components/Form/FormOtp"
import { formatTime } from "@/helper/formatTime"

interface OtpVerifyProps {
  email: string
  onVerified: () => void
}

const OtpVerify = ({ email, onVerified }: OtpVerifyProps) => {
  const { remaining, isFinished, restart } = useCountdown(
    119,
    `sagara:verify-email:countdown:${email}`
  )

  const [resending, setResending] = useState(false)

  const {
    control,
    setValue,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useFormContext()

  const otp = useWatch({ control, name: "otp" }) as string | undefined

  const errorMessage = errors.otp?.message as string | undefined
  const isFilled = (otp?.length ?? 0) === 6
  const canVerify = isFilled && isValid && !errors.otp && !isSubmitting

  const handleVerify = async (values: any) => {
    try {
      const result = await otpVerify({ email, code: values.otp })

      if (result.ok) {
        onVerified()
        return
      }

      setError("otp", {
        type: "manual",
        message: "The code is incorrect. Please try again.",
      })
    } catch {
      setError("otp", {
        type: "manual",
        message: "Network error. Please check your connection and try again.",
      })
    }
  }

  const handleResend = async () => {
    if (resending || isSubmitting) return

    setResending(true)

    try {
      await resendVerification({ email })

      setValue("otp", "")
      clearErrors("otp")
      restart()
    } catch {
      setError("otp", {
        type: "manual",
        message: "Couldn't resend the code. Please try again.",
      })
    } finally {
      setResending(false)
    }
  }

  return (
    <div className="w-full overflow-hidden">
      <div className="flex flex-col items-center justify-center gap-5 text-center">
        <div className="flex w-full flex-col items-center gap-4">
          <Controller
            name="otp"
            control={control}
            render={({ field }) => (
              <FormOtp
                value={field.value}
                onChange={(next: string) => {
                  field.onChange(next)

                  if (errors.otp) clearErrors("otp")
                }}
                error={errorMessage}
                disabled={isSubmitting || resending}
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
            aria-busy={isSubmitting}
            className={cn(
              "h-11 w-full rounded-sm text-sm disabled:opacity-100",
              !canVerify &&
                !isSubmitting &&
                "pointer-events-none bg-neutral-200 text-neutral-400 hover:bg-neutral-200"
            )}
          >
            {isSubmitting && (
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
              disabled={isSubmitting || resending}
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
    </div>
  )
}

export default OtpVerify
