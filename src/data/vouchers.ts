export type VoucherType = "percentage" | "fixed"

export interface Voucher {
  id: string
  code: string
  title: string
  description: string
  type: VoucherType
  value: number
  minTransaction: number
  applicableTypes: string[]
  validFrom: string
  validUntil: string
  used: boolean
}

export const vouchers: Voucher[] = [
  {
    id: "vcr-meet10",
    code: "MEET10",
    title: "Discount 10% for Meeting Room",
    description: "Berlaku untuk semua meeting room tanpa minimum transaksi.",
    type: "percentage",
    value: 10,
    minTransaction: 0,
    applicableTypes: ["Meeting Room"],
    validFrom: "2024-01-01",
    validUntil: "2027-12-31",
    used: false,
  },
  {
    id: "vcr-meet15",
    code: "MEET15",
    title: "Discount 15% for Meeting Room",
    description: "Berlaku untuk meeting room dengan minimum transaksi Rp1.000.000.",
    type: "percentage",
    value: 15,
    minTransaction: 1000000,
    applicableTypes: ["Meeting Room"],
    validFrom: "2024-01-01",
    validUntil: "2027-12-31",
    used: false,
  },
  {
    id: "vcr-office20",
    code: "OFFICE20",
    title: "Discount 20% for Office",
    description: "Berlaku untuk private office dengan minimum transaksi Rp2.000.000.",
    type: "percentage",
    value: 20,
    minTransaction: 2000000,
    applicableTypes: ["Office"],
    validFrom: "2024-01-01",
    validUntil: "2027-12-31",
    used: false,
  },
  {
    id: "vcr-hemat50",
    code: "HEMAT50",
    title: "Potongan Rp50.000 untuk Semua Tipe",
    description: "Berlaku untuk semua tipe ruangan dengan minimum transaksi Rp500.000.",
    type: "fixed",
    value: 50000,
    minTransaction: 500000,
    applicableTypes: [],
    validFrom: "2024-01-01",
    validUntil: "2027-12-31",
    used: false,
  },
  {
    id: "vcr-expired10",
    code: "EXPIRED10",
    title: "Discount 10% for Meeting Room",
    description: "Voucher contoh yang sudah tidak berlaku.",
    type: "percentage",
    value: 10,
    minTransaction: 0,
    applicableTypes: ["Meeting Room"],
    validFrom: "2024-01-01",
    validUntil: "2024-12-31",
    used: false,
  },
]
