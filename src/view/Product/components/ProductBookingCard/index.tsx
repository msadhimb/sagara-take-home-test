import { CalendarDays, Clock } from "lucide-react"
import { formatDate } from "@/helper/formatDate"
import { formatClock } from "@/helper/formatTime"
import type { DateRange } from "react-day-picker"

interface ProductBookingCardProps {
  date?: Date | DateRange
  startTime?: Date
  endTime?: Date
  isAuthenticated?: boolean
  onBook?: () => void
}

const ProductBookingCard = ({
  date,
  startTime,
  endTime,
  isAuthenticated = true,
  onBook,
}: ProductBookingCardProps) => {
  let dateText = ""
  if (date instanceof Date) {
    dateText = formatDate(date)
  } else if (date && typeof date === "object" && "from" in date && date.from) {
    dateText = date.to
      ? `${formatDate(date.from)} - ${formatDate(date.to)}`
      : formatDate(date.from)
  }

  const start = formatClock(startTime)
  const end = formatClock(endTime)
  const timeText = start && end ? `${start} - ${end}` : ""
  const canBook = Boolean(dateText && timeText && start < end)

  return (
    <aside className="lg:sticky lg:top-6 lg:self-start">
      <div className="rounded-xl bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.12)]">
        {dateText ? (
          <div className="space-y-2 text-sm text-neutral-700">
            <p className="flex items-center gap-2">
              <CalendarDays size={15} className="text-[#862d30]" /> {dateText}
            </p>
            {timeText ? (
              <p className="flex items-center gap-2">
                <Clock size={15} className="text-[#862d30]" /> {timeText}
              </p>
            ) : (
              <p className="text-neutral-600">Select time to Book</p>
            )}
          </div>
        ) : (
          <p className="text-sm text-neutral-600">Select date to Book</p>
        )}
        <button
          onClick={onBook}
          disabled={!canBook}
          className="mt-4 w-full rounded-md bg-[#862d30] py-2.5 text-sm font-medium text-white transition enabled:hover:bg-[#6f2427] disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:text-neutral-400"
        >
          {isAuthenticated ? "Book" : "Login to Book"}
        </button>
      </div>
    </aside>
  )
}

export default ProductBookingCard
