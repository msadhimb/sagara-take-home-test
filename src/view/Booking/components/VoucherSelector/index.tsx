"use client"

import { useState } from "react"
import { Check, ChevronRight, Ticket } from "lucide-react"
import type { Voucher } from "@/data/vouchers"
import type { AppliedVoucher } from "../../store/type"
import VoucherModal from "../VoucherModal"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface VoucherSelectorProps {
  productId: string
  subtotal: number
  vouchers: Voucher[]
  applied: AppliedVoucher | null
  onApply: (voucher: AppliedVoucher) => void
  onRemove: () => void
}

const VoucherSelector = ({
  productId,
  subtotal,
  vouchers,
  applied,
  onApply,
  onRemove,
}: VoucherSelectorProps) => {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <section className="space-y-3">
      <div className="flex flex-col">
        <h2 className="text-lg font-semibold text-neutral-900">Voucher</h2>
        <p className="text-sm text-neutral-500">Add voucher code</p>
      </div>

      <Button
        type="button"
        variant="outline"
        className={cn(
          "relative flex h-auto w-full shrink-0 items-center justify-between overflow-hidden p-5",
          applied && "bg-green-200 hover:bg-green-100/80"
        )}
        onClick={() => setModalOpen(true)}
      >
        {applied ? (
          <>
            <div className="absolute -top-35 -right-35">
              <svg
                aria-hidden
                viewBox="-12 -90 762 577"
                preserveAspectRatio="none"
                style={{
                  width: "50rem",
                  height: "50rem",
                }}
                className="pointer-events-none"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M724.394 146.202C698.394 212.123 606.581 218.349 550.482 261.948C517.16 287.844 492.98 320.107 462.765 349.533C414.651 396.39 386.957 476.895 320.266 486.151C256.15 495.05 206.015 431.963 155.067 392.237C101.604 350.552 38.2836 313.267 16.4708 249.278C-5.60218 184.525 -11.77 96.405 38.2277 49.4807C93.5838 -2.4727 187.024 42.0077 260.049 20.6728C293.438 10.9176 309.227 -29.5319 342.572 -39.4375C378.718 -50.1752 415.706 -35.8403 453.418 -36.7708C528.046 -38.6122 610.801 -89.2842 672.564 -47.5799C729.312 -9.26101 749.443 82.692 724.394 146.202Z"
                  fill="#32D583"
                  fillOpacity="0.25"
                />
              </svg>
            </div>

            <span className="relative z-10 flex items-center gap-2 text-xs font-medium text-green-900">
              <span className="grid size-4 place-items-center rounded-sm bg-green-700 text-white">
                <Check className="size-3" strokeWidth={3} />
              </span>
              Promo Code Applied! 🎉
            </span>
          </>
        ) : (
          <div className="relative z-10 flex items-center gap-2">
            <Ticket className="size-5 text-primary" />
            <p className="text-sm text-neutral-800">Add Voucher Code</p>
          </div>
        )}

        <ChevronRight className="relative z-10" />
      </Button>

      {/* {applied ? (
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="relative flex h-auto w-full items-center justify-between gap-3 overflow-hidden rounded-md bg-gradient-to-r from-green-100 to-green-200 px-3 text-left transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
        >
          <span className="flex items-center gap-2 text-xs font-medium text-green-900">
            <span className="grid size-4 place-items-center rounded-[3px] bg-green-700 text-white">
              <Check size={25} strokeWidth={3} />
            </span>
            Promo Code Applied! 🎉
          </span>
          <ChevronRight size={25} className="text-neutral-600" />
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="flex h-11 w-full items-center justify-between gap-3 rounded-md border border-neutral-200 bg-white px-3 text-left transition-colors hover:bg-neutral-50 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
        >
          <span className="flex items-center gap-2 text-xs text-neutral-800">
            <Ticket size={18} strokeWidth={1.5} className="text-primary" />
            Add Voucher Code
          </span>
          <ChevronRight size={16} className="text-neutral-600" />
        </button>
      )} */}

      {modalOpen ? (
        <VoucherModal
          productId={productId}
          subtotal={subtotal}
          vouchers={vouchers}
          applied={applied}
          onApply={onApply}
          onRemove={onRemove}
          onClose={() => setModalOpen(false)}
        />
      ) : null}
    </section>
  )
}

export default VoucherSelector
