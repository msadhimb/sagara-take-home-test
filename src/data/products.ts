export interface ProductPrice {
  period: string
  price: string
  amount: number
  oldPrice?: string
  badge?: string
}

export interface ProductAddOn {
  id: string
  name: string
  price: string
  amount: number
  icon: string
  unit?: string
  maxQty: number
}

export interface ProductLocation {
  name: string
  address: string
  latitude: number
  longitude: number
}

export interface Product {
  id: string
  image: string
  images: string[]
  name: string
  people: number
  type: string
  badgeClass: string
  period: string
  price: string
  oldPrice?: string
  subPeriod: string
  subPrice: string
  slug: string
  rating: number
  area: string
  floor: string
  prices: ProductPrice[]
  description: string
  addOns: ProductAddOn[]
  location: ProductLocation
}

const defaultAddOns: ProductAddOn[] = [
  {
    id: "addon-projector",
    name: "Projector",
    price: "Rp250,000",
    amount: 250000,
    icon: "Projector",
    maxQty: 5,
  },
  {
    id: "addon-lunch-standard",
    name: "Lunch Package - Standard",
    price: "Rp85,000",
    amount: 85000,
    icon: "Utensils",
    maxQty: 50,
  },
  {
    id: "addon-lunch-premium",
    name: "Lunch Package - Premium",
    price: "Rp125,000",
    amount: 125000,
    icon: "UtensilsCrossed",
    maxQty: 50,
  },
  {
    id: "addon-coffee-tea-time",
    name: "Coffee Break - Tea Time",
    price: "Rp75,000",
    amount: 75000,
    icon: "Coffee",
    maxQty: 50,
  },
  {
    id: "addon-coffee-full",
    name: "Coffee Break - Full",
    price: "Rp95,000",
    amount: 95000,
    icon: "CupSoda",
    maxQty: 50,
  },
  {
    id: "addon-flip-chart",
    name: "Flip Chart",
    price: "Rp45,000",
    amount: 45000,
    icon: "Presentation",
    maxQty: 5,
  },
  {
    id: "addon-led-television",
    name: "LED Television",
    price: "Rp350,000",
    amount: 350000,
    icon: "Tv",
    maxQty: 2,
  },
  {
    id: "addon-lcd-projector",
    name: "LCD Projector",
    price: "Rp1,200,000",
    amount: 1200000,
    icon: "MonitorPlay",
    maxQty: 2,
  },
]

