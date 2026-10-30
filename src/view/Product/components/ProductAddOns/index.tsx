import { Building2 } from "lucide-react"
import { getAddOnUnit, ICONS } from "@/helper/product"

type AddOn = {
  name: string
  price: string
  icon: string
  unit?: string
}

interface ProductAddOnsProps {
  addOns: AddOn[]
}

const ProductAddOns = ({ addOns }: ProductAddOnsProps) => {
  if (!addOns.length) return null

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold">Add Ons</h2>
      <p className="text-sm text-neutral-500">
        Enhance your booking experience with a variety of add-ons, including
        catering, equipment rentals, and personalized services.
      </p>
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {addOns.map((a) => {
          const Icon = ICONS[a.icon] ?? Building2
          return (
            <li
              key={a.name}
              className="rounded-lg border border-neutral-200 p-3.5"
            >
              <Icon size={22} strokeWidth={1.5} className="text-neutral-800" />
              <p className="mt-3 text-[11px] text-neutral-600">{a.name}</p>
              <p className="text-sm font-semibold">{a.price}</p>
              <p className="text-[10px] text-neutral-400">/{getAddOnUnit(a)}</p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default ProductAddOns
