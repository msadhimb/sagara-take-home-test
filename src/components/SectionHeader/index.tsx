import type { ReactNode } from "react"

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
    <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
      <div className="min-w-0 space-y-1">
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
      {button && <div className="shrink-0 self-start">{button}</div>}
    </div>
  )
}

export default SectionHeader
