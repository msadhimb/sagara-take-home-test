"use client"

import { Controller, useFormContext } from "react-hook-form"
import { motion, stagger } from "motion/react"
import { Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import FormInput from "@/components/Form/FormInput"
import PasswordChecklist from "../../../RegisterForm/components/PasswordChecklist"
import { useActionModal } from "@/components/ActionModal/store"

const ResetPassword = () => {
  const { openModalActions } = useActionModal()
  const {
    watch,
    handleSubmit,
    control,
    formState: { errors },
  } = useFormContext()

  const handleResetPassword = () => {
    console.log("asu")
    openModalActions({
      success: true,
      descText: "Successfully reset your password!",
      closeButton: false,
      link: {
        text: "Go to Login",
        direct: "/auth?mode=login",
        replace: true,
      },
    })
  }

  console.log(errors)

  return (
    <>
      <div className="flex w-full flex-col items-center gap-15">
        <div className="flex w-full flex-col gap-5">
          <motion.div {...stagger(1)}>
            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <FormInput
                  {...field}
                  label="New Password"
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
          <motion.div {...stagger(1)}>
            <Controller
              control={control}
              name="confirm_password"
              render={({ field }) => (
                <FormInput
                  {...field}
                  label="Retype New Password"
                  type="password"
                  placeholder="********"
                  autoComplete="current-password"
                  required
                  icon={<Lock size={15} />}
                  error={errors?.confirm_password?.message as string}
                />
              )}
            />
            <PasswordChecklist
              password={watch("password")}
              confirmPassword={watch("confirm_password")}
              matchPassword
            />
          </motion.div>
        </div>

        <motion.div {...stagger(3)}>
          <Button
            type="button"
            className="h-11 rounded-sm px-24 text-sm"
            onClick={handleSubmit(handleResetPassword)}
          >
            Save
          </Button>
        </motion.div>
      </div>
    </>
  )
}

export default ResetPassword
