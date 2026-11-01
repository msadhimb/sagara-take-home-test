"use client"

import { Controller, useFormContext } from "react-hook-form"
import { AnimatePresence, motion, stagger } from "motion/react"
import { ArrowLeft, ArrowRight, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import FormInput from "@/components/Form/FormInput"
import Link from "next/link"
import { formVariants } from "../../helper/animation"
import { useAuthStore } from "../../store"
import OtpVerify from "../OtpVerify"
import ResetPassword from "./components/ResetPassword"
import { useEffect } from "react"

const ForgotForm = () => {
  const { step, setStep } = useAuthStore()
  const {
    watch,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useFormContext()

  const handleForgot = async (values: any) => {
    setStep("otp-forgot")
  }

  useEffect(() => {
    return () => {
      setStep("initial")
    }
  }, [])

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={step}
        variants={formVariants}
        initial="enter"
        animate="center"
        exit="exit"
        className="flex flex-col items-center gap-15"
      >
        {step === "initial" ? (
          <>
            <div className="flex w-full flex-col gap-5">
              <motion.div {...stagger(0)}>
                <Controller
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <FormInput
                      {...field}
                      label="Email"
                      type="email"
                      placeholder="you@company.com"
                      autoComplete="email"
                      icon={<Mail size={15} />}
                      error={errors?.email?.message as string}
                      data-auth-field
                    />
                  )}
                />
              </motion.div>
            </div>

            <motion.div {...stagger(1)} className="w-full">
              <Button
                type="button"
                onClick={handleSubmit(handleForgot)}
                disabled={isSubmitting}
                className="h-11 w-full rounded-sm text-sm"
              >
                {isSubmitting ? "Sending..." : "Send Reset Link"}
                {!isSubmitting && <ArrowRight className="size-4" />}
              </Button>
            </motion.div>

            <motion.div {...stagger(2)}>
              <Link
                href="/auth?mode=login"
                className="mx-auto flex items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 transition-colors hover:underline disabled:pointer-events-none disabled:opacity-50"
              >
                <ArrowLeft className="size-3.5" />
                Back to Sign In
              </Link>
            </motion.div>
          </>
        ) : step === "otp-forgot" ? (
          <OtpVerify
            email={watch("email")}
            onVerified={() => {
              handleSubmit(() => setStep("reset"))()
            }}
          />
        ) : (
          <ResetPassword />
        )}
      </motion.div>
    </AnimatePresence>
  )
}

export default ForgotForm
