"use client"

import { useForm, Controller } from "react-hook-form"
import type { DateRange } from "react-day-picker"
import { Button } from "@/components/ui/button"
import FormDate from "@/components/Form/FormDate"
import FormDropdown from "@/components/Form/FormDropdown"
import { Building2, Calendar, MapPin } from "lucide-react"

type WorkspaceOption = {
  value: string
  label: string
}

type HeroFormValues = {
  city: string
  date?: DateRange
  workspace?: string[]
}

const workspaceOptions: WorkspaceOption[] = [
  { value: "private-office", label: "Private Office" },
  { value: "meeting-room", label: "Meeting Room" },
  { value: "virtual-office", label: "Virtual Office" },
  { value: "coworking", label: "Coworking" },
]

const HeroForm = () => {
  const { control, handleSubmit } = useForm<HeroFormValues>({
    mode: "onChange",
    defaultValues: {
      city: "",
      date: undefined,
      workspace: undefined,
    },
  })

  const onSubmit = (values: HeroFormValues) => {
    console.log(values)
  }

  return (
    <div className="relative flex w-full max-w-full flex-col gap-4 overflow-hidden rounded-3xl border border-primary/20 bg-white/70 p-5 shadow-2xl shadow-primary/15 backdrop-blur-xl sm:max-w-140 sm:gap-5 sm:p-6 md:p-8">
      <div className="absolute inset-x-0 top-0 h-1.5 bg-primary" aria-hidden />
      <div
        className="pointer-events-none absolute -top-16 -right-16 size-48 rounded-full bg-primary/15 blur-3xl"
        aria-hidden
      />

      <div className="relative flex flex-col gap-1.5">
        <h1 className="text-2xl font-bold tracking-tight text-primary sm:text-3xl">
          Find Your Spaces
        </h1>
        <p className="text-sm text-neutral-600">
          Isi data singkat di bawah, kami carikan ruang yang cocok untukmu.
        </p>
      </div>

      <div className="h-px w-full bg-primary/15" />

      <div className="relative flex flex-col gap-4">
        <Controller
          name="city"
          control={control}
          render={({ field }) => (
            <FormDropdown
              {...field}
              label="Select City"
              placeholder="Pilih City"
              options={[
                { value: "jakarta", label: "Jakarta" },
                { value: "bandung", label: "Bandung" },
                { value: "surabaya", label: "Surabaya" },
                { value: "yogyakarta", label: "Yogyakarta" },
              ]}
              icon={<MapPin size={15} className="text-primary" />}
            />
          )}
        />

        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <FormDate
              {...field}
              label="Select Date"
              mode="range"
              placeholder="Pilih tanggal"
              icon={<Calendar size={15} className="text-primary" />}
            />
          )}
        />

        <Controller
          name="workspace"
          control={control}
          render={({ field }) => (
            <FormDropdown
              {...field}
              label="Jenis Workspace"
              placeholder="Pilih workspace"
              options={workspaceOptions}
              icon={<Building2 size={15} className="text-primary" />}
              checkboxes
            />
          )}
        />
      </div>

      <Button
        type="button"
        size="lg"
        onClick={handleSubmit(onSubmit)}
        className="mt-1 h-12 w-full rounded-xl bg-primary text-base font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-all hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-xl focus-visible:ring-primary/40 active:translate-y-0"
      >
        Cari ruang
      </Button>
    </div>
  )
}

export default HeroForm
