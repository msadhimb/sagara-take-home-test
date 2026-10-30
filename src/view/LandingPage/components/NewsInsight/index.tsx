import Image from "next/image"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const articles = [
  {
    image: "/assets/spaces/image-2.png",
    meta: "Benefit - 04 June 2023",
    title: "Does productivity increase when working remotely ?",
    excerpt:
      "NEW YORK—A 6-year-old horse died after being injured in a race at Belmont Park ahead of next week's.",
  },
  {
    image: "/assets/spaces/image-1.png",
    meta: "Benefit - 04 June 2023",
    title: "Morning routine to boost your mood",
    excerpt:
      "NEW YORK—A 6-year-old horse died after being injured in a race at Belmont Park ahead of next week's.",
  },
  {
    image: "/assets/spaces/image-1.png",
    meta: "Benefit - 04 June 2023",
    title: "5+ tips to find comfortable co-working space",
    excerpt:
      "NEW YORK—A 6-year-old horse died after being injured in a race at Belmont Park ahead of next week's.",
  },
]

const NewsInsights = () => {
  return (
    <section className="space-y-6">
      <h2 className="text-lg font-semibold sm:text-xl">
        News, events and insights for you
      </h2>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5 lg:gap-8">
        <div className="space-y-4 lg:col-span-3">
          <div className="divide-y">
            {articles.map((article) => (
              <div
                key={article.title}
                className="flex flex-col gap-3 py-4 first:pt-0 sm:flex-row sm:gap-4"
              >
                <div className="relative h-40 w-full overflow-hidden rounded sm:h-32 sm:w-48 sm:shrink-0 lg:w-64">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="min-w-0 flex-1 space-y-1">
                  <p className="text-xs text-neutral-400 sm:text-sm">
                    {article.meta}
                  </p>
                  <h3 className="text-lg font-semibold sm:text-xl">
                    {article.title}
                  </h3>
                  <p className="text-sm leading-snug text-neutral-500 sm:text-base">
                    {article.excerpt}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Button className="w-full rounded-md bg-primary px-6 py-5 hover:bg-primary/90 sm:w-auto sm:px-10">
            See All Updates
            <ChevronRight className="size-3.5" />
          </Button>
        </div>

        <div className="relative min-h-64 overflow-hidden rounded-md sm:min-h-80 lg:col-span-2">
          <Image
            src="/assets/deals/image-1.jpg"
            alt="Minimal workspace for inspirations"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />

          <span className="absolute top-4 left-4 border border-white/80 px-5 py-1 text-xs tracking-wide text-white">
            TIPS
          </span>

          <div className="absolute bottom-5 left-5 space-y-1 pr-5 text-white">
            <p className="text-xs">Debits – 03 June 2023</p>
            <h3 className="text-xl leading-tight font-semibold sm:text-2xl">
              Minimal workspace for inspirations
            </h3>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NewsInsights
