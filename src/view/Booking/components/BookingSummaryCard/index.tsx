import { CalendarDays, Clock, Users } from "lucide-react"
import type { Product } from "@/data/products"
import { formatDateLong } from "@/helper/formatDate"
import { formatTimeRange } from "@/helper/formatTimeRange"
import { cn } from "@/lib/utils"

interface BookingSummaryCardProps {
  product: Product
  date: string
  start: string
  end: string
}

const BookingSummaryCard = ({
  product,
  date,
  start,
  end,
}: BookingSummaryCardProps) => {
  return (
    <section className="rounded-xl bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-5 sm:flex-row">
        <img
          src={product.image}
          alt={product.name}
          className="h-40 w-full shrink-0 rounded-sm object-cover sm:h-36 sm:w-36"
        />

        <div className="flex min-w-0 flex-1 flex-col justify-between gap-4">
          <div className="space-y-3">
            <h2 className="truncate text-lg font-medium text-neutral-800">
              {product.name}
            </h2>
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full bg-pink-100 px-3 py-2 text-xs font-medium text-pink-800",
                product.badgeClass
              )}
            >
              {product.type}
            </span>
          </div>

          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-neutral-500">
            <li className="flex items-center gap-1.5">
              <Users size={14} aria-hidden />
              {product.people} People
            </li>
            <li className="flex items-center gap-1.5">
              <CalendarDays size={14} aria-hidden />
              {formatDateLong(date)}
            </li>
            <li className="flex items-center gap-1.5">
              <Clock size={14} aria-hidden />
              {formatTimeRange(start, end)}
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default BookingSummaryCard
