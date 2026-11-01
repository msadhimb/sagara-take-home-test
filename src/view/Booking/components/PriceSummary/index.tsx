import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/helper/formatCurrency"

export interface PriceSummaryAddOn {
  id: string
  name: string
  qty: number
  amount: number
}

interface PriceSummaryProps {
  productName: string
  period: string
  productAmount: number
  addOns: PriceSummaryAddOn[]
  subtotal: number
  discount: number
  total: number
  disabled?: boolean
  loading?: boolean
  slotError?: string | null
  onContinue: () => void
}

const PriceSummary = ({
  productName,
  period,
  productAmount,
  addOns,
  subtotal,
  discount,
  total,
  disabled,
  loading,
  slotError,
  onContinue,
}: PriceSummaryProps) => {
  return (
    <aside className="lg:sticky lg:top-6 lg:self-start">
      <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-lg">
        <h2 className="text-lg font-semibold text-neutral-900">
          Price Summary
        </h2>

        <ul className="mt-4 space-y-2.5 text-sm">
          <li className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate font-medium text-neutral-900">
                {productName}
              </p>
              <p className="text-xs text-neutral-500">per {period}</p>
            </div>
            <span className="shrink-0 font-medium text-neutral-900">
              {formatCurrency(productAmount)}
            </span>
          </li>

          {addOns.map((addOn) => (
            <li
              key={addOn.id}
              className="flex items-start justify-between gap-3 text-neutral-600"
            >
              <span className="min-w-0 truncate">
                {addOn.name} × {addOn.qty}
              </span>
              <span className="shrink-0">{formatCurrency(addOn.amount)}</span>
            </li>
          ))}
        </ul>

        <div className="mt-4 space-y-2 border-t border-neutral-100 pt-4 text-sm">
          <div className="flex items-center justify-between text-neutral-600">
            <span>Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>

          {discount > 0 ? (
            <div className="flex items-center justify-between text-emerald-700">
              <span>Voucher discount</span>
              <span>-{formatCurrency(discount)}</span>
            </div>
          ) : null}

          <div className="flex items-center justify-between border-t border-neutral-100 pt-2 text-base font-semibold text-neutral-900">
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </div>
        </div>

        {slotError ? (
          <p
            role="alert"
            className="mt-4 flex items-start gap-2 rounded-lg bg-red-50 p-3 text-xs text-red-700"
          >
            <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
            {slotError}
          </p>
        ) : null}

        <Button
          type="button"
          className="mt-5 h-11 w-full"
          onClick={onContinue}
          disabled={disabled || loading}
        >
          {loading ? "Checking availability..." : "Continue to Book"}
        </Button>

        <p className="mt-2 text-center text-xs text-neutral-500">
          You won&apos;t be charged yet
        </p>
      </div>
    </aside>
  )
}

export default PriceSummary
