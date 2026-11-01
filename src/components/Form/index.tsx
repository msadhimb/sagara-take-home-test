import * as React from "react"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export type FormFieldBaseProps = {
  id?: string
  label?: string
  required?: boolean
  description?: string
  error?: string
  containerClassName?: string
  labelClassname?: string
}

export const getDescribedBy = (
  id?: string,
  description?: string,
  error?: string
) => {
  if (!id) return undefined
  if (error) return `${id}-error`
  if (description) return `${id}-description`
  return undefined
}

type FormFieldProps = FormFieldBaseProps & {
  children: React.ReactNode
}

export const FormField = ({
  id,
  label,
  required,
  description,
  error,
  containerClassName,
  children,
  labelClassname,
}: FormFieldProps) => {
  return (
    <div className={cn("flex w-full flex-col gap-2", containerClassName)}>
      <Label htmlFor={id} className={cn("gap-0", labelClassname)}>
        {label}
        {required && (
          <span className="text-destructive" aria-hidden>
            *
          </span>
        )}
      </Label>

      {children}

      {error ? (
        <p
          id={id ? `${id}-error` : undefined}
          role="alert"
          className="text-xs text-destructive"
        >
          {error}
        </p>
      ) : description ? (
        <p
          id={id ? `${id}-description` : undefined}
          className="text-xs text-muted-foreground"
        >
          {description}
        </p>
      ) : null}
    </div>
  )
}
