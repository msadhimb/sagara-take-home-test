import {
  Projector,
  Utensils,
  UtensilsCrossed,
  Coffee,
  CupSoda,
  Presentation,
  Tv,
  MonitorPlay,
  type LucideIcon,
} from "lucide-react"

export const ICONS: Record<string, LucideIcon> = {
  Projector,
  Utensils,
  UtensilsCrossed,
  Coffee,
  CupSoda,
  Presentation,
  Tv,
  MonitorPlay,
}

interface AddOnLike {
  name: string
  unit?: string
}

export const getAddOnUnit = (a: AddOnLike): string => {
  if (a.unit) return a.unit
  const n = a.name.toLowerCase()
  if (n.includes("lunch") || n.includes("coffee")) return "pax"
  return "event"
}

const PERIOD_ORDER = ["Hourly", "Daily", "Weekly", "Monthly"]

export const sortOtherPrices = <T extends { period: string }>(
  prices: T[]
): T[] => {
  const [, ...others] = prices
  return [...others].sort(
    (a, b) => PERIOD_ORDER.indexOf(a.period) - PERIOD_ORDER.indexOf(b.period)
  )
}
