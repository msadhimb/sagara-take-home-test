import * as React from "react"
import { FormField, FormFieldBaseProps } from ".."
import { cn } from "@/lib/utils"
import { Textarea } from "@/components/ui/textarea"

export interface FormTextAreaProps
  extends
    FormFieldBaseProps,
    Omit<React.ComponentProps<"textarea">, "id" | "required"> {
  icon?: React.ReactNode
  bare?: boolean
  labelClassname?: string
}

const FormTextArea = React.forwardRef<HTMLTextAreaElement, FormTextAreaProps>(
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
      rows = 4,
      labelClassname,
      ...textareaProps
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
        labelClassname={labelClassname}
      >
        <div className="relative">
          {icon && (
            <div
              ref={iconRef}
              className="absolute top-3 left-2 text-muted-foreground"
            >
              {icon}
            </div>
          )}
          <Textarea
            id={id}
            required={required}
            rows={rows}
            {...textareaProps}
            ref={ref}
            className={cn(
              "h-32 resize-none rounded-md bg-white px-3 py-3 text-base focus-visible:ring-primary",
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

FormTextArea.displayName = "FormTextArea"

export default FormTextArea
