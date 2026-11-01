import { Suspense } from "react"
import BookingView from "@/view/Booking"

const BookingPage = () => {
  return (
    <div className="min-h-screen bg-neutral-50">
      <Suspense
        fallback={
          <div className="container mx-auto max-w-6xl px-4 py-8 sm:px-6">
            <div className="h-8 w-56 animate-pulse rounded bg-neutral-200" />
          </div>
        }
      >
        <BookingView />
      </Suspense>
    </div>
  )
}

export default BookingPage
