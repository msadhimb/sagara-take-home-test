import PromotionsCard from "@/components/PromotionsCard"
import SectionHeader from "@/components/SectionHeader"
import { Button } from "@/components/ui/button"

const partners = [
  {
    image: "/assets/promotions/image-1.jpg",
    title: "Exclusive Corporate Rate | Bank Mandiri",
    description:
      "Enjoy substantial savings on meeting rooms, event spaces, and other business solutions when you partner with us.",
  },
  {
    image: "/assets/promotions/image-2.jpg",
    title: "Exclusive Member Benefits",
    description:
      "As a valued member, you'll enjoy a range of benefits designed to enhance your experience and provide exceptional value.",
  },
  {
    image: "/assets/promotions/image-3.jpg",
    title: "10% Offer for DBS Credit Card Holder",
    description:
      "Exclusive to DBS Credit Card holders: Get a 10% discount on your next booking. Valid for corporate booking only.",
  },
]

const CorporatePartners = () => {
  return (
    <section className="space-y-6">
      <SectionHeader
        title="Our Corporate Partners"
        subtitle="Exclusive benefits and promotions tailored to meet the needs of businesses of all sizes."
        button={
          <Button
            variant="ghost"
            size="sm"
            className="bg-primary/10 px-10 py-5 text-sm text-primary hover:bg-primary/20 hover:text-primary"
          >
            See All
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {partners.map((partner) => (
          <div key={partner.title} className="space-y-3">
            <PromotionsCard
              key={partner.title}
              image={partner.image}
              title={partner.title}
              note={partner.description}
              withBorder={false}
            />
          </div>
        ))}
      </div>
    </section>
  )
}

export default CorporatePartners
