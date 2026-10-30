import { Tag } from "lucide-react"
import SectionHeader from "@/components/SectionHeader"
import { Button } from "@/components/ui/button"
import PromotionsCard from "@/components/PromotionsCard"

// Tiga kartu voucher
const deals = [
  {
    image: "/assets/deals/image-1.jpg",
    price: "Rp200,000",
    text: "Voucher for Office!",
    validUntil: "valid until 15 August 2024",
  },
  {
    image: "/assets/deals/image-1.jpg",
    price: "Rp200,000",
    text: "Voucher for Office!",
    validUntil: "valid until 15 August 2024",
  },
  {
    image: "/assets/deals/image-1.jpg",
    price: "Rp200,000",
    text: "Voucher for Office!",
    validUntil: "valid until 15 August 2024",
  },
]

const BestDeals = () => {
  return (
    <section className="relative space-y-6">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-25 -left-58 -z-10 size-32 rounded-full bg-primary/30 blur-2xl"
      />
      <SectionHeader
        icon={<Tag className="size-4" />}
        title="Best Deals"
        subtitle="Take advantage of our special promotions and enjoy exceptional savings on your workspace."
        button={
          <Button
            variant="ghost"
            size="sm"
            className="bg-primary/10 text-xs text-primary hover:bg-primary/20 hover:text-primary"
          >
            See All Deals
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {deals.map((deal, index) => (
          <PromotionsCard
            key={index}
            image={deal.image}
            title={deal.text}
            note={deal.validUntil}
            overlay
            highlight={deal.price}
          />
        ))}
      </div>
    </section>
  )
}

export default BestDeals
