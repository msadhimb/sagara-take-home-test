"use client"

import { CalendarDays, Clock, MapPin } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import type { Product } from "@/data/products"
import { formatCurrency } from "@/helper/formatCurrency"
import { formatDateLong } from "@/helper/formatDate"
import { formatTimeRange } from "@/helper/formatTimeRange"
import type { PriceSummaryAddOn } from "../PriceSummary"

interface ConfirmBookingModalProps {
  open: boolean
  loading: boolean
  product: Product
  date: string
  start: string
  end: string
  addOns: PriceSummaryAddOn[]
  voucherCode?: string | null
  additionalRequest?: string
  productAmount: number
  subtotal: number
  discount: number
  total: number
  period: string
  onClose: () => void
  onConfirm: () => void
}

const ConfirmBookingModal = ({
  open,
  loading,
  product,
  date,
  start,
  end,
  addOns,
  voucherCode,
  additionalRequest,
  productAmount,
  subtotal,
  discount,
  total,
  period,
  onClose,
  onConfirm,
}: ConfirmBookingModalProps) => {
  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next && !loading) onClose()
      }}
    >
      <DialogContent className="max-w-lg">
        <DialogHeader className="p-5">
          <DialogTitle className="text-lg font-semibold">
            Confirm your booking
          </DialogTitle>
          <DialogDescription>
            Please review the details below before confirming.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 p-5">
          <div className="flex gap-3 rounded-lg border border-neutral-200 p-3">
            <img
              src={product.image}
              alt={product.name}
              className="size-16 shrink-0 rounded-md object-cover"
            />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-neutral-900">
                {product.name}
              </p>
              <p className="flex items-center gap-1.5 text-xs text-neutral-500">
                <MapPin className="size-3.5" aria-hidden />
                {product.location.name}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-xs text-neutral-500">Date</p>
              <p className="mt-0.5 flex items-center gap-1.5 font-medium text-neutral-900">
                <CalendarDays className="size-3.5 text-primary" aria-hidden />
                {formatDateLong(date)}
              </p>
            </div>
            <div>
              <p className="text-xs text-neutral-500">Time</p>
              <p className="mt-0.5 flex items-center gap-1.5 font-medium text-neutral-900">
                <Clock className="size-3.5 text-primary" aria-hidden />
                {formatTimeRange(start, end)}
              </p>
            </div>
          </div>

          {addOns.length > 0 ? (
            <div className="space-y-1 text-sm">
              <p className="text-xs text-neutral-500">Add-ons</p>
              {addOns.map((addOn) => (
                <div
                  key={addOn.id}
                  className="flex items-center justify-between gap-3"
                >
                  <span className="min-w-0 truncate text-neutral-700">
                    {addOn.name} × {addOn.qty}
                  </span>
                  <span className="shrink-0 text-neutral-900">
                    {formatCurrency(addOn.amount)}
                  </span>
                </div>
              ))}
            </div>
          ) : null}

          {additionalRequest ? (
            <div className="text-sm">
              <p className="text-xs text-neutral-500">Additional request</p>
              <p className="mt-0.5 text-neutral-700">{additionalRequest}</p>
            </div>
          ) : null}

          <div className="space-y-1.5 rounded-lg bg-neutral-50 p-3 text-sm">
            <div className="flex items-center justify-between text-neutral-600">
              <span>
                {product.name} (per {period})
              </span>
              <span>{formatCurrency(productAmount)}</span>
            </div>
            <div className="flex items-center justify-between text-neutral-600">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            {discount > 0 ? (
              <div className="flex items-center justify-between text-emerald-700">
                <span>Voucher {voucherCode}</span>
                <span>-{formatCurrency(discount)}</span>
              </div>
            ) : null}
            <div className="flex items-center justify-between border-t border-neutral-200 pt-1.5 text-base font-semibold text-neutral-900">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button type="button" onClick={onConfirm} disabled={loading}>
            {loading ? "Confirming..." : "Confirm Booking"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ConfirmBookingModal
