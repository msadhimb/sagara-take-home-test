import Link from "next/link"
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import type { MenuItem } from "../type"
import SubMenuLink from "./SubMenuLink"

const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    const hasActiveChild = item.items.some((sub) => sub.active)

    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger
          className={cn(
            "bg-transparent",
            (item.active || hasActiveChild) && "text-primary"
          )}
        >
          {item.title}
        </NavigationMenuTrigger>
        <NavigationMenuContent className="bg-popover text-popover-foreground">
          {item.items.map((subItem) => (
            <NavigationMenuLink asChild key={subItem.title} className="w-80">
              <SubMenuLink item={subItem} />
            </NavigationMenuLink>
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>
    )
  }

  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink asChild>
        <Link
          href={item.url}
          aria-current={item.active ? "page" : undefined}
          className={cn(
            "group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-muted",
            item.active
              ? "text-primary hover:text-primary"
              : "text-neutral-700 hover:text-accent-foreground"
          )}
        >
          {item.title}
        </Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  )
}

export default renderMenuItem
