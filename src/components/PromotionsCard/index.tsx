import { cn } from "@/lib/utils"
import Image from "next/image"

interface PromotionsCardProps {
  image: string
  title: string
  note: string
  overlay?: boolean
  highlight?: string
  withBorder?: boolean
  className?: string
}

const PromotionsCard = ({
  image,
  title,
  note,
  overlay = false,
  highlight,
  withBorder = true,
  className,
}: PromotionsCardProps) => {
  if (overlay) {
    return (
      <div
        className={cn(
          "relative h-64 overflow-hidden rounded-md shadow-sm",
          withBorder && "border",
          className
        )}
      >
        <Image
          src={image}
          alt={highlight ? `${highlight} ${title}` : title}
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-linear-to-t from-primary/90 via-primary/30 to-transparent" />

        <div className="absolute bottom-3 left-3 text-white">
          <p className="text-xs">
            {highlight && <span className="font-bold">{highlight} </span>}
            {title}
          </p>
          <p className="text-[9px] text-white/80">{note}</p>
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        "overflow-hidden rounded-md bg-white",
        withBorder && "border shadow-sm",
        className
      )}
    >
      <div className="relative h-64 w-full">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>

      <div className="space-y-1 p-4">
        <h3 className="text-sm font-semibold">{title}</h3>
        <p className="text-[11px] text-neutral-500">{note}</p>
      </div>
    </div>
  )
}

export default PromotionsCard
