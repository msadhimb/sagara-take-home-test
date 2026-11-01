import { useActionModal } from "./store"
import Link from "next/link"
import { Check, ChevronRight } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog"
import { cn } from "@/lib/utils"

const ActionModal = () => {
  const { modalActions, closeModalActions } = useActionModal()
  const { success, isOpen, descText, infoText, link, closeButton } =
    modalActions

  const buttonText = link?.text || "Close"
  const buttonClass =
    "flex h-11 w-full items-center justify-center gap-1.5 rounded-md bg-primary/10 text-sm font-medium text-primary transition-colors hover:bg-primary/20"

  const handleClose = () => {
    if (modalActions.onConfirm) {
      modalActions.onConfirm()
    }
    closeModalActions()
  }

  const renderIcon = () => {
    if (success) {
      return (
        <div
          aria-hidden
          className="flex size-30 items-center justify-center rounded-full bg-emerald-50"
        >
          <div className="flex size-22 items-center justify-center rounded-full bg-linear-to-b from-emerald-400 to-emerald-600">
            <Check className="size-10 text-white" strokeWidth={3} />
          </div>
        </div>
      )
    }

    return (
      <div
        aria-hidden
        className="flex size-30 items-center justify-center rounded-full bg-red-50"
      >
        <div className="flex size-22 items-center justify-center rounded-full bg-linear-to-b from-red-400 to-red-600">
          <span className="text-4xl leading-none font-bold text-white">!</span>
        </div>
      </div>
    )
  }

  const renderAction = () => {
    if (link?.direct) {
      return (
        <Link
          href={link.direct}
          replace={link.replace}
          onClick={handleClose}
          className={buttonClass}
        >
          <span className="truncate">{buttonText}</span>
          <ChevronRight className="size-4 shrink-0" aria-hidden />
        </Link>
      )
    }

    return (
      <button type="button" onClick={handleClose} className={buttonClass}>
        <span className="truncate">{buttonText}</span>
        <ChevronRight className="size-4 shrink-0" aria-hidden />
      </button>
    )
  }

  return (
    <Dialog
      modal
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) handleClose()
      }}
    >
      <DialogContent
        onInteractOutside={(event) => event.preventDefault()}
        className={cn(
          "m-0 flex w-full max-w-100 flex-col items-center gap-6 rounded-3xl border-none bg-white p-8 text-center"
        )}
      >
        {renderIcon()}

        <div className="flex flex-col gap-2">
          <DialogTitle className="text-xl font-bold text-neutral-800">
            {descText}
          </DialogTitle>

          {infoText ? (
            <DialogDescription
              className={cn(
                "text-sm",
                success ? "text-neutral-500" : "text-red-500"
              )}
            >
              {infoText}
            </DialogDescription>
          ) : (
            <DialogDescription className="sr-only">
              {descText}
            </DialogDescription>
          )}
        </div>

        {renderAction()}
      </DialogContent>
    </Dialog>
  )
}

export default ActionModal
