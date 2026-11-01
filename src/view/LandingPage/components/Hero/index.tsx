"use client"

import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import type { DateRange } from "react-day-picker"
import { Calendar, ChevronLeft, ChevronRight, MapPin } from "lucide-react"
import FormDate from "@/components/Form/FormDate"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toIsoDate } from "@/helper/formatDate"
import { cn } from "@/lib/utils"
import { useAuthStore } from "@/view/Auth/store"
import HeroForm from "./components/HeroForm"

// Ganti dengan gambar banner yang sebenarnya
const slides = [
  "/assets/hero-image.png",
  "/assets/spaces/image-1.png",
  "/assets/spaces/image-2.png",
]

const spaceTypes = [
  { value: "all", label: "All Space" },
  { value: "meeting-room", label: "Meeting Room" },
  { value: "private-office", label: "Private Office" },
  { value: "coworking", label: "Coworking Space" },
]

const Hero = () => {
  const router = useRouter()
  const { user } = useAuthStore()

  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [location, setLocation] = useState("")
  const [spaceType, setSpaceType] = useState("all")
  const [date, setDate] = useState<Date | DateRange | undefined>()

  const next = useCallback(
    () => setActive((current) => (current + 1) % slides.length),
    []
  )
  const prev = () =>
    setActive((current) => (current - 1 + slides.length) % slides.length)

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (location.trim()) params.set("location", location.trim())
    if (spaceType !== "all") params.set("type", spaceType)

    const from = date instanceof Date ? date : date?.from
    const to = date instanceof Date ? undefined : date?.to
    if (from) params.set("from", toIsoDate(from))
    if (to) params.set("to", toIsoDate(to))

    router.push(`/workspaces?${params.toString()}`)
  }

  useEffect(() => {
    if (!user || paused) return
    const timer = window.setInterval(next, 5000)
    return () => window.clearInterval(timer)
  }, [user, paused, next])

  if (user) {
    return (
      <section
        className="relative isolate w-full overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        aria-roledescription="carousel"
        aria-label="Featured workspaces"
      >
        <div className="absolute inset-0 -z-10">
          {slides.map((src, index) => (
            <Image
              key={src}
              src={src}
              alt=""
              fill
              priority={index === 0}
              sizes="100vw"
              className={cn(
                "object-cover transition-opacity duration-700",
                index === active ? "opacity-100" : "opacity-0"
              )}
            />
          ))}
          <div className="absolute inset-0 bg-black/45" />
        </div>

        <div className="mx-auto flex min-h-[420px] max-w-5xl flex-col items-center justify-center gap-6 px-14 py-12 text-center sm:px-16 md:min-h-[480px]">
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold text-white sm:text-3xl md:text-4xl">
              <span className="relative inline-block">
                Elevate Your Workspace
                <svg
                  aria-hidden
                  viewBox="0 0 500 20"
                  preserveAspectRatio="none"
                  className="absolute -bottom-2 left-0 h-3 w-full"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 12 Q250 -8 498 12"
                    stroke="#E88B91"
                    strokeWidth="10"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              with Premium Work Places.
            </h1>
            <p className="text-xs text-white/90 sm:text-sm">
              Discover the next generation of workspaces with our cutting-edge
              work places.
            </p>
          </div>

          <div className="w-full rounded-2xl bg-white p-4 p-5 text-left shadow-lg lg:w-300">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <label
                  htmlFor="hero-location"
                  className="text-sm text-neutral-700"
                >
                  Select Location
                </label>
                <div className="relative">
                  <MapPin
                    aria-hidden
                    className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-primary"
                  />
                  <Input
                    id="hero-location"
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                    placeholder="Jakarta, Wisma GKBI"
                    className="h-10 rounded-sm pl-9 text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-neutral-700">Space Type</label>
                <Select value={spaceType} onValueChange={setSpaceType}>
                  <SelectTrigger className="h-10! w-full rounded-sm text-sm">
                    <SelectValue placeholder="All Space" />
                  </SelectTrigger>
                  <SelectContent>
                    {spaceTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <FormDate
                mode="range"
                label="Select Date"
                placeholder="Select Date"
                value={date}
                onChange={setDate}
                icon={<Calendar className="text-primary" />}
                containerClassName="[&_label]:font-normal [&_label]:text-neutral-700"
              />
            </div>

            <div className="mt-4 flex justify-end">
              <Button
                type="button"
                onClick={handleSearch}
                className="rounded-sm px-8"
              >
                Search
              </Button>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={prev}
          aria-label="Previous slide"
          className="absolute top-1/2 left-3 grid size-9 -translate-y-1/2 place-items-center rounded-full text-white transition-colors hover:bg-white/15 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none sm:left-6"
        >
          <ChevronLeft size={28} />
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next slide"
          className="absolute top-1/2 right-3 grid size-9 -translate-y-1/2 place-items-center rounded-full text-white transition-colors hover:bg-white/15 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none sm:right-6"
        >
          <ChevronRight size={28} />
        </button>

        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === active}
              className={cn(
                "size-2 rounded-full transition-colors",
                index === active ? "bg-primary" : "bg-white/60 hover:bg-white"
              )}
            />
          ))}
        </div>
      </section>
    )
  }

  return (
    <section className="space-y-10 py-12 md:space-y-24 md:py-24">
      <div className="grid grid-cols-1 items-end gap-6 md:grid-cols-2 md:gap-8 lg:gap-54">
        <h1 className="text-3xl leading-tight font-bold sm:text-4xl lg:text-5xl">
          Discover Your Perfect Workspace at CEO SUITE.
        </h1>
        <p className="text-base md:text-lg">
          Experience the ultimate in flexible, premium workspaces where luxury
          meets productivity—CEO SUITE offers an inspiring environment tailored
          to elevate your business success.
        </p>
      </div>

      <div className="relative flex flex-col items-center gap-6 lg:block">
        <div className="z-10 flex w-full justify-center lg:absolute lg:top-1/2 lg:left-0 lg:w-auto lg:-translate-y-1/2">
          <HeroForm />
        </div>

        <div className="hidden w-full max-w-full lg:ml-auto lg:block lg:max-w-300">
          <Image
            src="/assets/hero-image.png"
            width={0}
            height={0}
            alt="hero"
            sizes="100vw"
            className="h-auto w-full"
          />
        </div>
      </div>
    </section>
  )
}

export default Hero
