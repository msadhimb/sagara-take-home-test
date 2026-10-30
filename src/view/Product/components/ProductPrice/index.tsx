import { Separator } from "@/components/ui/separator"
import { sortOtherPrices } from "@/helper/product"

type PriceItem = {
  period: string
  price: string
  oldPrice?: string
  badge?: string
}

interface ProductPriceProps {
  prices: PriceItem[]
}

const ProductPrice = ({ prices }: ProductPriceProps) => {
  const [primary] = prices
  const otherPrices = sortOtherPrices(prices)

  return (
    <div className="space-y-1">
      <h2 className="text-lg font-semibold">Price</h2>
      <div className="space-y-3 rounded-xl border border-[#862d30]/15 bg-linear-to-br from-[#862d30]/4 to-transparent p-4">
        <div className="flex items-center justify-between gap-3">
          <p className="flex flex-wrap items-baseline gap-x-2 text-sm text-neutral-600">
            {primary.period}
            <span className="text-base font-semibold text-[#862d30]">
              {primary.price}
            </span>
            {primary.oldPrice && (
              <span className="text-xs text-neutral-400 line-through">
                {primary.oldPrice}
              </span>
            )}
          </p>
          {primary.badge && (
            <span className="shrink-0 rounded-full bg-emerald-100 px-3 py-0.5 text-[11px] font-medium text-emerald-700">
              {primary.badge}
            </span>
          )}
        </div>
        <Separator />
        <dl className="grid grid-cols-[64px_1fr] gap-2 text-xs">
          {otherPrices.map((p) => (
            <div key={p.period} className="contents">
              <dt className="text-neutral-500">{p.period}</dt>
              <dd className="font-semibold text-[#862d30]">{p.price}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}

export default ProductPrice
