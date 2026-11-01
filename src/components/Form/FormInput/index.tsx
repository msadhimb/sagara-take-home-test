import * as React from "react"
import { Input } from "@/components/ui/input"
import { FormField, FormFieldBaseProps } from ".."
import { cn } from "@/lib/utils"

interface FormInputProps
  extends
    FormFieldBaseProps,
    Omit<React.ComponentProps<"input">, "id" | "required"> {
  icon?: React.ReactNode
  bare?: boolean
}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      id: explicitId,
      label,
      required,
      description,
      error,
      containerClassName,
      icon,
      bare,
      className,
      style,
      ...inputProps
    },
    ref
  ) => {
    const generatedId = React.useId()
    const id = explicitId || generatedId
    const iconRef = React.useRef<HTMLDivElement>(null)
    const [iconWidth, setIconWidth] = React.useState(0)

    React.useLayoutEffect(() => {
      const el = iconRef.current
      if (!icon || !el) {
        setIconWidth(0)
        return
      }

      setIconWidth(el.offsetWidth)

      const observer = new ResizeObserver(() => setIconWidth(el.offsetWidth))
      observer.observe(el)

      return () => observer.disconnect()
    }, [icon])

    return (
      <FormField
        id={id}
        label={label}
        required={required}
        description={description}
        error={error}
        containerClassName={containerClassName}
      >
        <div className="relative flex items-center">
          {icon && (
            <div
              ref={iconRef}
              className="absolute left-2 text-muted-foreground"
            >
              {icon}
            </div>
          )}
          <Input
            id={id}
            required={required}
            {...inputProps}
            ref={ref}
            className={cn(
              "rounded-sm bg-white px-3 py-5 text-base focus-visible:ring-primary",
              className
            )}
            style={
              icon
                ? { paddingLeft: `calc(1rem + ${iconWidth}px)`, ...style }
                : style
            }
          />
        </div>
      </FormField>
    )
  }
)

FormInput.displayName = "FormInput"

export default FormInput
