import Image from "next/image"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const MeetingRoomPackage = () => {
  return (
    <section className="relative grid grid-cols-1 items-center gap-12 md:grid-cols-2">
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 -right-58 -z-10 size-32 rounded-full bg-primary/30 blur-2xl"
      />
      <div className="relative mx-auto grid w-full max-w-sm grid-cols-2 gap-5">
        <div
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-1/2 -z-10 size-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/30 blur-2xl"
        />
        <div className="flex flex-col gap-3">
          <div className="relative aspect-square h-52 overflow-hidden rounded-lg shadow-md shadow-primary">
            <Image
              src="/assets/spaces/image-1.png"
              alt="Meeting room view"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative aspect-square h-62 overflow-hidden rounded-lg shadow-md shadow-primary">
            <Image
              src="/assets/spaces/image-3.png"
              alt="Lounge area"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3">
          <div className="relative aspect-square h-62 overflow-hidden rounded-lg shadow-md shadow-primary">
            <Image
              src="/assets/spaces/image-2.png"
              alt="Reception area"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative aspect-square h-52 overflow-hidden rounded-lg shadow-md shadow-primary">
            <Image
              src="/assets/spaces/image-4.png"
              alt="Meeting table"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Kanan: teks */}
      <div className="space-y-4">
        <h2 className="text-4xl font-semibold">Meeting Room Package</h2>

        <p className="text-lg leading-relaxed text-neutral-600">
          Elevate your meetings with CEO SUITE&apos;s premium meeting rooms, now
          available at an{" "}
          <span className="text-primary">exclusive special rate.</span>
        </p>
        <p className="text-lg leading-relaxed text-neutral-600">
          Whether you&apos;re hosting a team brainstorming session, client
          presentations, or strategic workshops, our fully-equipped meeting
          spaces offer the perfect{" "}
          <span className="text-primary">
            blend of professionalism and comfort.
          </span>
        </p>

        <Button
          size="sm"
          className="rounded-md bg-primary px-10 py-5 hover:bg-primary/90"
        >
          Browse Packages
          <ChevronRight className="size-3.5" />
        </Button>
      </div>
    </section>
  )
}

export default MeetingRoomPackage
