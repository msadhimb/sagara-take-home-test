"use client"

import { useState } from "react"
import * as yup from "yup"
import { Check, ChevronRight, Percent, X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import type { Voucher } from "@/data/vouchers"
import { formatCurrency } from "@/helper/formatCurrency"
import { validateVoucher } from "@/lib/booking"
import { cn } from "@/lib/utils"
import type { AppliedVoucher } from "../../store/type"
import { voucherSchema } from "../../validation"

interface VoucherModalProps {
  productId: string
  subtotal: number
  vouchers: Voucher[]
  applied: AppliedVoucher | null
  onApply: (voucher: AppliedVoucher) => void
  onRemove: () => void
  onClose: () => void
}

const formatDate = (value?: string | Date) =>
  value
    ? new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }).format(new Date(value))
    : null

const VoucherModal = ({
  productId,
  subtotal,
  vouchers,
  applied,
  onApply,
  onRemove,
  onClose,
}: VoucherModalProps) => {
  const [code, setCode] = useState("")
  const [selectedId, setSelectedId] = useState<string | null>(
    applied?.voucher.id ?? null
  )
  const [detailId, setDetailId] = useState<string | null>(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const applyByCode = async (raw: string) => {
    setLoading(true)
    setError("")

    try {
      const result = await validateVoucher(productId, raw, subtotal)

      if (result.valid && result.voucher) {
        onApply({ voucher: result.voucher, discount: result.discount ?? 0 })
        onClose()
        return
      }

      setError(result.message ?? "Voucher is not valid")
    } catch {
      setError("Unable to check the voucher. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleApplyClick = async () => {
    try {
      const values = await voucherSchema.validate({ code })
      await applyByCode(values.code)
    } catch (validationError) {
      if (validationError instanceof yup.ValidationError) {
        setError(validationError.message)
      }
    }
  }

  const handleSave = async () => {
    if (!selectedId) {
      if (applied) onRemove()
      onClose()
      return
    }

    if (selectedId === applied?.voucher.id) {
      onClose()
      return
    }

    const voucher = vouchers.find((item) => item.id === selectedId)
    if (voucher) await applyByCode(voucher.code)
  }

  const toggleSelect = (id: string) => {
    setError("")
    setSelectedId((current) => (current === id ? null : id))
  }

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) onClose()
      }}
    >
      <DialogContent
        showCloseButton={false}
        className="max-w-[calc(100%-2rem)] gap-5 rounded-2xl p-0 sm:max-w-3xl"
      >
        {/* Header */}
        <DialogHeader className="flex-row items-center justify-between space-y-0 px-6 pt-6 pb-4">
          <DialogTitle className="text-xl font-semibold text-neutral-700">
            Add Voucher
          </DialogTitle>
          <DialogDescription className="sr-only">
            Enter a voucher code or pick one of the available vouchers.
          </DialogDescription>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-sm text-neutral-600 transition-colors hover:text-neutral-900 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
          >
            <X size={26} strokeWidth={1.5} />
          </button>
        </DialogHeader>

        <div className="px-6">
          {/* Input kode */}
          <div className="flex gap-3">
            <Input
              value={code}
              onChange={(event) => {
                setCode(event.target.value)
                setError("")
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault()
                  void handleApplyClick()
                }
              }}
              placeholder="Apply Voucher Code"
              aria-label="Voucher code"
              aria-invalid={Boolean(error)}
              className="h-10 rounded-md bg-white text-sm"
            />
            <button
              type="button"
              onClick={handleApplyClick}
              disabled={loading}
              className="h-10 shrink-0 rounded-md bg-primary px-5 text-sm font-medium text-white transition-colors hover:bg-primary/90 disabled:opacity-60"
            >
              {loading ? "..." : "Apply"}
            </button>
          </div>

          {error ? (
            <p role="alert" className="mt-2 text-xs text-destructive">
              {error}
            </p>
          ) : null}

          {/* Available vouchers */}
          <h3 className="mt-6 mb-3 text-base font-semibold text-neutral-700">
            Available Vouchers
          </h3>

          {vouchers.length === 0 ? (
            <p className="rounded-lg border border-dashed border-neutral-200 p-4 text-sm text-neutral-500">
              No vouchers are available for this room type.
            </p>
          ) : (
            <ul className="grid max-h-[45vh] grid-cols-1 gap-3 overflow-y-auto p-1 sm:grid-cols-2">
              {vouchers.map((voucher) => {
                const selected = selectedId === voucher.id
                const until = formatDate(
                  (voucher as { validUntil?: string }).validUntil
                )

                return (
                  <li
                    key={voucher.id}
                    className={cn(
                      "relative overflow-hidden rounded-md border bg-white shadow-sm transition-colors",
                      selected ? "border-primary" : "border-transparent"
                    )}
                  >
                    {/* dekorasi hijau tipis di kiri */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-green-100/70 to-transparent"
                    />

                    <div className="relative px-3 pt-3">
                      <div className="flex items-start gap-2">
                        <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-green-300 text-green-900">
                          <Percent size={11} strokeWidth={3} aria-hidden />
                        </span>

                        <div className="min-w-0 flex-1">
                          <p className="text-md truncate font-semibold text-neutral-800">
                            {voucher.title}
                          </p>
                          {until ? (
                            <p className="text-sm text-neutral-400">
                              Until {until}
                            </p>
                          ) : null}
                        </div>

                        <button
                          type="button"
                          role="checkbox"
                          aria-checked={selected}
                          aria-label={`Select ${voucher.title}`}
                          onClick={() => toggleSelect(voucher.id)}
                          className={cn(
                            "grid size-4 shrink-0 place-items-center rounded-[3px] border transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none",
                            selected
                              ? "border-primary bg-primary text-white"
                              : "border-primary bg-white"
                          )}
                        >
                          {selected ? (
                            <Check size={12} strokeWidth={3} />
                          ) : null}
                        </button>
                      </div>

                      {detailId === voucher.id ? (
                        <div className="mt-2 space-y-0.5 text-[10px] text-neutral-500">
                          <p>
                            {voucher.type === "percentage"
                              ? `${voucher.value}% off`
                              : `${formatCurrency(voucher.value)} off`}
                          </p>
                          {voucher.minTransaction > 0 ? (
                            <p>
                              Min. transaction{" "}
                              {formatCurrency(voucher.minTransaction)}
                            </p>
                          ) : null}
                          <p>Code: {voucher.code}</p>
                        </div>
                      ) : null}
                    </div>

                    {/* garis putus-putus + Detail */}
                    <div className="relative mt-3 border-t border-dashed border-neutral-200 px-3 py-2">
                      <button
                        type="button"
                        onClick={() =>
                          setDetailId((current) =>
                            current === voucher.id ? null : voucher.id
                          )
                        }
                        aria-expanded={detailId === voucher.id}
                        className="ml-auto flex items-center gap-0.5 text-sm font-semibold text-primary hover:underline"
                      >
                        Detail
                        <ChevronRight size={12} />
                      </button>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-center px-6 pt-6 pb-6">
          <button
            type="button"
            onClick={handleSave}
            disabled={loading}
            className="h-11 w-full max-w-60 rounded-md bg-primary/10 text-base font-medium text-primary transition-colors hover:bg-primary/20 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none disabled:opacity-60"
          >
            Save
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default VoucherModal
