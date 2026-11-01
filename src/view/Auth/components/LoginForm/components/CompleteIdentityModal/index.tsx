"use client"

import { Controller, useFormContext } from "react-hook-form"
import { BuildingIcon, CalendarIcon, Loader2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { simulateRequest } from "@/lib/auth"
import { cn } from "@/lib/utils"
import FormInput from "@/components/Form/FormInput"
import FormDate from "@/components/Form/FormDate"
import Link from "next/link"

interface CompleteIdentityModalProps {
  open: boolean
  onSaved: () => void
  onSkip?: () => void
}

const formatDateInput = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 8)

  if (digits.length <= 2) return digits
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`

  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`
}

const CompleteIdentityModal = ({
  open,
  onSaved,
  onSkip,
}: CompleteIdentityModalProps) => {
  const {
    watch,
    control,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useFormContext()

  const canSave = watch("dateOfBirth") || watch("companyName")

  const handleSave = async () => {
    try {
      await simulateRequest()
      onSaved()
    } catch {
      setError("companyName", {
        type: "manual",
        message: "Couldn't save your data. Please try again.",
      })
    }
  }

  return (
    <Dialog open={open}>
      <DialogContent
        showCloseButton={false}
        onInteractOutside={(event) => event.preventDefault()}
        onEscapeKeyDown={(event) => event.preventDefault()}
        className="m-0 flex w-full max-w-180 flex-col gap-10 rounded-lg border-none bg-white p-14"
      >
        <div className="flex flex-col gap-2">
          <DialogTitle className="text-2xl font-semibold text-neutral-800">
            Complete your identity
          </DialogTitle>
          <DialogDescription className="text-sm text-neutral-500">
            For better experience complete your identity start from now.
          </DialogDescription>
        </div>

        <div className="flex flex-col gap-5">
          <Controller
            control={control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormDate
                id="dateOfBirth"
                label="Date of Birth"
                placeholder="Pilih Tanggal"
                mode="single"
                value={field.value}
                onChange={field.onChange}
                disabledDates={{ after: new Date() }}
                error={errors?.dateOfBirth?.message as string}
                icon={<CalendarIcon className="size-4" />}
              />
            )}
          />

          <Controller
            control={control}
            name="companyName"
            render={({ field }) => (
              <FormInput
                {...field}
                label="Company Name"
                placeholder="Enter your company name"
                autoComplete="organization"
                error={errors?.companyName?.message as string}
                icon={<BuildingIcon className="size-4" />}
              />
            )}
          />
        </div>

        <div className="flex flex-col gap-4">
          <Button
            type="button"
            onClick={handleSubmit(handleSave)}
            disabled={!canSave}
            aria-busy={isSubmitting}
            className={cn(
              "h-11 w-full rounded-sm text-sm disabled:opacity-100",
              !canSave &&
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
            Save my Data
          </Button>

          <Link
            href="/"
            className="mx-auto text-sm font-medium text-primary underline-offset-4 hover:underline disabled:pointer-events-none disabled:opacity-50"
          >
            Skip for Now
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CompleteIdentityModal
