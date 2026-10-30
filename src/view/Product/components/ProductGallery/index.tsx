import Image from "next/image"
import { Grid2x2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProductGalleryProps {
  images: string[]
  productName: string
  onOpenGallery: (index: number | null) => void
}

const ProductGallery = ({
  images,
  productName,
  onOpenGallery,
}: ProductGalleryProps) => {
  const [main, ...rest] = images
  const thumbs = rest.slice(0, 4)

  return (
    <div className="bg-neutral-50 pt-6 pb-8">
      <div className="relative container mx-auto px-4 sm:px-6">
        <div
          className={`grid gap-3 ${
            thumbs.length ? "md:grid-cols-[2.1fr_1fr]" : "grid-cols-1"
          }`}
        >
          <button
            onClick={() => onOpenGallery(0)}
            className="group relative overflow-hidden rounded-xl bg-neutral-200 md:aspect-auto md:h-88"
            aria-label="Open photo viewer"
          >
            <Image
              src={main}
              alt={productName}
              fill
              className="object-cover transition duration-500 group-hover:scale-[1.03]"
            />
          </button>

          {thumbs.length > 0 && (
            <div className="hidden grid-cols-2 grid-rows-2 gap-3 md:grid md:h-88">
              {thumbs.map((src, i) => (
                <button
                  key={src + i}
                  onClick={() => onOpenGallery(i + 1)}
                  className="group relative overflow-hidden rounded-xl bg-neutral-200"
                  aria-label={`Open photo ${i + 2}`}
                >
                  <Image
                    src={src}
                    alt={`${productName} thumbnail ${i + 1}`}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <Button
          onClick={() => onOpenGallery(null)}
          className="absolute right-7 bottom-3 flex items-center gap-1.5 rounded-md bg-white px-3 py-5 text-xs text-black"
        >
          <Grid2x2 size={12} /> Show All Photos
        </Button>
      </div>
    </div>
  )
}

export default ProductGallery
