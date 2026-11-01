"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { Controller, useFormContext } from "react-hook-form"
import { motion } from "motion/react"
import { ArrowRight, Lock, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import FormInput from "@/components/Form/FormInput"
import { simulateRequest } from "@/lib/auth"
import { useAuthStore } from "../../store"
import { fieldVariants } from "../../helper/animation"
import CompleteIdentityModal from "./components/CompleteIdentityModal"

const LoginForm = () => {
  const router = useRouter()
  const { login, step, setStep } = useAuthStore()

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useFormContext()

  const stagger = (index: number) => ({
    variants: fieldVariants,
    initial: "hidden" as const,
    animate: "visible" as const,
    custom: index,
  })

  const handleLogin = async (values: any) => {
    await simulateRequest()
    login({
      email: values.email,
      password: values.password,
    })

    const isIdentityEmpty = !values.dateOfBirth || !values.companyName

    if (isIdentityEmpty) {
      setStep("identity")
      return
    }

    router.push("/")
  }

  const handleIdentitySaved = () => {
    setStep("initial")
    router.push("/")
  }

  return (
    <div className="flex flex-col items-center gap-15">
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
                required
                icon={<Mail size={15} />}
                error={errors?.email?.message as string}
                data-auth-field
              />
            )}
          />
        </motion.div>

        <motion.div {...stagger(1)}>
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
                required
                icon={<Lock size={15} />}
                error={errors?.password?.message as string}
              />
            )}
          />
        </motion.div>

        <motion.div
          {...stagger(2)}
          className="flex flex-wrap items-center justify-between gap-3"
        >
          <Controller
            control={control}
            name="remember"
            render={({ field }) => (
              <div className="flex items-center gap-2">
                <Checkbox
                  id="login-remember"
                  checked={field.value}
                  onCheckedChange={(value) => field.onChange(value === true)}
                />
                <Label
                  htmlFor="login-remember"
                  className="text-sm font-normal text-neutral-600"
                >
                  Remember me
                </Label>
              </div>
            )}
          />

          <Link
            href="/auth?mode=forgot"
            className="text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            Forgot Password
          </Link>
        </motion.div>
      </div>

      <motion.div {...stagger(3)} className="w-full">
        <Button
          type="button"
          onClick={handleSubmit(handleLogin)}
          disabled={isSubmitting}
          className="h-11 w-full rounded-sm text-sm"
        >
          {isSubmitting ? "Signing In..." : "Sign In"}
          {!isSubmitting && <ArrowRight className="size-4" />}
        </Button>
      </motion.div>

      <CompleteIdentityModal
        open={step === "identity"}
        onSaved={handleIdentitySaved}
      />
    </div>
  )
}

export default LoginForm
