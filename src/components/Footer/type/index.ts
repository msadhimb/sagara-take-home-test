export interface FooterLink {
  name: string
  href: string
}

export interface FooterSection {
  title: string
  links: FooterLink[]
}

export interface FooterLogo {
  url: string
  src: string
  alt: string
  title: string
}

export interface FooterProps {
  logo?: FooterLogo
  description?: string
  sections?: FooterSection[]
  copyright?: string
  legalLinks?: FooterLink[]
  className?: string
  logoClassName?: string
}

export type Props = Partial<FooterProps>
