import type { ReactNode } from "react"

export interface MenuItem {
  title: string
  url: string
  description?: string
  icon?: ReactNode
  items?: MenuItem[]
  active?: boolean
}

export interface Navbar1Props {
  className?: string
  logo?: {
    url: string
    src: string
    alt: string
    title: string
    size?: number
    className?: string
  }
  menu?: MenuItem[]
  auth?: {
    login: {
      title: string
      url: string
    }
    signup: {
      title: string
      url: string
    }
  }
}
