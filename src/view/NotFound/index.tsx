"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Home, SearchX } from "lucide-react"
import { Button } from "@/components/ui/button"

const NotFoundView = () => {
  const router = useRouter()

  return (
    <main className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-neutral-50 px-4 py-16">
      <div className="flex w-full max-w-xl flex-col items-center text-center">
        {/* Ilustrasi */}
        <div className="relative mb-8 grid h-56 w-full max-w-md place-items-center overflow-hidden rounded-2xl bg-gradient-to-br from-pink-50 to-pink-100">
          <svg
            aria-hidden
            viewBox="0 0 400 220"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 size-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="60" cy="40" r="70" fill="#872B2B" fillOpacity="0.06" />
            <circle
              cx="350"
              cy="190"
              r="90"
              fill="#872B2B"
              fillOpacity="0.08"
            />
          </svg>

          <div className="relative z-10 flex flex-col items-center">
            <span className="grid size-14 place-items-center rounded-full bg-white text-primary shadow-sm">
              <SearchX size={28} strokeWidth={1.5} aria-hidden />
            </span>
            <p className="mt-3 text-7xl leading-none font-bold tracking-tight text-primary">
              404
            </p>
          </div>
        </div>

        {/* Teks */}
        <h1 className="text-2xl font-semibold text-neutral-800 sm:text-3xl">
          Page not found
        </h1>
        <p className="mt-2 max-w-md text-sm text-neutral-500 sm:text-base">
          Sorry, the page you are looking for doesn&apos;t exist or has been
          moved. Let&apos;s get you back on track.
        </p>

        {/* Aksi */}
        <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Button asChild size="lg" className="rounded-sm">
            <Link href="/">
              <Home aria-hidden />
              Back to Home
            </Link>
          </Button>
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="rounded-sm border-primary/30 text-primary hover:bg-primary/5 hover:text-primary"
            onClick={() => router.back()}
          >
            <ArrowLeft aria-hidden />
            Go Back
          </Button>
        </div>
      </div>
    </main>
  )
}

export default NotFoundView
