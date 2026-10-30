import { CalendarDays } from "lucide-react"
import { formatDate } from "@/helper/formatDate"
import type { DateRange } from "react-day-picker"

interface ProductBookingCardProps {
  date?: Date | DateRange
  onBook?: () => void
}

const ProductBookingCard = ({ date, onBook }: ProductBookingCardProps) => {
  let dateText = ""
  if (date instanceof Date) {
    dateText = formatDate(date)
  } else if (date && typeof date === "object" && "from" in date && date.from) {
    dateText = date.to
      ? `${formatDate(date.from)} - ${formatDate(date.to)}`
      : formatDate(date.from)
  }

  return (
    <aside className="lg:sticky lg:top-6 lg:self-start">
      <div className="rounded-xl bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.12)]">
        {dateText ? (
          <p className="flex items-center gap-2 text-sm text-neutral-700">
            <CalendarDays size={15} className="text-[#862d30]" /> {dateText}
          </p>
        ) : (
          <p className="text-sm text-neutral-600">Select date to Book</p>
        )}
        <button
          onClick={onBook}
          disabled={!dateText}
          className="mt-4 w-full rounded-md bg-[#862d30] py-2.5 text-sm font-medium text-white transition enabled:hover:bg-[#6f2427] disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:text-neutral-400"
        >
          Book
        </button>
      </div>
    </aside>
  )
}

export default ProductBookingCard
