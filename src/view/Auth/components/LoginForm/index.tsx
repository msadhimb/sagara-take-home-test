"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { Controller, useFormContext } from "react-hook-form"
import { motion, stagger, useReducedMotion } from "motion/react"
import { ArrowRight, Lock, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import FormInput from "@/components/Form/FormInput"
import { simulateRequest } from "@/lib/auth"
import { useUserStore } from "@/store/user"

const LoginForm = () => {
  const router = useRouter()
  const { login } = useUserStore()
  const { requestProfileCompletion } = useUserStore()

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useFormContext()

  const handleLogin = async (values: any) => {
    await simulateRequest()
    login({
      email: values.email,
      password: values.password,
    })
    requestProfileCompletion()
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

      <motion.div {...stagger(3)}>
        <Button
          type="button"
          onClick={handleSubmit(handleLogin)}
          disabled={isSubmitting}
          className="h-11 rounded-sm px-24 text-sm"
        >
          {isSubmitting ? "Signing In..." : "Sign In"}
          {!isSubmitting && <ArrowRight className="size-4" />}
        </Button>
      </motion.div>
    </div>
  )
}

export default LoginForm
