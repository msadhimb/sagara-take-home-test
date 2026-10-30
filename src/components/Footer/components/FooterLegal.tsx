import { FooterLink } from "../type"

interface FooterLegalProps {
  copyright?: string
  legalLinks?: FooterLink[]
}

const FooterLegal = ({ copyright, legalLinks }: FooterLegalProps) => {
  return (
    <div className="mt-8 flex flex-col justify-between gap-4 border-t border-border pt-8 text-xs font-medium text-muted-foreground md:flex-row md:items-center">
      <p>{copyright}</p>
      <ul className="flex gap-4">
        {legalLinks?.map((link, linkIdx) => (
          <li key={linkIdx} className="underline hover:text-primary">
            <a href={link.href}>{link.name}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FooterLegal