export const products: Product[] = [
  {
    id: "prd-axa-tower-meeting-room",
    image: "/assets/spaces/image-1.png",
    name: "AXA Tower Meeting Room",
    people: 4,
    type: "Meeting Room",
    badgeClass: "bg-pink-100 text-pink-700",
    period: "Daily",
    price: "Rp2,880,000",
    subPeriod: "Hourly",
    subPrice: "Rp480,000",

    slug: "axa-tower-meeting-room",
    images: ["/assets/spaces/image-1.png"],
    rating: 4.8,
    area: "20 m²",
    floor: "Lantai 10",
    prices: [
      { period: "Daily", price: "Rp2,880,000", amount: 2880000, badge: "Best Value" },
      { period: "Hourly", price: "Rp480,000", amount: 480000 },
      { period: "Weekly", price: "Rp12,960,000", amount: 12960000 },
      { period: "Monthly", price: "Rp43,200,000", amount: 43200000 },
    ],
    description:
      "Meeting room nyaman untuk tim kecil dengan fasilitas lengkap di AXA Tower.",
    addOns: defaultAddOns,
    location: {
      name: "AXA Tower, Jakarta",
      address:
        "Jl. Prof. Dr. Satrio Kav. 18, Kuningan, Jakarta Selatan, DKI Jakarta",
      latitude: -6.225,
      longitude: 106.831,
    },
  },
  {
    id: "prd-axa-tower-meeting-room-2",
    image: "/assets/spaces/image-6.png",
    name: "AXA Tower Meeting Room",
    people: 4,
    type: "Meeting Room",
    badgeClass: "bg-pink-100 text-pink-700",
    period: "Daily",
    oldPrice: "Rp480,000",
    price: "Rp1,200,000",
    subPeriod: "Hourly",
    subPrice: "Rp200,000",

    slug: "axa-tower-meeting-room-2",
    images: ["/assets/spaces/image-6.png"],
    rating: 4.7,
    area: "20 m²",
    floor: "Lantai 11",
    prices: [
      {
        period: "Daily",
        price: "Rp1,200,000",
        amount: 1200000,
        oldPrice: "Rp480,000",
        badge: "Best Value",
      },
      { period: "Hourly", price: "Rp200,000", amount: 200000 },
      { period: "Weekly", price: "Rp5,400,000", amount: 5400000 },
      { period: "Monthly", price: "Rp18,000,000", amount: 18000000 },
    ],
    description:
      "Meeting room nyaman untuk tim kecil dengan fasilitas lengkap di AXA Tower.",
    addOns: defaultAddOns,
    location: {
      name: "AXA Tower, Jakarta",
      address:
        "Jl. Prof. Dr. Satrio Kav. 18, Kuningan, Jakarta Selatan, DKI Jakarta",
      latitude: -6.225,
      longitude: 106.831,
    },
  },
  {
    id: "prd-suite-7-view",
    image: "/assets/spaces/image-5.png",
    name: "Suite 7 View",
    people: 8,
    type: "Office",
    badgeClass: "bg-blue-100 text-blue-700",
    period: "Daily",
    price: "Rp3,480,000",
    subPeriod: "Hourly",
    subPrice: "Rp600,000",

    slug: "suite-7-view",
    images: ["/assets/spaces/image-5.png"],
    rating: 4.6,
    area: "35 m²",
    floor: "Lantai 7",
    prices: [
      { period: "Daily", price: "Rp3,480,000", amount: 3480000, badge: "Best Value" },
      { period: "Hourly", price: "Rp600,000", amount: 600000 },
      { period: "Weekly", price: "Rp15,660,000", amount: 15660000 },
      { period: "Monthly", price: "Rp52,200,000", amount: 52200000 },
    ],
    description:
      "Private office dengan pemandangan kota, cocok untuk tim hingga 8 orang.",
    addOns: defaultAddOns,
    location: {
      name: "Jakarta",
      address: "Jakarta, DKI Jakarta",
      latitude: -6.2,
      longitude: 106.82,
    },
  },
  {
    id: "prd-suite-vip-5-non-view",
    image: "/assets/spaces/image-4.png",
    name: "Suite VIP 5 Non View",
    people: 1,
    type: "Co-Working Space (Dedicated)",
    badgeClass: "bg-green-100 text-green-700",
    period: "Weekly",
    price: "Rp750,000",
    subPeriod: "Daily",
    subPrice: "Rp150,000",

    slug: "suite-vip-5-non-view",
    images: ["/assets/spaces/image-4.png"],
    rating: 4.5,
    area: "6 m²",
    floor: "Lantai 5",
    prices: [
      { period: "Weekly", price: "Rp750,000", amount: 750000, badge: "Best Value" },
      { period: "Daily", price: "Rp150,000", amount: 150000 },
      { period: "Hourly", price: "Rp30,000", amount: 30000 },
      { period: "Monthly", price: "Rp2,700,000", amount: 2700000 },
    ],
    description:
      "Dedicated desk di area co-working untuk produktivitas harian.",
    addOns: defaultAddOns,
    location: {
      name: "Jakarta",
      address: "Jakarta, DKI Jakarta",
      latitude: -6.2,
      longitude: 106.82,
    },
  },
  {
    id: "prd-axa-tower-meeting-room-3",
    image: "/assets/spaces/image-1.png",
    name: "AXA Tower Meeting Room",
    people: 4,
    type: "Meeting Room",
    badgeClass: "bg-pink-100 text-pink-700",
    period: "Daily",
    price: "Rp2,880,000",
    subPeriod: "Hourly",
    subPrice: "Rp480,000",

    slug: "axa-tower-meeting-room",
    images: ["/assets/spaces/image-1.png"],
    rating: 4.8,
    area: "20 m²",
    floor: "Lantai 10",
    prices: [
      { period: "Daily", price: "Rp2,880,000", amount: 2880000, badge: "Best Value" },
      { period: "Hourly", price: "Rp480,000", amount: 480000 },
      { period: "Weekly", price: "Rp12,960,000", amount: 12960000 },
      { period: "Monthly", price: "Rp43,200,000", amount: 43200000 },
    ],
    description:
      "Meeting room nyaman untuk tim kecil dengan fasilitas lengkap di AXA Tower.",
    addOns: defaultAddOns,
    location: {
      name: "AXA Tower, Jakarta",
      address:
        "Jl. Prof. Dr. Satrio Kav. 18, Kuningan, Jakarta Selatan, DKI Jakarta",
      latitude: -6.225,
      longitude: 106.831,
    },
  },
  {
    id: "prd-axa-tower-meeting-room-4",
    image: "/assets/spaces/image-6.png",
    name: "AXA Tower Meeting Room",
    people: 4,
    type: "Meeting Room",
    badgeClass: "bg-pink-100 text-pink-700",
    period: "Daily",
    oldPrice: "Rp480,000",
    price: "Rp1,200,000",
    subPeriod: "Hourly",
    subPrice: "Rp200,000",

    slug: "axa-tower-meeting-room-2",
    images: ["/assets/spaces/image-6.png"],
    rating: 4.7,
    area: "20 m²",
    floor: "Lantai 11",
    prices: [
      {
        period: "Daily",
        price: "Rp1,200,000",
        amount: 1200000,
        oldPrice: "Rp480,000",
        badge: "Best Value",
      },
      { period: "Hourly", price: "Rp200,000", amount: 200000 },
      { period: "Weekly", price: "Rp5,400,000", amount: 5400000 },
      { period: "Monthly", price: "Rp18,000,000", amount: 18000000 },
    ],
    description:
      "Meeting room nyaman untuk tim kecil dengan fasilitas lengkap di AXA Tower.",
    addOns: defaultAddOns,
    location: {
      name: "AXA Tower, Jakarta",
      address:
        "Jl. Prof. Dr. Satrio Kav. 18, Kuningan, Jakarta Selatan, DKI Jakarta",
      latitude: -6.225,
      longitude: 106.831,
    },
  },
  {
    id: "prd-suite-7-view-2",
    image: "/assets/spaces/image-5.png",
    name: "Suite 7 View",
    people: 8,
    type: "Office",
    badgeClass: "bg-blue-100 text-blue-700",
    period: "Daily",
    price: "Rp3,480,000",
    subPeriod: "Hourly",
    subPrice: "Rp600,000",

    slug: "suite-7-view",
    images: ["/assets/spaces/image-5.png"],
    rating: 4.6,
    area: "35 m²",
    floor: "Lantai 7",
    prices: [
      { period: "Daily", price: "Rp3,480,000", amount: 3480000, badge: "Best Value" },
      { period: "Hourly", price: "Rp600,000", amount: 600000 },
      { period: "Weekly", price: "Rp15,660,000", amount: 15660000 },
      { period: "Monthly", price: "Rp52,200,000", amount: 52200000 },
    ],
    description:
      "Private office dengan pemandangan kota, cocok untuk tim hingga 8 orang.",
    addOns: defaultAddOns,
    location: {
      name: "Jakarta",
      address: "Jakarta, DKI Jakarta",
      latitude: -6.2,
      longitude: 106.82,
    },
  },
  {
    id: "prd-suite-vip-5-non-view-2",
    image: "/assets/spaces/image-4.png",
    name: "Suite VIP 5 Non View",
    people: 1,
    type: "Co-Working Space (Dedicated)",
    badgeClass: "bg-green-100 text-green-700",
    period: "Weekly",
    price: "Rp750,000",
    subPeriod: "Daily",
    subPrice: "Rp150,000",

    slug: "suite-vip-5-non-view",
    images: ["/assets/spaces/image-4.png"],
    rating: 4.5,
    area: "6 m²",
    floor: "Lantai 5",
    prices: [
      { period: "Weekly", price: "Rp750,000", amount: 750000, badge: "Best Value" },
      { period: "Daily", price: "Rp150,000", amount: 150000 },
      { period: "Hourly", price: "Rp30,000", amount: 30000 },
      { period: "Monthly", price: "Rp2,700,000", amount: 2700000 },
    ],
    description:
      "Dedicated desk di area co-working untuk produktivitas harian.",
    addOns: defaultAddOns,
    location: {
      name: "Jakarta",
      address: "Jakarta, DKI Jakarta",
      latitude: -6.2,
      longitude: 106.82,
    },
  },
]
