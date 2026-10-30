import { Separator } from "@/components/ui/separator"

type Location = {
  name: string
  address: string
  latitude: number
  longitude: number
}

interface ProductLocationProps {
  location: Location
}

const ProductLocation = ({ location }: ProductLocationProps) => {
  return (
    <>
      <div className="">
        <h2 className="mt-6 text-lg font-semibold">Location</h2>
        <div className="mt-3 overflow-hidden rounded-xl border border-neutral-200">
          <iframe
            title={`Map of ${location.name}`}
            src={`https://maps.google.com/maps?q=${location.latitude},${location.longitude}&z=15&output=embed`}
            className="h-65 w-full sm:h-75"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <p className="mt-3 text-sm font-semibold">{location.name}</p>
        <p className="mt-1 text-xs text-neutral-500">{location.address}</p>
      </div>
    </>
  )
}

export default ProductLocation
