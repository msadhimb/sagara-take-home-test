"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface FormOtpProps {
  value: string
  onChange: (value: string) => void
  onComplete?: (value: string) => void
  error?: string | null
  disabled?: boolean
  length?: number
  autoFocus?: boolean
  className?: string
}

const toDigits = (value: string, length: number) =>
  Array.from({ length }, (_, index) => value[index] ?? "")

const FormOtp = ({
  value,
  onChange,
  onComplete,
  error,
  disabled = false,
  length = 6,
  autoFocus = true,
  className,
}: FormOtpProps) => {
  const inputsRef = React.useRef<Array<HTMLInputElement | null>>([])
  const [digits, setDigits] = React.useState<string[]>(() =>
    toDigits(value, length)
  )

  // Keep the internal slots in sync when the code is changed from outside
  // (for example when the parent clears the boxes after a resend).
  React.useEffect(() => {
    setDigits((current) => {
      const next = toDigits(value, length)

      if (current.join("") === next.join("")) return current

      return next
    })
  }, [value, length])

  const focusAt = (index: number) => {
    const target = Math.min(Math.max(index, 0), length - 1)
    inputsRef.current[target]?.focus()
    inputsRef.current[target]?.select()
  }

  const emit = (next: string[]) => {
    const joined = next.join("")
    const wasComplete = digits.every((digit) => digit !== "")

    onChange(joined)

    if (!wasComplete && next.every((digit) => digit !== "")) {
      onComplete?.(joined)
    }
  }

  const handleChange = (index: number, raw: string) => {
    if (disabled) return

    const digit = raw.replace(/\D/g, "").slice(-1)
    const next = [...digits]
    next[index] = digit

    setDigits(next)
    emit(next)

    if (digit && index < length - 1) {
      focusAt(index + 1)
    }
  }

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Backspace" && !digits[index]) {
      event.preventDefault()

      if (index === 0) return

      const next = [...digits]
      next[index - 1] = ""
      setDigits(next)
      emit(next)
      focusAt(index - 1)
      return
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault()
      focusAt(index - 1)
      return
    }

    if (event.key === "ArrowRight") {
      event.preventDefault()
      focusAt(index + 1)
      return
    }

    if (event.key === "Delete") {
      event.preventDefault()

      const next = [...digits]
      next[index] = ""
      setDigits(next)
      emit(next)
    }
  }

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    if (disabled) return

    event.preventDefault()

    const pasted = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, length)

    if (!pasted) return

    const next = toDigits(pasted, length)
    setDigits(next)
    emit(next)
    focusAt(pasted.length - 1)
  }

  return (
    <div
      role="group"
      aria-label="Verification code"
      className={cn("flex items-center justify-center gap-2", className)}
    >
      {Array.from({ length }, (_, index) => (
        <input
          key={index}
          ref={(node) => {
            inputsRef.current[index] = node
          }}
          value={digits[index] ?? ""}
          onChange={(event) => handleChange(index, event.target.value)}
          onKeyDown={(event) => handleKeyDown(index, event)}
          onPaste={handlePaste}
          onFocus={(event) => event.target.select()}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          autoComplete={index === 0 ? "one-time-code" : "off"}
          autoFocus={autoFocus && index === 0}
          disabled={disabled}
          aria-label={`Digit ${index + 1} of ${length}`}
          aria-invalid={Boolean(error)}
          className={cn(
            "size-18 shrink-0 rounded-md border bg-white text-center text-xl font-bold text-neutral-900 caret-primary transition-colors outline-none",
            "focus:border-primary focus:ring-1 focus:ring-primary/30",
            "disabled:cursor-not-allowed disabled:opacity-60",
            error ? "border-destructive" : "border-neutral-200"
          )}
        />
      ))}
    </div>
  )
}

export default FormOtp
