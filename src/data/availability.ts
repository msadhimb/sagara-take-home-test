export const OPEN_HOUR = 8
export const CLOSE_HOUR = 18

export interface BlockedSlot {
  productId: string
  date: string
  start: string
  end: string
}

export const blockedSlots: BlockedSlot[] = [
  {
    productId: "prd-axa-tower-meeting-room",
    date: "2026-11-05",
    start: "10:00",
    end: "12:00",
  },
  {
    productId: "prd-suite-7-view",
    date: "2026-11-06",
    start: "13:00",
    end: "15:00",
  },
]
