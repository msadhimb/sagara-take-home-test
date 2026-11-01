"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { format } from "date-fns"
import { CalendarDays, Clock, MapPin, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { formatCurrency } from "@/helper/formatCurrency"
import { formatDateLong } from "@/helper/formatDate"
import { formatTimeRange } from "@/helper/formatTimeRange"
import { useAuthStore } from "@/view/Auth/store"
import HandShakeBg from "@/components/Icons/HandShakeBg"

const BookingSuccessView = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const user = useAuthStore((state) => state.user)
  const reference = searchParams.get("ref")

  const booking =
    user?.bookings.find((item) => item.reference === reference) ??
    user?.bookings[0] ??
    null

  useEffect(() => {
    if (!user) {
      const next = reference
        ? `/booking/success?ref=${encodeURIComponent(reference)}`
        : "/booking/success"
      router.replace(`/auth?mode=login&next=${encodeURIComponent(next)}`)
      return
    }

    if (!booking) router.replace("/my-booking")
  }, [user, booking, reference, router])

  if (!user || !booking) return null

  const addOnTotal = booking.addOns.reduce((sum, addOn) => sum + addOn.qty, 0)

  return (
    <div className="container mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <div className="flex flex-col items-center gap-5 text-center">
        <HandShakeBg />
        <h1 className="mt-4 text-2xl font-bold text-primary sm:text-3xl">
          Your booking is confirmed!
        </h1>
      </div>

      <div className="mt-8 rounded-xl border border-neutral-200 bg-white p-5">
        <div className="flex flex-wrap items-start gap-4">
          <img
            src={booking.product.image}
            alt={booking.product.name}
            className="size-20 shrink-0 rounded-lg object-cover"
          />
          <div className="min-w-0 flex-1">
            <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
              Confirmed
            </span>
            <h2 className="mt-1 truncate text-lg font-semibold text-neutral-900">
              {booking.product.name}
            </h2>
            <p className="flex items-center gap-1.5 text-sm text-neutral-600">
              <MapPin className="size-3.5" aria-hidden />
              {booking.product.location.name}
            </p>
            <p className="flex items-center gap-1.5 text-sm text-neutral-600">
              <Users className="size-3.5" aria-hidden />
              {booking.product.people} people
            </p>
          </div>
        </div>

        <Separator className="my-4" />

        <dl className="grid gap-4 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-xs text-neutral-500">Date</dt>
            <dd className="mt-0.5 flex items-center gap-1.5 font-medium text-neutral-900">
              <CalendarDays className="size-3.5 text-primary" aria-hidden />
              {formatDateLong(booking.date)}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-neutral-500">Time</dt>
            <dd className="mt-0.5 flex items-center gap-1.5 font-medium text-neutral-900">
              <Clock className="size-3.5 text-primary" aria-hidden />
              {formatTimeRange(booking.start, booking.end)}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-neutral-500">Booked on</dt>
            <dd className="mt-0.5 font-medium text-neutral-900">
              {format(new Date(booking.createdAt), "dd MMM yyyy, HH:mm")}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-neutral-500">Total payment</dt>
            <dd className="mt-0.5 font-semibold text-neutral-900">
              {formatCurrency(booking.total)}
            </dd>
          </div>
        </dl>

        {booking.addOns.length > 0 ? (
          <div className="mt-4 rounded-lg bg-neutral-50 p-3 text-sm">
            <p className="text-xs text-neutral-500">
              Add-ons ({addOnTotal} items)
            </p>
            <ul className="mt-1 space-y-1">
              {booking.addOns.map((addOn) => (
                <li
                  key={addOn.id}
                  className="flex items-center justify-between gap-3 text-neutral-700"
                >
                  <span className="min-w-0 truncate">
                    {addOn.name} × {addOn.qty}
                  </span>
                  <span className="shrink-0">
                    {formatCurrency(addOn.amount)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {booking.additionalRequest ? (
          <div className="mt-4 text-sm">
            <p className="text-xs text-neutral-500">Additional request</p>
            <p className="mt-0.5 text-neutral-700">
              {booking.additionalRequest}
            </p>
          </div>
        ) : null}
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Button asChild className="h-11 flex-1">
          <Link href="/my-booking">View Booking</Link>
        </Button>
        <Button asChild variant="outline" className="h-11 flex-1">
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  )
}

export default BookingSuccessView
