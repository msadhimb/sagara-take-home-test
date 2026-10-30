import { Building2, Layers, MapPin, Ruler, Star, Users } from "lucide-react"
import { products } from "@/data/products"

type Product = (typeof products)[number]

interface ProductHeaderProps {
  product: Product
}

const ProductHeader = ({ product }: ProductHeaderProps) => {
  const { location } = product

  return (
    <div className="space-y-5">
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-2xl font-semibold tracking-tight">
            {product.name}
          </h1>
          <div className="flex shrink-0 items-center gap-1.5 pt-1 text-sm font-medium">
            <Star size={15} className="fill-amber-400 text-amber-400" />
            {product.rating}/5
          </div>
        </div>

        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-medium ${product.badgeClass}`}
        >
          <Building2 size={11} /> {product.type}
        </span>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-neutral-600">
        <span className="flex items-center gap-2">
          <MapPin size={16} className="text-neutral-500" />
          {location.name}
        </span>
        <span className="flex items-center gap-4 rounded-full border border-neutral-200 px-4 py-1.5 text-[11px] text-neutral-600">
          <span className="flex items-center gap-1.5">
            <Users size={13} /> {product.people}
          </span>
          <span className="flex items-center gap-1.5">
            <Ruler size={13} /> {product.area}
          </span>
          <span className="flex items-center gap-1.5">
            <Layers size={13} /> {product.floor}
          </span>
        </span>
      </div>
    </div>
  )
}

export default ProductHeader
