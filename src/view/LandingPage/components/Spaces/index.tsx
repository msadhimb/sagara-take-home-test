import Image from "next/image"
import { Building2, ChevronRight, Laptop, Presentation } from "lucide-react"
import SectionHeader from "@/components/SectionHeader"

const spaces = [
  {
    name: "Private Offices",
    image: "/assets/spaces/image-3.png",
    icon: <Building2 className="size-4 text-blue-600" />,
  },
  {
    name: "Coworking Space",
    image: "/assets/spaces/image-2.png",
    icon: <Laptop className="size-4 text-green-600" />,
  },
  {
    name: "Meeting Room",
    image: "/assets/spaces/image-1.png",
    icon: <Presentation className="size-4 text-pink-700" />,
  },
]

const Spaces = () => {
  return (
    <section className="space-y-6">
      <SectionHeader
        title="Browse Spaces"
        subtitle="Find the perfect space for your next meeting or event."
      />

      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {spaces.map((space) => (
          <div key={space.name} className="space-y-2">
            <div className="relative aspect-square w-full overflow-hidden">
              <Image
                src={space.image}
                alt={space.name}
                fill
                className="object-cover"
              />
              <button
                type="button"
                aria-label={`Lihat ${space.name}`}
                className="absolute bottom-0 left-0 flex size-8 items-center justify-center bg-primary text-white"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium">
              {space.icon}
              {space.name}
            </div>
          </div>
        ))}

        <div className="relative flex min-h-64 flex-col items-center justify-center overflow-hidden bg-primary px-6 text-center text-white shadow-xl shadow-primary/40 md:aspect-square md:min-h-0">
          <div
            className="absolute top-3 right-3 size-14 bg-[repeating-linear-gradient(135deg,transparent_0_4px,rgba(255,255,255,0.3)_4px_5px)]"
            aria-hidden
          />

          <h3 className="text-xl font-semibold">All Space</h3>
          <p className="mt-2 text-[11px] leading-snug">
            Comfortable space, Full speed wifi, Free coffe &amp; Snack and many
            more
          </p>

          <button
            type="button"
            className="absolute bottom-0 left-0 flex w-4/5 items-center justify-between bg-orange-600 px-4 py-3 text-xs font-semibold"
          >
            Check availability
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default Spaces
