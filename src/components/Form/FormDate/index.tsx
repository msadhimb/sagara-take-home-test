"use client"

import { useEffect, useState, type ReactNode } from "react"
import { id as idLocale } from "date-fns/locale"
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
  id?: string
  label?: string
  required?: boolean
  description?: string
  error?: string
  containerClassName?: string
  disabled?: boolean
  disabledDates?: Matcher | Matcher[]
  mode: "single" | "range"
  value?: Date | DateRange
  onChange?: (value: Date | DateRange | undefined) => void
  placeholder?: string
  icon?: ReactNode
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
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)")
    const update = () => setIsMobile(query.matches)
    update()
    query.addEventListener("change", update)
    return () => query.removeEventListener("change", update)
  }, [])

  const rangeValue = value instanceof Date ? undefined : value

  let displayText: string | undefined
  if (mode === "range") {
    const { from, to } = rangeValue ?? {}
    if (from && to) displayText = `${formatDate(from)} – ${formatDate(to)}`
    else if (from) displayText = `${formatDate(from)} – …`
  } else if (value instanceof Date) {
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
              "w-full justify-start gap-2 rounded-sm bg-white px-2 py-5 text-base font-normal shadow-none hover:bg-white",
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

        <PopoverContent
          align="start"
          className="max-h-[calc(100dvh-2rem)] w-auto max-w-[calc(100vw-2rem)] overflow-y-auto p-0"
        >
          {mode === "range" ? (
            <Calendar
              mode="range"
              numberOfMonths={isMobile ? 1 : 2}
              locale={idLocale}
              selected={rangeValue}
              defaultMonth={rangeValue?.from}
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
              selected={value instanceof Date ? value : undefined}
              defaultMonth={value instanceof Date ? value : undefined}
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
