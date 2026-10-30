"use client"

import { notFound, useParams } from "next/navigation"
import { useState } from "react"
import type { DateRange } from "react-day-picker"
import { products } from "@/data/products"
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

const ProductView = () => {
  const params = useParams<{ slug: string }>()
  const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug

  const product = products.find((p) => p.slug === slug)
  const similar = products.filter((p) => p.slug !== slug).slice(0, 4)

  const [date, setDate] = useState<Date | DateRange | undefined>(undefined)
  const [galleryOpen, setGalleryOpen] = useState(false)
  const [galleryStart, setGalleryStart] = useState<number | null>(null)
  const [gallerySession, setGallerySession] = useState(0)

  const images = [
    "/assets/spaces/image-1.png",
    "/assets/spaces/image-2.png",
    "/assets/spaces/image-3.png",
    "/assets/spaces/image-4.png",
    "/assets/spaces/image-5.png",
    "/assets/spaces/image-6.png",
  ]

  if (!product) notFound()

  const prices = product.prices

  const handleOpenGallery = (index: number | null) => {
    setGalleryStart(index)
    setGallerySession((session) => session + 1)
    setGalleryOpen(true)
  }

  const handleCloseGallery = () => {
    setGalleryOpen(false)
  }

  return (
    <div className="space-y-5 bg-white text-neutral-900">
      <ProductDateSelect date={date} onDateChange={setDate} />

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
          <ProductBookingCard date={date} />
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
