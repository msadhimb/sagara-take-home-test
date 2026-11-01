import { ChevronRight, Minus, PackagePlus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { ProductAddOn } from "@/data/products"
import { formatCurrency } from "@/helper/formatCurrency"
import { getAddOnUnit } from "@/helper/product"

interface AddOnsSelectorProps {
  addOns: ProductAddOn[]
  selected: Record<string, number>
  onChangeQty: (id: string, qty: number) => void
  onOpenModal: () => void
}

const AddOnsSelector = ({
  addOns,
  selected,
  onChangeQty,
  onOpenModal,
}: AddOnsSelectorProps) => {
  const items = addOns.filter((addOn) => (selected[addOn.id] ?? 0) > 0)

  return (
    <section className="space-y-3">
      <div className="flex flex-col">
        <h2 className="text-lg font-semibold text-neutral-900">Add-ons</h2>
        <p className="text-sm text-neutral-500">
          Catering, equipment, and services for your booking.
        </p>
      </div>

      <Button
        type="button"
        variant="outline"
        className="flex h-auto w-full shrink-0 items-center justify-between p-5"
        onClick={onOpenModal}
      >
        {items.length === 0 ? (
          <div className="flex items-center gap-2">
            <PackagePlus className="size-5" />
            <p className="text-sm text-neutral-500">No add-ons selected yet.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <PackagePlus className="size-5 text-primary" />
              <p className="text-sm text-neutral-500">
                {items.length} {items.length === 1 ? "item" : "items"} selected
              </p>
            </div>
            <div className="space-y-1 px-3">
              {items.map((addOn) => {
                const qty = selected[addOn.id] ?? 0

                return (
                  <p className="truncate text-left text-sm font-medium text-neutral-900">
                    {addOn.name}
                  </p>
                )
              })}
            </div>
          </div>
        )}

        <ChevronRight />
      </Button>
    </section>
  )
}

export default AddOnsSelector
