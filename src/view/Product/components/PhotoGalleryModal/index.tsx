"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"

interface PhotoGalleryModalProps {
  images: string[]
  title: string
  open: boolean
  startIndex: number | null
  onClose: () => void
}

const PhotoGalleryModal = ({
  images,
  title,
  open,
  startIndex,
  onClose,
}: PhotoGalleryModalProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const initialIndex =
    startIndex !== null && startIndex >= 0 && startIndex < images.length
      ? startIndex
      : 0
  const currentIndex = selectedIndex ?? initialIndex

  useEffect(() => {
    if (!open) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setSelectedIndex((prev) => {
          const index = prev ?? initialIndex
          return index === 0 ? images.length - 1 : index - 1
        })
      }
      if (e.key === "ArrowRight") {
        setSelectedIndex((prev) => {
          const index = prev ?? initialIndex
          return index === images.length - 1 ? 0 : index + 1
        })
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [open, images.length, initialIndex])

  if (!images.length) return null

  const handlePrev = () => {
    setSelectedIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1)
  }

  const handleNext = () => {
    setSelectedIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1)
  }

  return (
    <Dialog open={open} onOpenChange={(next) => !next && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="flex h-dvh w-screen max-w-none items-center justify-center rounded-none bg-black/85 p-0 text-white ring-0 backdrop-blur-sm sm:max-w-none"
      >
        <DialogDescription className="sr-only">
          Photo gallery for {title}
        </DialogDescription>

        <div className="absolute top-4 right-4 left-4 flex items-center justify-between text-white">
          <DialogTitle className="text-sm font-medium drop-shadow sm:text-base">
            {title}
          </DialogTitle>
          <div className="flex items-center gap-3">
            <span className="text-xs text-neutral-300">
              {currentIndex + 1} / {images.length}
            </span>
            <DialogClose asChild>
              <button
                type="button"
                className="rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
                aria-label="Close photo gallery"
              >
                <X size={20} />
              </button>
            </DialogClose>
          </div>
        </div>

        <div className="relative h-[65vh] w-full max-w-4xl">
          <Image
            src={images[currentIndex]}
            alt={`${title} - photo ${currentIndex + 1}`}
            fill
            className="object-contain"
          />
        </div>

        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute top-1/2 left-4 -translate-y-1/2 rounded-full bg-white/10 p-2.5 text-white transition hover:bg-white/25 sm:left-8"
              aria-label="Previous photo"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={handleNext}
              className="absolute top-1/2 right-4 -translate-y-1/2 rounded-full bg-white/10 p-2.5 text-white transition hover:bg-white/25 sm:right-8"
              aria-label="Next photo"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}

        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 flex max-w-full -translate-x-1/2 gap-2 overflow-x-auto px-4 py-2">
            {images.map((src, i) => (
              <button
                key={src + i}
                onClick={() => setSelectedIndex(i)}
                className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-md border-2 transition ${
                  currentIndex === i
                    ? "border-[#862d30] opacity-100 ring-2 ring-[#862d30]/50"
                    : "border-transparent opacity-50 hover:opacity-80"
                }`}
              >
                <Image src={src} alt="" fill className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default PhotoGalleryModal
