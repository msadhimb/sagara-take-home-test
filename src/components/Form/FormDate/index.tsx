"use client"

import { useEffect, useState, type ReactNode } from "react"
import { addDays, differenceInCalendarDays, startOfToday } from "date-fns"
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
import { formatDate, parseDateValue } from "@/helper/formatDate"

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
  value?: Date | DateRange | string
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
  const rangeValue =
    typeof value === "string" || value instanceof Date ? undefined : value
  const singleValue =
    typeof value === "string" || value instanceof Date
      ? parseDateValue(value)
      : undefined

  const [open, setOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [draft, setDraft] = useState<DateRange | undefined>(undefined)
  const [month, setMonth] = useState<Date>(() => new Date())

  const activeDays =
    draft?.from && draft.to
      ? differenceInCalendarDays(draft.to, draft.from) + 1
      : undefined

  const getDisplayText = () => {
    if (mode === "range") {
      if (rangeValue?.from && rangeValue.to) {
        return `${formatDate(rangeValue.from)} – ${formatDate(rangeValue.to)}`
      }
      if (rangeValue?.from) return `${formatDate(rangeValue.from)} – …`

      return ""
    }

    return formatDate(singleValue)
  }

  const displayText = getDisplayText()

  const handleOpenChange = (next: boolean) => {
    if (next && mode === "range") {
      setDraft(rangeValue)
      setMonth(rangeValue?.from ?? new Date())
    }
    setOpen(next)
  }

  const applyPreset = (days: number) => {
    const from = draft?.from ?? startOfToday()
    setDraft({ from, to: addDays(from, days - 1) })
    setMonth(from)
  }

  const handleConfirm = () => {
    if (!draft?.from) return
    onChange?.({ from: draft.from, to: draft.to ?? draft.from })
    setOpen(false)
  }

  const handleSingleSelect = (date: Date | undefined) => {
    onChange?.(date)
    if (date) setOpen(false)
  }

  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)")
    const update = () => setIsMobile(query.matches)
    update()
    query.addEventListener("change", update)
    return () => query.removeEventListener("change", update)
  }, [])

  return (
    <FormField
      id={id}
      label={label}
      required={required}
      description={description}
      error={error}
      containerClassName={containerClassName}
    >
      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            type="button"
            variant="outline"
            disabled={disabled}
            className={cn(
              "w-full justify-start gap-2 rounded-sm bg-white px-2 py-5 text-base font-normal text-neutral-900 shadow-none hover:bg-white hover:text-neutral-900",
              "focus:ring-[3px] focus:ring-primary data-[state=open]:ring-[3px] data-[state=open]:ring-primary",
              !displayText &&
                "text-muted-foreground hover:text-muted-foreground"
            )}
          >
            {icon && icon}
            <span className="truncate text-sm">
              {displayText || placeholder}
            </span>
          </Button>
        </PopoverTrigger>

        <PopoverContent
          align="start"
          className="max-h-[calc(100dvh-2rem)] w-auto max-w-[calc(100vw-2rem)] overflow-y-auto p-0"
        >
          {mode === "range" ? (
            <>
              <Calendar
                mode="range"
                numberOfMonths={isMobile ? 1 : 2}
                locale={idLocale}
                selected={draft}
                month={month}
                onMonthChange={setMonth}
                disabled={disabledDates}
                onSelect={setDraft}
              />

              <div className="flex flex-col gap-3 border-t border-neutral-100 bg-neutral-50/70 p-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap gap-2">
                  {[1, 7, 14, 30].map((days) => (
                    <Button
                      key={days}
                      type="button"
                      size="sm"
                      variant={activeDays === days ? "default" : "outline"}
                      aria-pressed={activeDays === days}
                      onClick={() => applyPreset(days)}
                      className={cn(
                        "h-7 rounded-full px-3 text-xs font-medium shadow-none",
                        activeDays !== days &&
                          "bg-white text-neutral-700 hover:bg-white hover:text-primary"
                      )}
                    >
                      {days} day
                    </Button>
                  ))}
                </div>

                <Button
                  type="button"
                  size="sm"
                  disabled={!draft?.from}
                  onClick={handleConfirm}
                >
                  Select date
                </Button>
              </div>
            </>
          ) : (
            <Calendar
              mode="single"
              locale={idLocale}
              captionLayout="dropdown"
              startMonth={new Date(1940, 0)}
              endMonth={new Date()}
              selected={singleValue}
              defaultMonth={singleValue}
              disabled={disabledDates}
              onSelect={handleSingleSelect}
            />
          )}
        </PopoverContent>
      </Popover>
    </FormField>
  )
}

export default FormDate
