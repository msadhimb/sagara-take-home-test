import { BadgePercent } from "lucide-react"
import SectionHeader from "@/components/SectionHeader"
import { Button } from "@/components/ui/button"
import PromotionsCard from "@/components/PromotionsCard"

// Tiga kartu promo
const promotions = [
  {
    image: "/assets/promotions/image-1.jpg",
    title: "Discount 20% for all co-working space booking!",
    note: "Limited time offer! Don't miss out on this incredible deal.",
  },
  {
    image: "/assets/promotions/image-2.jpg",
    title: "Exclusive 30% discount on monthly co-working space subscriptions!",
    note: "Limited time offer! Don't miss out on this incredible deal.",
  },
  {
    image: "/assets/promotions/image-3.jpg",
    title: "Special offer: Get 25% off any meeting room booking!",
    note: "Don't miss out on this exclusive deal! Limited time only.",
  },
]

const Promotions = () => {
  return (
    <section className="relative space-y-6">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-25 -right-58 -z-10 size-32 rounded-full bg-primary/30 blur-2xl"
      />
      <SectionHeader
        icon={<BadgePercent className="size-4" />}
        title="Promotions"
        subtitle="Don't miss this opportunity to elevate your workspace experience at unbeatable value."
        button={
          <Button
            variant="ghost"
            size="sm"
            className="bg-primary/10 text-xs text-primary hover:bg-primary/20 hover:text-primary"
          >
            See All
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {promotions.map((promo) => (
          <PromotionsCard
            key={promo.title}
            image={promo.image}
            title={promo.title}
            note={promo.note}
          />
        ))}
      </div>
    </section>
  )
}

export default Promotions
