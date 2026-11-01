import type { Metadata } from "next"
import NotFoundView from "@/view/NotFound"

export const metadata: Metadata = {
  title: "Page not found | CEO Suite",
}

export default function NotFound() {
  return <NotFoundView />
}
