import type { ReactNode } from "react"
import { Button } from "@/components/ui/button"

type SectionHeaderProps = {
  icon?: ReactNode
  title: string
  subtitle: string
  button?: ReactNode
}

// Header yang dipakai di Promotions dan Best Deals
const SectionHeader = ({
  icon,
  title,
  subtitle,
  button,
}: SectionHeaderProps) => {
  return (
    <div className="flex w-full items-start justify-between gap-4">
      <div className="space-y-1">
        {/* Ikon bulat + judul */}
        <div className="flex items-center gap-2">
          {icon && (
            <span className="flex size-7 items-center justify-center rounded-full bg-primary/10 text-primary">
              {icon}
            </span>
          )}
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>
        <p className="text-sm text-neutral-500">{subtitle}</p>
      </div>

      {/* Tombol "See All" */}
      {button &&
        // <Button
        //   variant="ghost"
        //   size="sm"
        //   className="bg-primary/10 text-xs text-primary hover:bg-primary/20 hover:text-primary"
        // >
        //   {buttonText}
        // </Button>
        button}
    </div>
  )
}

export default SectionHeader
