"use client"

import { notFound, useParams, useRouter } from "next/navigation"
import { useState } from "react"
import type { DateRange } from "react-day-picker"
import { products } from "@/data/products"
import { toIsoDate } from "@/helper/formatDate"
import { formatClock } from "@/helper/formatTime"
import type { TimeRange } from "@/components/Form/FormTime"
import ProductDateSelect from "./components/ProductDateSelect"
import ProductGallery from "./components/ProductGallery"
import ProductHeader from "./components/ProductHeader"
import ProductPrice from "./components/ProductPrice"
import ProductDetails from "./components/ProductDetails"
import ProductAddOns from "./components/ProductAddOns"
import ProductLocation from "./components/ProductLocation"
import ProductBookingCard from "./components/ProductBookingCard"
import SimilarSpaces from "./components/SimilarSpaces"
import PhotoGalleryModal from "./components/PhotoGalleryModal"
import { Separator } from "@/components/ui/separator"
import { useAuthStore } from "@/view/Auth/store"

const ProductView = () => {
  const images = [
    "/assets/spaces/image-1.png",
    "/assets/spaces/image-2.png",
    "/assets/spaces/image-3.png",
    "/assets/spaces/image-4.png",
    "/assets/spaces/image-5.png",
    "/assets/spaces/image-6.png",
  ]
  const params = useParams()
  const router = useRouter()
  const user = useAuthStore((state) => state.user)
  const slug = params?.slug

  const [date, setDate] = useState<Date | DateRange | undefined>(undefined)
  const [time, setTime] = useState<TimeRange | undefined>(undefined)
  const [galleryOpen, setGalleryOpen] = useState(false)
  const [galleryStart, setGalleryStart] = useState<number | null>(null)
  const [gallerySession, setGallerySession] = useState(0)

  const product = products.find((p) => p.slug === slug)

  if (!product) notFound()

  const similar = products.filter((p) => p.slug !== slug).slice(0, 4)
  const prices = product.prices

  const startTime = time?.from
  const endTime = time?.to

  const handleOpenGallery = (index: number | null) => {
    setGalleryStart(index)
    setGallerySession((session) => session + 1)
    setGalleryOpen(true)
  }

  const handleCloseGallery = () => {
    setGalleryOpen(false)
  }

  const handleBook = () => {
    const bookingDate = date instanceof Date ? date : date?.from

    if (!bookingDate || !startTime || !endTime) return

    const searchParams = new URLSearchParams({
      productId: product.id,
      date: toIsoDate(bookingDate),
      start: formatClock(startTime),
      end: formatClock(endTime),
    })
    const next = `/booking?${searchParams.toString()}`

    if (!user) {
      router.push(`/auth?mode=login&next=${encodeURIComponent(next)}`)
      return
    }

    router.push(next)
  }

  return (
    <div className="space-y-5 bg-white text-neutral-900">
      <ProductDateSelect
        date={date}
        onDateChange={setDate}
        time={time}
        onTimeChange={setTime}
      />

      <ProductGallery
        images={images}
        productName={product.name}
        onOpenGallery={handleOpenGallery}
      />

      <div className="container mx-auto grid gap-10 px-4 py-8 sm:px-6 lg:grid-cols-5">
        <div className="col-span-3 min-w-0 space-y-5">
          <ProductHeader product={product} />
          <ProductPrice prices={prices} />
          <Separator />
          <ProductDetails description={product.description} />
          <Separator />
          <ProductAddOns addOns={product.addOns} />
        </div>
        <div className="col-span-2">
          <ProductBookingCard
            date={date}
            startTime={startTime}
            endTime={endTime}
            isAuthenticated={Boolean(user)}
            onBook={handleBook}
          />
        </div>
      </div>

      <div className="container mx-auto space-y-5">
        <Separator />
        <ProductLocation location={product.location} />
      </div>

      <SimilarSpaces similar={similar} />

      <PhotoGalleryModal
        key={gallerySession}
        images={images}
        title={product.name}
        open={galleryOpen}
        startIndex={galleryStart}
        onClose={handleCloseGallery}
      />
    </div>
  )
}

export default ProductView
