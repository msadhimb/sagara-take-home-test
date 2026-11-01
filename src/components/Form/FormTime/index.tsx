"use client"

import { useState, type ReactNode } from "react"
import { ChevronDown, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { FormField } from "../"
import TimeWheel from "./components/TimeWheel"

const pad = (value: number) => String(value).padStart(2, "0")
const formatTime = (date?: Date) =>
  date instanceof Date
    ? `${pad(date.getHours())}:${pad(date.getMinutes())}`
    : ""

const toMinutes = (date: Date) => date.getHours() * 60 + date.getMinutes()

const withTime = (base: Date | undefined, hour: number, minute: number) => {
  const next = new Date(base instanceof Date ? base : new Date())
  next.setHours(hour, minute, 0, 0)
  return next
}

export interface TimeRange {
  from?: Date
  to?: Date
}

interface FormTimeBaseProps {
  id?: string
  label?: string
  required?: boolean
  description?: string
  error?: string
  containerClassName?: string
  disabled?: boolean
  placeholder?: string
  icon?: ReactNode
}

interface FormTimeSingleProps extends FormTimeBaseProps {
  mode?: "single"
  value?: Date
  onChange?: (value: Date | undefined) => void
}

interface FormTimeRangeProps extends FormTimeBaseProps {
  mode: "range"
  value?: TimeRange
  onChange?: (value: TimeRange | undefined) => void
}

export type FormTimeProps = FormTimeSingleProps | FormTimeRangeProps

const FormTime = (props: FormTimeProps) => {
  const {
    id,
    label,
    required,
    description,
    error,
    containerClassName,
    disabled,
    placeholder = "Pilih waktu",
    icon,
  } = props
  const [open, setOpen] = useState(false)

  let displayText: string | undefined
  if (props.mode === "range") {
    const from = formatTime(props.value?.from)
    const to = formatTime(props.value?.to)
    if (from || to) displayText = `${from || "--:--"} - ${to || "--:--"}`
  } else {
    displayText = formatTime(props.value) || undefined
  }

  const handleRangeChange = (
    type: "from" | "to",
    hour: number,
    minute: number
  ) => {
    if (props.mode !== "range") return
    const current = props.value ?? {}
    const changed = withTime(current[type], hour, minute)
    const next: TimeRange = { ...current, [type]: changed }

    // Jam selesai tidak boleh lebih awal dari jam mulai
    if (next.from && next.to && toMinutes(next.to) < toMinutes(next.from)) {
      if (type === "from") next.to = withTime(next.to, hour, minute)
      else
        next.to = withTime(
          next.to,
          next.from.getHours(),
          next.from.getMinutes()
        )
    }

    props.onChange?.(next)
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
              "w-full justify-between gap-2 rounded-sm bg-white px-3 py-5 text-base font-normal shadow-none hover:bg-white",
              "focus:ring-[3px] focus:ring-primary data-[state=open]:ring-[3px] data-[state=open]:ring-primary",
              !displayText &&
                "text-muted-foreground hover:text-muted-foreground"
            )}
          >
            <span className="flex min-w-0 items-center gap-2">
              {icon ?? (
                <Clock className="size-4 shrink-0 text-muted-foreground" />
              )}
              <span
                className={cn(
                  "truncate text-sm",
                  displayText && "font-medium text-neutral-900 tabular-nums"
                )}
              >
                {displayText ?? placeholder}
              </span>
            </span>
            <ChevronDown
              className={cn(
                "size-4 shrink-0 text-muted-foreground transition-transform duration-200",
                open && "rotate-180"
              )}
            />
          </Button>
        </PopoverTrigger>

        <PopoverContent
          align="start"
          sideOffset={6}
          className="w-auto max-w-[calc(100vw-2rem)] overflow-hidden rounded-xl border-neutral-200 p-0 shadow-xl"
        >
          {props.mode === "range" ? (
            <div className="flex flex-col sm:flex-row sm:divide-x sm:divide-neutral-100">
              <TimeWheel
                label="Mulai"
                value={props.value?.from}
                onChange={(h, m) => handleRangeChange("from", h, m)}
              />
              <TimeWheel
                label="Selesai"
                value={props.value?.to}
                onChange={(h, m) => handleRangeChange("to", h, m)}
              />
            </div>
          ) : (
            <TimeWheel
              value={props.value}
              onChange={(h, m) => props.onChange?.(withTime(props.value, h, m))}
            />
          )}

          <div className="flex justify-end border-t border-neutral-100 bg-neutral-50/70 px-3 py-2">
            <Button type="button" size="sm" onClick={() => setOpen(false)}>
              Selesai
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </FormField>
  )
}

export default FormTime
