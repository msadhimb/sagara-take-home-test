import { SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import SpacesCard from "@/components/SpacesCard"
import SectionHeader from "@/components/SectionHeader"
import { products } from "@/data/products"
import Link from "next/link"

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

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        {products.map((space, index) => (
          <Link key={index} href={`/product/${space.slug}`}>
            <SpacesCard {...space} />
          </Link>
        ))}
      </div>
    </section>
  )
}

export default Recommended
