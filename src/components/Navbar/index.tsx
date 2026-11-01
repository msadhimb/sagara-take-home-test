"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Book,
  Building2,
  CalendarCheck,
  Circle,
  Home,
  LayoutGrid,
  Newspaper,
  Package,
  Sunset,
  TicketPercent,
  Trees,
  Zap,
  type LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { useAuthStore } from "@/view/Auth/store"
import Logo from "../Icons/logo"
import NavGlass from "./components/NavGlass"
import renderMenuItem from "./components/RenderMenuItem"
import type { MenuItem, Navbar1Props } from "./type"

const memberMenu: MenuItem[] = [
  { title: "Home", url: "/" },
  { title: "My Booking", url: "/my-booking" },
]

// Ikon dock per judul menu
const dockIcons: Record<string, LucideIcon> = {
  Home,
  "My Booking": CalendarCheck,
  Workspace: Building2,
  Services: LayoutGrid,
  Package,
  "Promotion & Deals!": TicketPercent,
  News: Newspaper,
}

const isActive = (url: string, pathname: string) => {
  if (!url || url === "#") return false
  if (url === "/") return pathname === "/"
  return pathname === url || pathname.startsWith(`${url}/`)
}

const withActive = (items: MenuItem[], pathname: string): MenuItem[] =>
  items.map((item) => ({
    ...item,
    active: isActive(item.url, pathname),
    items: item.items ? withActive(item.items, pathname) : undefined,
  }))

