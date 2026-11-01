import { Suspense } from "react"
import BookingSuccessView from "@/view/BookingSuccess"

const BookingSuccessPage = () => {
  return (
    <div className="min-h-screen bg-neutral-50">
      <Suspense fallback={null}>
        <BookingSuccessView />
      </Suspense>
    </div>
  )
}

export default BookingSuccessPage
