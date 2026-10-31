"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Controller, useFormContext, useWatch } from "react-hook-form"
import { AnimatePresence, motion, stagger } from "motion/react"
import { ArrowRight, Building2, Loader2, Lock, Mail, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import FormInput from "@/components/Form/FormInput"
import { simulateRequest } from "@/lib/auth"
import { formVariants } from "../../animation"
import PasswordChecklist from "./components/PasswordChecklist"
import VerifyEmail from "./components/VerifyEmail"

export type RegisterStep = "form" | "sending" | "verify"

interface RegisterFormProps {
  onStepChange?: (step: RegisterStep) => void
}

const RegisterForm = ({ onStepChange }: RegisterFormProps) => {
  const router = useRouter()

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useFormContext()
  const password = useWatch({ control, name: "password" }) ?? ""

  const [step, setStep] = useState<RegisterStep>("form")
  const [email, setEmail] = useState("")

  const updateStep = (next: RegisterStep) => {
    setStep(next)
    onStepChange?.(next)
  }

  const handleRegister = async (values: any) => {
    updateStep("sending")
    await simulateRequest()
    setEmail(values.email)
    updateStep("verify")
  }

  const handleVerified = () => {
    router.replace("/auth?mode=login")
  }

  return (
    <div className="flex w-full flex-col items-center">
      <AnimatePresence mode="wait" initial={false}>
        {step === "form" ? (
          <motion.div
            key="form"
            custom={1}
            variants={formVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="flex w-full flex-col items-center gap-15"
          >
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
                  name="companyId"
                  render={({ field }) => (
                    <FormInput
                      {...field}
                      label="Company ID"
                      placeholder="e.g. SG-10294"
                      autoComplete="organization"
                      icon={<Building2 size={15} />}
                      error={errors?.companyId?.message as string}
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
          </motion.div>
        ) : step === "sending" ? (
          <motion.div
            key="sending"
            custom={1}
            variants={formVariants}
            initial="enter"
            animate="center"
            exit="exit"
            role="status"
            aria-live="polite"
            className="flex w-full flex-col items-center gap-4 py-12 text-center"
          >
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
          </motion.div>
        ) : (
          <motion.div
            key="verify"
            custom={1}
            variants={formVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full"
          >
            <VerifyEmail email={email} onVerified={handleVerified} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default RegisterForm
