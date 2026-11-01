"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Controller, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { AlertCircle, ArrowLeft } from "lucide-react"
import { useActionModal } from "@/components/ActionModal/store"
import { Button } from "@/components/ui/button"
import type { Voucher } from "@/data/vouchers"
import { calculateTotal } from "@/helper/pricing"
import {
  checkAvailability,
  createBooking,
  getAvailableVouchers,
  getProduct,
} from "@/lib/booking"
import { useAuthStore } from "@/view/Auth/store"
import FormTextArea from "@/components/Form/FormTextArea"
import AddOnsModal from "./components/AddOnsModal"
import AddOnsSelector from "./components/AddOnsSelector"
import BookingSummaryCard from "./components/BookingSummaryCard"
import ConfirmBookingModal from "./components/ConfirmBookingModal"
import PriceSummary from "./components/PriceSummary"
import VoucherSelector from "./components/VoucherSelector"
import { useBookingStore } from "./store"
import { bookingSchema, type BookingFormValues } from "./validation"

const BookingView = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const user = useAuthStore((state) => state.user)
  const addBooking = useAuthStore((state) => state.addBooking)
  const openModalActions = useActionModal((state) => state.openModalActions)

  const productId = searchParams.get("productId") ?? ""
  const date = searchParams.get("date") ?? ""
  const start = searchParams.get("start") ?? ""
  const end = searchParams.get("end") ?? ""
  const queryString = searchParams.toString()

  const {
    product,
    addOns,
    voucher,
    additionalRequest,
    initialize,
    setAdditionalRequest,
    setAddOns,
    setAddOnQty,
    setVoucher,
  } = useBookingStore()

  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState("")
  const [slotError, setSlotError] = useState<string | null>(null)
  const [checkingSlot, setCheckingSlot] = useState(false)
  const [vouchers, setVouchers] = useState<Voucher[]>([])
  const [addOnsOpen, setAddOnsOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingFormValues>({
    resolver: yupResolver(bookingSchema),
    defaultValues: { additionalRequest: "" },
  })

  const addOnItems = product
    ? product.addOns
        .filter((addOn) => (addOns[addOn.id] ?? 0) > 0)
        .map((addOn) => {
          const qty = addOns[addOn.id] ?? 0

          return {
            id: addOn.id,
            name: addOn.name,
            qty,
            unitPrice: addOn.amount,
            amount: addOn.amount * qty,
          }
        })
    : []

  const productAmount = product?.prices[0]?.amount ?? 0
  const totals = calculateTotal({
    productAmount,
    addOns: addOnItems.map((addOn) => ({
      amount: addOn.unitPrice,
      qty: addOn.qty,
    })),
    voucher: voucher?.voucher ?? null,
  })

  const handleContinue = handleSubmit((values) => {
    if (slotError) return

    setAdditionalRequest(values.additionalRequest)
    setConfirmOpen(true)
  })

  const handleConfirm = async () => {
    if (!product) return

    setSubmitting(true)

    try {
      const state = useBookingStore.getState()
      const booking = await createBooking({
        productId: product.id,
        date,
        start,
        end,
        additionalRequest: state.additionalRequest,
        addOns: Object.entries(state.addOns).map(([id, qty]) => ({
          id,
          qty,
        })),
        voucherCode: state.voucher?.voucher.code,
      })

      addBooking(booking)
      setConfirmOpen(false)
      router.push(`/booking/success?ref=${booking.reference}`)
    } catch (error) {
      setConfirmOpen(false)
      openModalActions({
        success: false,
        descText: "Booking failed",
        infoText:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
      })
    } finally {
      setSubmitting(false)
    }
  }

  useEffect(() => {
    if (user) return

    const next = queryString ? `/booking?${queryString}` : "/booking"
    router.replace(`/auth?mode=login&next=${encodeURIComponent(next)}`)
  }, [user, router, queryString])

  useEffect(() => {
    if (!user) return

    if (!productId || !date || !start || !end) {
      setLoadError(
        "Booking details are incomplete. Please choose a room, date, and time first."
      )
      setLoading(false)
      return
    }

    let active = true
    setLoading(true)
    setLoadError("")

    getProduct(productId)
      .then((nextProduct) => {
        if (!active) return
        initialize({ product: nextProduct, date, start, end })
        setSlotError(null)
      })
      .catch(() => {
        if (!active) return
        setLoadError(
          "We couldn't find this room. It may no longer be available."
        )
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [user, productId, date, start, end, initialize])

  useEffect(() => {
    if (!product) return

    let active = true

    getAvailableVouchers(product.id).then((items) => {
      if (active) setVouchers(items)
    })

    return () => {
      active = false
    }
  }, [product])

  useEffect(() => {
    if (!product) return

    let active = true
    setCheckingSlot(true)

    checkAvailability({ productId: product.id, date, start, end })
      .then((result) => {
        if (!active) return
        setSlotError(
          result.available
            ? null
            : (result.message ?? "This time slot is not available")
        )
      })
      .finally(() => {
        if (active) setCheckingSlot(false)
      })

    return () => {
      active = false
    }
  }, [product, date, start, end])

  if (!user) return null

  if (loading) {
    return (
      <div className="container mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="h-8 w-56 animate-pulse rounded bg-neutral-200" />
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="space-y-5">
            <div className="h-56 animate-pulse rounded-xl bg-neutral-200" />
            <div className="h-40 animate-pulse rounded-xl bg-neutral-200" />
          </div>
          <div className="h-80 animate-pulse rounded-xl bg-neutral-200" />
        </div>
      </div>
    )
  }

  if (loadError || !product) {
    return (
      <div className="container mx-auto max-w-xl px-4 py-16 text-center">
        <AlertCircle className="mx-auto size-10 text-primary" aria-hidden />
        <h1 className="mt-4 text-xl font-semibold text-neutral-900">
          Unable to continue booking
        </h1>
        <p className="mt-2 text-sm text-neutral-600">
          {loadError || "This room is no longer available."}
        </p>
        <Button asChild className="mt-6">
          <Link href="/">Browse rooms</Link>
        </Button>
      </div>
    )
  }

  return (
    <>
      <div className="container mx-auto space-y-5 px-4 py-5 sm:px-6 lg:px-8">
        <div className="">
          <Link
            href={`/product/${product.slug}`}
            aria-label="Back to room"
            className="flex w-fit items-center gap-4 text-neutral-800 transition-colors hover:text-primary"
          >
            <ArrowLeft size={24} strokeWidth={1.5} />
            <h1 className="text-xl font-semibold text-neutral-700">
              Fill Booking Details
            </h1>
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-5">
          <div className="col-span-3 space-y-5">
            <BookingSummaryCard
              product={product}
              date={date}
              start={start}
              end={end}
            />

            <Controller
              control={control}
              name="additionalRequest"
              render={({ field }) => (
                <FormTextArea
                  {...field}
                  id="additionalRequest"
                  label="Additional Request (Opsional)"
                  placeholder="Please provide some extra writing papers, thank you"
                  labelClassname="text-lg font-bold"
                  rows={8}
                  error={errors.additionalRequest?.message}
                />
              )}
            />

            <AddOnsSelector
              addOns={product.addOns}
              selected={addOns}
              onChangeQty={setAddOnQty}
              onOpenModal={() => setAddOnsOpen(true)}
            />

            <VoucherSelector
              productId={product.id}
              subtotal={totals.subtotal}
              vouchers={vouchers}
              applied={
                voucher ? { ...voucher, discount: totals.discount } : null
              }
              onApply={setVoucher}
              onRemove={() => setVoucher(null)}
            />
          </div>

          <div className="col-span-2">
            <PriceSummary
              productName={product.name}
              period={product.prices[0]?.period ?? product.period}
              productAmount={totals.productAmount}
              addOns={addOnItems}
              subtotal={totals.subtotal}
              discount={totals.discount}
              total={totals.total}
              disabled={Boolean(slotError)}
              loading={checkingSlot}
              slotError={slotError}
              onContinue={handleContinue}
            />
          </div>
        </div>
      </div>

      {addOnsOpen ? (
        <AddOnsModal
          addOns={product.addOns}
          initial={addOns}
          onApply={(next) => {
            setAddOns(next)
            setAddOnsOpen(false)
          }}
          onClose={() => setAddOnsOpen(false)}
        />
      ) : null}

      {confirmOpen ? (
        <ConfirmBookingModal
          open
          loading={submitting}
          product={product}
          date={date}
          start={start}
          end={end}
          addOns={addOnItems}
          voucherCode={voucher?.voucher.code}
          additionalRequest={additionalRequest}
          productAmount={totals.productAmount}
          subtotal={totals.subtotal}
          discount={totals.discount}
          total={totals.total}
          period={product.prices[0]?.period ?? product.period}
          onClose={() => setConfirmOpen(false)}
          onConfirm={handleConfirm}
        />
      ) : null}
    </>
  )
}

export default BookingView
