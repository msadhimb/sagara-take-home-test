import { Briefcase, Earth, Handshake, Landmark, MapPinned } from "lucide-react"

const stats = [
  {
    icon: <Earth className="size-8 shrink-0 lg:size-[50px]" />,
    value: "11",
    label: "Vibrant Cities",
  },
  {
    icon: <MapPinned className="size-8 shrink-0 lg:size-[50px]" />,
    value: "22",
    label: "prime locations in Asia's CBDs",
  },
  {
    icon: <Briefcase className="size-8 shrink-0 lg:size-[50px]" />,
    value: "25",
    label: "years in business",
  },
  {
    icon: <Landmark className="size-8 shrink-0 lg:size-[50px]" />,
    value: "100%",
    label: "grade A+ Buildings",
  },
  {
    icon: <Handshake className="size-8 shrink-0 lg:size-[50px]" />,
    value: "80,000+",
    label: "businesses served",
  },
]

const WhyCeoSuite = () => {
  return (
    <section className="grid grid-cols-1 gap-8 lg:grid-cols-4 lg:gap-10">
      <div className="grid grid-cols-1 content-start gap-x-6 gap-y-8 sm:grid-cols-2 lg:col-span-2 lg:gap-24">
        {stats.map((stat) => (
          <div key={stat.label} className="flex items-start gap-3">
            <span className="text-blue-950">{stat.icon}</span>
            <div>
              <p className="text-xl font-bold text-blue-950">{stat.value}</p>
              <p className="text-xs text-neutral-500">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4 bg-primary p-6 text-white sm:p-10 lg:col-span-2 lg:p-14">
        <div className="flex items-center gap-4 text-sm">
          <span>Why CEO SUITE?</span>
          <span className="h-px w-16 bg-white/70" />
        </div>

        <h2 className="text-3xl leading-tight font-bold sm:text-4xl lg:text-5xl">
          We revolutionize your workspace
        </h2>

        <p className="text-sm leading-relaxed lg:text-base">
          In today&apos;s fast-paced business environment, finding the right
          workspace solution is crucial to your company&apos;s success. CEO
          SUITE offers an unparalleled workspace experience that combines
          premium locations, flexibility, top-notch amenities, and exceptional
          service to meet the needs of modern businesses.
        </p>
        <p className="text-sm leading-relaxed lg:text-base">
          As Asia&apos;s leading serviced office provider, CEO SUITE stands out
          as the ideal partner for companies seeking more than just office
          space—a place where business can thrive.
        </p>
      </div>
    </section>
  )
}

export default WhyCeoSuite
