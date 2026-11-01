"use client"

import { useState } from "react"
import { Building2, Minus, Plus, X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import type { ProductAddOn } from "@/data/products"
import { formatCurrency } from "@/helper/formatCurrency"
import { getAddOnUnit, ICONS } from "@/helper/product"
import { cn } from "@/lib/utils"

interface AddOnsModalProps {
  addOns: ProductAddOn[]
  initial: Record<string, number>
  onApply: (addOns: Record<string, number>) => void
  onClose: () => void
}

const AddOnsModal = ({
  addOns,
  initial,
  onApply,
  onClose,
}: AddOnsModalProps) => {
  const [draft, setDraft] = useState<Record<string, number>>(initial)

  const setQty = (addOn: ProductAddOn, qty: number) => {
    setDraft((current) => {
      const next = { ...current }

      if (qty <= 0) {
        delete next[addOn.id]
      } else {
        next[addOn.id] = Math.min(qty, addOn.maxQty)
      }

      return next
    })
  }

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) onClose()
      }}
    >
      <DialogContent
        showCloseButton={false}
        className="max-w-[calc(100%-2rem)] gap-5 rounded-2xl p-0 sm:max-w-4xl"
      >
        {/* Header */}
        <DialogHeader className="flex-row items-center justify-between space-y-0 px-6 pt-6 pb-4">
          <DialogTitle className="text-2xl font-semibold text-neutral-700">
            Select Add ons
          </DialogTitle>
          <DialogDescription className="sr-only">
            Select the extras you need and adjust their quantities.
          </DialogDescription>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-sm text-neutral-600 transition-colors hover:text-neutral-900 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
          >
            <X size={28} strokeWidth={1.5} />
          </button>
        </DialogHeader>

        {/* Grid add-ons: urut per kolom (kiri dulu, lalu kanan) */}
        <ul className="grid max-h-[60vh] grid-cols-1 gap-x-8 overflow-y-auto px-4 pb-2 sm:grid-flow-col sm:grid-cols-2 sm:grid-rows-[repeat(5,auto)] sm:px-6">
          {addOns.map((addOn) => {
            const qty = draft[addOn.id] ?? 0
            const checked = qty > 0
            const Icon = ICONS[addOn.icon] ?? Building2

            return (
              <li
                key={addOn.id}
                className="flex items-center gap-3 border-b border-neutral-200 py-4"
              >
                <Checkbox
                  checked={checked}
                  onCheckedChange={(value) => setQty(addOn, value ? 1 : 0)}
                  aria-label={`Select ${addOn.name}`}
                  className="size-5 shrink-0 rounded-[3px] border-primary data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-white"
                />

                <Icon
                  size={28}
                  strokeWidth={1.5}
                  className="shrink-0 text-neutral-900"
                  aria-hidden
                />

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm text-neutral-600">
                    {addOn.name}
                  </p>
                  <p className="text-sm font-semibold text-neutral-900">
                    {formatCurrency(addOn.amount)}
                    <span className="ml-1 text-[10px] font-normal text-neutral-500">
                      /{getAddOnUnit(addOn)}
                    </span>
                  </p>
                </div>

                {/* Stepper */}
                <div className="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    aria-label={`Decrease ${addOn.name}`}
                    disabled={qty <= 0}
                    onClick={() => setQty(addOn, qty - 1)}
                    className={cn(
                      "grid size-5 place-items-center rounded-full text-white transition-colors",
                      qty > 0
                        ? "bg-neutral-400 hover:bg-neutral-500"
                        : "cursor-not-allowed bg-neutral-300"
                    )}
                  >
                    <Minus size={12} strokeWidth={3} />
                  </button>
                  <span className="w-4 text-center text-xs font-medium text-neutral-800 tabular-nums">
                    {qty}
                  </span>
                  <button
                    type="button"
                    aria-label={`Increase ${addOn.name}`}
                    disabled={qty >= addOn.maxQty}
                    onClick={() => setQty(addOn, qty + 1)}
                    className="grid size-5 place-items-center rounded-full bg-primary text-white transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Plus size={12} strokeWidth={3} />
                  </button>
                </div>
              </li>
            )
          })}
        </ul>

        {/* Footer */}
        <div className="flex justify-center px-6 pt-6 pb-6">
          <button
            type="button"
            onClick={() => onApply(draft)}
            className="h-12 w-full max-w-72 rounded-lg bg-primary/10 text-base font-medium text-primary transition-colors hover:bg-primary/20 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
          >
            Save
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AddOnsModal
