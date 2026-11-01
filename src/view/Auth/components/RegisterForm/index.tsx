"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Controller, useFormContext, useWatch } from "react-hook-form"
import { AnimatePresence, motion, stagger } from "motion/react"
import { ArrowRight, Building2, Loader2, Lock, Mail, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import FormInput from "@/components/Form/FormInput"
import { simulateRequest } from "@/lib/auth"
import { formVariants } from "../../helper/animation"
import PasswordChecklist from "./components/PasswordChecklist"
import OtpVerify from "../OtpVerify"
import { useAuthStore } from "../../store"
import { useActionModal } from "@/components/ActionModal/store"

const RegisterForm = () => {
  const { step, setStep } = useAuthStore()
  const { openModalActions } = useActionModal()

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useFormContext()
  const password = useWatch({ control, name: "password" }) ?? ""

  const [email, setEmail] = useState("")

  const handleRegister = async (values: any) => {
    setStep("sending")
    await simulateRequest()
    setEmail(values.email)
    setStep("otp_register")
  }

  const handleVerified = () => {
    openModalActions({
      success: true,
      descText: "Your account has been created successfully",
      closeButton: true,
      link: {
        text: "Go to Login",
        direct: "/auth?mode=login",
        replace: true,
      },
    })
  }

  useEffect(() => {
    return () => {
      setStep("initial")
    }
  }, [])

  return (
    <div className="flex w-full flex-col items-center">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key="form"
          custom={1}
          variants={formVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="flex w-full flex-col items-center gap-15"
        >
          {step === "initial" ? (
            <>
              <div className="flex w-full flex-col gap-5">
                <motion.div {...stagger(0)}>
                  <Controller
                    control={control}
                    name="name"
                    render={({ field }) => (
                      <FormInput
                        {...field}
                        label="Name"
                        placeholder="Your full name"
                        autoComplete="name"
                        icon={<User size={15} />}
                        error={errors?.name?.message as string}
                        data-auth-field
                      />
                    )}
                  />
                </motion.div>

                <motion.div {...stagger(1)}>
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
                      />
                    )}
                  />
                </motion.div>

                <motion.div {...stagger(2)}>
                  <Controller
                    control={control}
                    name="phone_number"
                    render={({ field }) => (
                      <FormInput
                        {...field}
                        label="Phone Number"
                        placeholder="08**********"
                        autoComplete="tel"
                        icon={<Building2 size={15} />}
                        error={errors?.phone_number?.message as string}
                      />
                    )}
                  />
                </motion.div>

                <motion.div {...stagger(3)}>
                  <Controller
                    control={control}
                    name="password"
                    render={({ field }) => (
                      <FormInput
                        {...field}
                        label="Password"
                        type="password"
                        placeholder="********"
                        autoComplete="current-password"
                        icon={<Lock size={15} />}
                        error={errors?.password?.message as string}
                      />
                    )}
                  />
                  <PasswordChecklist password={password} />
                </motion.div>
              </div>

              <motion.div {...stagger(4)}>
                <Button
                  type="button"
                  onClick={handleSubmit(handleRegister)}
                  disabled={isSubmitting}
                  className="h-11 rounded-sm px-24 text-sm"
                >
                  {isSubmitting ? "Creating Account..." : "Sign Up"}
                  {!isSubmitting && <ArrowRight className="size-4" />}
                </Button>
              </motion.div>
            </>
          ) : step === "otp_register" ? (
            <OtpVerify email={email} onVerified={handleVerified} />
          ) : (
            <div className="flex flex-col items-center justify-center text-center">
              <div className="relative grid size-14 place-items-center">
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-full bg-primary/10 motion-safe:animate-ping"
                />
                <Loader2
                  aria-hidden
                  className="size-7 text-primary motion-safe:animate-spin"
                />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-neutral-800">
                  Creating your account...
                </p>
                <p className="text-sm text-neutral-500">
                  Sending your verification code
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default RegisterForm
