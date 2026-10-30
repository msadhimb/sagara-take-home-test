"use client"

import { Combobox as ComboboxPrimitive } from "@base-ui/react"
import { ChevronDown, X } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  useComboboxAnchor,
} from "@/components/ui/combobox"
import { FormField, FormFieldBaseProps } from ".."
import FormInput from "../FormInput"

type FormOption = {
  value: string
  label: string
  disabled?: boolean
}

const FormDropdown = ({
  id,
  label,
  required,
  description,
  error,
  containerClassName,
  options,
  placeholder = "Pilih opsi",
  disabled,
  checkboxes,
  value,
  icon,
  onChange,
}: {
  options: FormOption[]
  placeholder?: string
  disabled?: boolean
  mode?: "single" | "checkbox"
  value?: string | string[]
  onChange?(value: string | string[]): void
  icon?: React.ReactNode
  checkboxes?: boolean
} & FormFieldBaseProps) => {
  const anchor = useComboboxAnchor()

  const isCheckbox = checkboxes
  const selectedValues = Array.isArray(value) ? value : []
  const selectedValue = typeof value === "string" ? value : undefined

  const sharedProps = {
    items: options,
    disabled,
    itemToStringLabel: (item: FormOption) => item.label,
    itemToStringValue: (item: FormOption) => item.value,
    isItemEqualToValue: (a: FormOption, b: FormOption) => a.value === b.value,
  }

  const selectedLabels = selectedValues
    .map((v) => options.find((o) => o.value === v)?.label)
    .filter(Boolean)
    .join(", ")

  const field = (
    <div ref={anchor} className="relative">
      <ComboboxPrimitive.Input
        render={
          <FormInput
            bare
            id={id}
            placeholder={isCheckbox && selectedLabels ? undefined : placeholder}
            aria-invalid={!!error}
            className="pr-9"
            icon={icon}
          />
        }
      />
      {isCheckbox && selectedLabels && (
        <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center truncate pl-3 text-sm"
          style={icon ? { paddingLeft: "calc(1rem + 15px)" } : undefined}
        >
          {selectedLabels}
        </span>
      )}
      <ComboboxPrimitive.Trigger
        aria-label="Buka daftar pilihan"
        className="absolute inset-y-0 right-0 flex w-9 items-center justify-center text-muted-foreground transition-colors hover:text-primary"
      >
        <ChevronDown className="size-4" />
      </ComboboxPrimitive.Trigger>
    </div>
  )

  const menu = (
    <ComboboxContent
      anchor={anchor}
      className="rounded-sm shadow-xl shadow-primary/10"
    >
      <ComboboxEmpty>Tidak ada pilihan</ComboboxEmpty>
      <ComboboxList>
        {(option: FormOption) => (
          <ComboboxItem
            key={option.value}
            value={option}
            disabled={option.disabled}
            className={
              isCheckbox
                ? "gap-2 pr-2 data-highlighted:bg-primary/10 data-highlighted:text-foreground not-data-[variant=destructive]:data-highlighted:**:text-white"
                : undefined
            }
          >
            {isCheckbox && (
              <Checkbox
                checked={selectedValues.includes(option.value)}
                disabled={option.disabled}
                tabIndex={-1}
                aria-hidden
                className="pointer-events-none"
              />
            )}
            {option.label}
          </ComboboxItem>
        )}
      </ComboboxList>
    </ComboboxContent>
  )

  return (
    <FormField
      id={id}
      label={label}
      required={required}
      description={description}
      error={error}
      containerClassName={containerClassName}
    >
      {isCheckbox ? (
        <>
          <Combobox
            {...sharedProps}
            multiple
            value={options.filter((option) =>
              selectedValues.includes(option.value)
            )}
            onValueChange={(selected: FormOption[]) =>
              onChange?.(selected.map((option) => option.value))
            }
          >
            {field}
            {menu}
          </Combobox>
        </>
      ) : (
        <Combobox
          {...sharedProps}
          value={
            options.find((option) => option.value === selectedValue) ?? null
          }
          onValueChange={(selected: FormOption | null) => {
            if (selected) onChange?.(selected.value)
          }}
        >
          {field}
          {menu}
        </Combobox>
      )}
    </FormField>
  )
}

export default FormDropdown
