import Image from "next/image"

type SpaceCardProps = {
  image: string
  name: string
  people: number
  type: string
  badgeClass: string
  period: string
  oldPrice?: string
  price: string
  subPeriod: string
  subPrice: string
}

const SpacesCard = ({
  image,
  name,
  people,
  type,
  badgeClass,
  period,
  oldPrice,
  price,
  subPeriod,
  subPrice,
}: SpaceCardProps) => {
  return (
    <div className="rounded-lg bg-white p-2 shadow-md">
      <div className="relative h-42 w-full overflow-hidden rounded">
        <Image src={image} alt={name} fill className="object-cover" />
      </div>

      <div className="space-y-2 px-1 pt-3 pb-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-semibold">{name}</h3>
          <span className="text-xs whitespace-nowrap text-neutral-500">
            {people} People
          </span>
        </div>

        <span
          className={`inline-block rounded px-2 py-0.5 text-[10px] font-medium ${badgeClass}`}
        >
          {type}
        </span>

        <div>
          <p className="text-[10px] text-neutral-500">{period}</p>
          {oldPrice && (
            <p className="text-[10px] text-neutral-400 line-through">
              {oldPrice}
            </p>
          )}
          <p className="text-lg font-bold text-primary">{price}</p>
          <p className="text-[10px] text-neutral-500">
            {subPeriod} <span className="font-medium">{subPrice}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SpacesCard
