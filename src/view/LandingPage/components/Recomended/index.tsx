import { SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import SpacesCard from "@/components/SpacesCard"
import SectionHeader from "@/components/SectionHeader"

const recommendedSpaces = [
  {
    image: "/assets/spaces/image-1.png",
    name: "AXA Tower Meeting Room",
    people: 4,
    type: "Meeting Room",
    badgeClass: "bg-pink-100 text-pink-700",
    period: "Daily",
    price: "Rp2,880,000",
    subPeriod: "Hourly",
    subPrice: "Rp480,000",
  },
  {
    image: "/assets/spaces/image-6.png",
    name: "AXA Tower Meeting Room",
    people: 4,
    type: "Meeting Room",
    badgeClass: "bg-pink-100 text-pink-700",
    period: "Daily",
    oldPrice: "Rp480,000",
    price: "Rp1,200,000",
    subPeriod: "Hourly",
    subPrice: "Rp200,000",
  },
  {
    image: "/assets/spaces/image-5.png",
    name: "Suite 7 View",
    people: 8,
    type: "Office",
    badgeClass: "bg-blue-100 text-blue-700",
    period: "Daily",
    price: "Rp3,480,000",
    subPeriod: "Hourly",
    subPrice: "Rp600,000",
  },
  {
    image: "/assets/spaces/image-4.png",
    name: "Suite VIP 5 Non View",
    people: 1,
    type: "Co-Working Space (Dedicated)",
    badgeClass: "bg-green-100 text-green-700",
    period: "Weekly",
    price: "Rp750,000",
    subPeriod: "Daily",
    subPrice: "Rp150,000",
  },
  {
    image: "/assets/spaces/image-1.png",
    name: "AXA Tower Meeting Room",
    people: 4,
    type: "Meeting Room",
    badgeClass: "bg-pink-100 text-pink-700",
    period: "Daily",
    price: "Rp2,880,000",
    subPeriod: "Hourly",
    subPrice: "Rp480,000",
  },
  {
    image: "/assets/spaces/image-6.png",
    name: "AXA Tower Meeting Room",
    people: 4,
    type: "Meeting Room",
    badgeClass: "bg-pink-100 text-pink-700",
    period: "Daily",
    oldPrice: "Rp480,000",
    price: "Rp1,200,000",
    subPeriod: "Hourly",
    subPrice: "Rp200,000",
  },
  {
    image: "/assets/spaces/image-5.png",
    name: "Suite 7 View",
    people: 8,
    type: "Office",
    badgeClass: "bg-blue-100 text-blue-700",
    period: "Daily",
    price: "Rp3,480,000",
    subPeriod: "Hourly",
    subPrice: "Rp600,000",
  },
  {
    image: "/assets/spaces/image-4.png",
    name: "Suite VIP 5 Non View",
    people: 1,
    type: "Co-Working Space (Dedicated)",
    badgeClass: "bg-green-100 text-green-700",
    period: "Weekly",
    price: "Rp750,000",
    subPeriod: "Daily",
    subPrice: "Rp150,000",
  },
]

const Recommended = () => {
  return (
    <section className="space-y-6">
      <div className="flex items-start justify-between">
        <SectionHeader
          title="Recommended For You"
          subtitle="Explore top-rated meeting rooms and workspaces."
          button={
            <Button variant="outline" size="sm" className="rounded-full">
              <SlidersHorizontal className="size-3.5" />
              Filter
            </Button>
          }
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {recommendedSpaces.map((space, index) => (
          <SpacesCard key={index} {...space} />
        ))}
      </div>
    </section>
  )
}

export default Recommended