const Navbar = ({
  menu = [
    { title: "Workspace", url: "#" },
    {
      title: "Services",
      url: "#",
      items: [
        {
          title: "Blog",
          description: "The latest industry news, updates, and info",
          icon: <Book className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Company",
          description: "Our mission is to innovate and empower the world",
          icon: <Trees className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Careers",
          description: "Browse job listing and discover our workspace",
          icon: <Sunset className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Support",
          description:
            "Get in touch with our support team or visit our community forums",
          icon: <Zap className="size-5 shrink-0" />,
          url: "#",
        },
      ],
    },
    {
      title: "Package",
      url: "#",
      items: [
        {
          title: "Help Center",
          description: "Get all the answers you need right here",
          icon: <Zap className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Contact Us",
          description: "We are here to help you with any questions you have",
          icon: <Sunset className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Status",
          description: "Check the current status of our services and APIs",
          icon: <Trees className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Terms of Service",
          description: "Our terms and conditions for using our services",
          icon: <Book className="size-5 shrink-0" />,
          url: "#",
        },
      ],
    },
    { title: "Promotion & Deals!", url: "#" },
    { title: "News", url: "#" },
  ],
  auth = {
    login: { title: "Login", url: "/auth?mode=login" },
    signup: { title: "Sign up", url: "/auth?mode=register" },
  },
  className,
}: Navbar1Props) => {
  const pathname = usePathname()
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)

  const [mounted, setMounted] = useState(false)
  const [subMenu, setSubMenu] = useState<MenuItem | null>(null)
  const [accountOpen, setAccountOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const menuItems = withActive(user ? memberMenu : menu, pathname)

  const initials = user
    ? user.name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() ?? "")
        .join("")
    : ""

  const entrance = cn(
    "transition-[opacity,transform,visibility] duration-500 ease-out motion-reduce:transition-none",
    mounted
      ? "visible translate-y-0 opacity-100"
      : "invisible -translate-y-2 opacity-0"
  )

  return (
    <>
      <header
        className={cn(
          "pointer-events-none sticky top-0 z-50 hidden px-6 pt-3 lg:block",
          entrance,
          className
        )}
      >
        <div className="container mx-auto">
          <nav className="pointer-events-auto relative flex items-center justify-between gap-4 rounded-2xl px-5 py-3">
            <div
              className="pointer-events-none absolute inset-0"
              aria-hidden="true"
            >
              <NavGlass borderRadius={16} />
            </div>

            <Link href="/" className="relative flex items-center gap-2">
              <Logo />
            </Link>

            <div className="relative flex min-w-0 items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {menuItems.map((item) => renderMenuItem(item))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            <div className="relative flex shrink-0 items-center gap-5 font-medium">
              {user ? (
                <div className="flex items-center gap-2.5">
                  <span className="grid size-9 place-items-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                    {initials}
                  </span>
                  <span className="max-w-40 truncate text-sm font-semibold text-neutral-800">
                    {user.name}
                  </span>
                </div>
              ) : (
                <>
                  <Link
                    href={auth.login.url}
                    className="rounded-sm text-primary"
                  >
                    {auth.login.title}
                  </Link>
                  <Button asChild size="lg" className="rounded-sm">
                    <Link href={auth.signup.url}>{auth.signup.title}</Link>
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      </header>

      <header
        className={cn(
          "pointer-events-none sticky top-0 z-50 px-3 pt-[max(0.75rem,env(safe-area-inset-top))] lg:hidden",
          entrance,
          className
        )}
      >
        <div className="pointer-events-auto relative flex items-center justify-between rounded-2xl px-4 py-2.5">
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
          >
            <NavGlass borderRadius={16} />
          </div>

          <Link href="/" className="relative flex items-center gap-2">
            <Logo size={25} />
          </Link>

          {user ? (
            <button
              type="button"
              onClick={() => setAccountOpen(true)}
              aria-label="Account"
              className="relative grid size-9 place-items-center rounded-full bg-primary text-sm font-semibold text-primary-foreground transition-transform active:scale-90"
            >
              {initials}
            </button>
          ) : (
            <div className="relative flex items-center gap-3 text-sm font-medium">
              <Link href={auth.login.url} className="text-primary">
                {auth.login.title}
              </Link>
              <Button asChild size="sm" className="rounded-sm">
                <Link href={auth.signup.url}>{auth.signup.title}</Link>
              </Button>
            </div>
          )}
        </div>
      </header>

      <nav
        aria-label="Dock"
        className={cn(
          "pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center px-3 lg:hidden",
          "pb-[max(0.75rem,env(safe-area-inset-bottom))]",
          "transition-[opacity,transform,visibility] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
          mounted
            ? "visible translate-y-0 opacity-100"
            : "invisible translate-y-6 opacity-0"
        )}
      >
        <div className="pointer-events-auto relative flex items-end gap-1 rounded-[28px] px-2 py-2">
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
          >
            <NavGlass borderRadius={28} />
          </div>

          {menuItems.map((item) => {
            const Icon = dockIcons[item.title] ?? Circle
            const hasChildren = Boolean(item.items?.length)
            const activeItem =
              item.active || item.items?.some((sub) => sub.active)

            const itemClass = cn(
              "relative flex size-12 flex-col items-center justify-center gap-0.5 rounded-2xl",
              "transition-[transform,background-color,color] duration-300 ease-out",
              "active:scale-90 motion-reduce:transition-none",
              activeItem
                ? "text-primary"
                : "text-neutral-600 hover:text-red-500"
            )

            const content = (
              <>
                <Icon className="size-5" />
                <span className="max-w-full truncate text-[9px] leading-none font-medium">
                  {item.title.replace("Promotion & Deals!", "Promo")}
                </span>
              </>
            )

            return hasChildren ? (
              <button
                key={item.title}
                type="button"
                aria-label={item.title}
                aria-haspopup="dialog"
                onClick={() => setSubMenu(item)}
                className={itemClass}
              >
                {content}
              </button>
            ) : (
              <Link
                key={item.title}
                href={item.url}
                aria-label={item.title}
                aria-current={item.active ? "page" : undefined}
                className={itemClass}
              >
                {content}
              </Link>
            )
          })}
        </div>
      </nav>

      <Sheet
        open={Boolean(subMenu)}
        onOpenChange={(open) => {
          if (!open) setSubMenu(null)
        }}
      >
        <SheetContent
          side="bottom"
          className="max-h-[75vh] overflow-y-auto rounded-t-2xl pb-[max(1rem,env(safe-area-inset-bottom))]"
        >
          <SheetHeader>
            <SheetTitle>{subMenu?.title}</SheetTitle>
            <SheetDescription className="sr-only">
              {subMenu?.title} links
            </SheetDescription>
          </SheetHeader>

          <ul className="flex flex-col gap-1 px-4 pb-4">
            {subMenu?.items?.map((sub) => (
              <li key={sub.title}>
                <Link
                  href={sub.url}
                  onClick={() => setSubMenu(null)}
                  className={cn(
                    "flex items-start gap-4 rounded-md p-3 transition-colors hover:bg-muted",
                    sub.active && "text-primary"
                  )}
                >
                  <span className="mt-0.5">{sub.icon}</span>
                  <span>
                    <span className="block text-sm font-semibold">
                      {sub.title}
                    </span>
                    {sub.description ? (
                      <span className="block text-sm leading-snug text-muted-foreground">
                        {sub.description}
                      </span>
                    ) : null}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </SheetContent>
      </Sheet>

      {user ? (
        <Sheet open={accountOpen} onOpenChange={setAccountOpen}>
          <SheetContent
            side="bottom"
            className="rounded-t-2xl pb-[max(1rem,env(safe-area-inset-bottom))]"
          >
            <SheetHeader>
              <SheetTitle>Account</SheetTitle>
              <SheetDescription className="sr-only">
                Your account details
              </SheetDescription>
            </SheetHeader>

            <div className="flex flex-col gap-3 px-4 pb-4">
              <div className="flex items-center gap-3 rounded-sm border border-primary/10 p-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                  {initials}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-neutral-800">
                    {user.name}
                  </p>
                  <p className="truncate text-xs text-neutral-500">
                    {user.email}
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                onClick={() => {
                  setAccountOpen(false)
                  logout()
                }}
              >
                Logout
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      ) : null}
    </>
  )
}

export default Navbar
