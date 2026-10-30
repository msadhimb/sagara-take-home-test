import Link from "next/link"
import { products } from "@/data/products"
import SpacesCard from "@/components/SpacesCard"

type Product = (typeof products)[number]

interface SimilarSpacesProps {
  similar: Product[]
}

const SimilarSpaces = ({ similar }: SimilarSpacesProps) => {
  if (!similar.length) return null

  return (
    <div className="bg-neutral-50 py-10">
      <div className="container mx-auto">
        <h2 className="text-lg font-semibold">Similar Spaces</h2>
        <p className="mt-1 text-sm text-neutral-500">
          Check out these spaces with similar features to the ones you&apos;ve
          been looking at.
        </p>
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {similar.map((space) => (
            <Link key={space.slug} href={`/product/${space.slug}`}>
              <SpacesCard {...space} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SimilarSpaces
