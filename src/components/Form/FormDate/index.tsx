"use client"

import { useState } from "react"
import { id as idLocale } from "date-fns/locale"
import { CalendarIcon, icons } from "lucide-react"
import type { DateRange, Matcher } from "react-day-picker"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { FormField } from "../"
import { formatDate } from "@/helper/formatDate"

interface FormDateProps {
  id?: any
  label?: string
  required?: boolean
  description?: string
  error?: string
  containerClassName?: string
  disabled?: boolean
  disabledDates?: Matcher | Matcher[]
  mode: "single" | "range"
  value?: any
  onChange?: (value: Date | DateRange | undefined) => void
  placeholder?: string
  icon?: any
}

const FormDate = ({
  id,
  label,
  required,
  description,
  error,
  containerClassName,
  placeholder = "Pilih tanggal",
  disabled,
  disabledDates,
  mode,
  value,
  onChange,
  icon,
}: FormDateProps) => {
  const [open, setOpen] = useState(false)

  let displayText: string | undefined
  if (mode === "range") {
    const { from, to } = value ?? {}
    if (from && to) displayText = `${formatDate(from)} – ${formatDate(to)}`
    else if (from) displayText = `${formatDate(from)} – …`
  } else if (value) {
    displayText = formatDate(value)
  }

  return (
    <FormField
      id={id}
      label={label}
      required={required}
      description={description}
      error={error}
      containerClassName={containerClassName}
    >
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            type="button"
            variant="outline"
            disabled={disabled}
            className={cn(
              "text-md w-full justify-start gap-2 rounded-sm bg-white px-2 py-5 font-normal shadow-none hover:bg-white",
              "focus:ring-[3px] focus:ring-primary data-[state=open]:ring-[3px] data-[state=open]:ring-primary",
              !displayText &&
                "text-muted-foreground hover:text-muted-foreground"
            )}
          >
            {icon && icon}
            <span className="truncate text-sm">
              {displayText ?? placeholder}
            </span>
          </Button>
        </PopoverTrigger>

        <PopoverContent align="start" className="w-auto p-0">
          {mode === "range" ? (
            <Calendar
              mode="range"
              numberOfMonths={2}
              locale={idLocale}
              selected={value}
              defaultMonth={value?.from}
              disabled={disabledDates}
              onSelect={(range) => {
                onChange?.(range)
                if (range?.from && range?.to) setOpen(false)
              }}
            />
          ) : (
            <Calendar
              mode="single"
              locale={idLocale}
              selected={value}
              defaultMonth={value}
              disabled={disabledDates}
              onSelect={(date) => {
                onChange?.(date)
                if (date) setOpen(false)
              }}
            />
          )}
        </PopoverContent>
      </Popover>
    </FormField>
  )
}

export default FormDate
