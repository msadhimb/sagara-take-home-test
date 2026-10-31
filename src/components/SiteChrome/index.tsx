"use client"

import { usePathname } from "next/navigation"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

const AUTH_ROUTES = ["/auth"]

const isAuthRoute = (pathname: string) =>
  AUTH_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  )

interface SiteChromeProps {
  children: React.ReactNode
}

const SiteChrome = ({ children }: SiteChromeProps) => {
  const pathname = usePathname()

  if (isAuthRoute(pathname)) return <>{children}</>

  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}

export default SiteChrome
