"use client"

import { useEffect, useRef } from "react"
import { Check, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"

interface SuccessModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  actionLabel: string
  onAction: () => void
  description?: string
}

const SuccessModal = ({
  open,
  onOpenChange,
  title,
  actionLabel,
  onAction,
  description,
}: SuccessModalProps) => {
  const actionRef = useRef<HTMLButtonElement>(null)

  const handleAction = () => {
    onAction()
  }

  useEffect(() => {
    if (open) {
      actionRef.current?.focus()
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        {...(description ? {} : { "aria-describedby": undefined })}
        showCloseButton={false}
        overlayClassName="bg-neutral-900/50"
        onInteractOutside={(event) => event.preventDefault()}
        onEscapeKeyDown={(event) => event.preventDefault()}
        className="flex w-[calc(100%-2rem)] max-w-[400px] flex-col items-center gap-0 rounded-3xl bg-white p-8 text-center shadow-xl ring-0 sm:max-w-[400px]"
      >
        <div
          aria-hidden="true"
          className="flex size-[120px] items-center justify-center rounded-full bg-emerald-50"
        >
          <div className="flex size-[88px] items-center justify-center rounded-full bg-linear-to-br from-emerald-400 to-emerald-600">
            <Check className="size-10 text-white" strokeWidth={3.5} />
          </div>
        </div>

        <DialogTitle className="mt-6 text-xl font-bold text-neutral-800">
          {title}
        </DialogTitle>

        {description && (
          <DialogDescription className="mt-2 text-sm text-neutral-500">
            {description}
          </DialogDescription>
        )}

        <Button
          ref={actionRef}
          type="button"
          onClick={handleAction}
          className="mt-6 h-11 w-full rounded-md bg-primary/10 px-4 text-sm font-medium text-primary hover:bg-primary/20"
        >
          {actionLabel}
          <ChevronRight className="size-4" aria-hidden="true" />
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export default SuccessModal
