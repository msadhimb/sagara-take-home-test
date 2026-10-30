import { Briefcase, Earth, Handshake, Landmark, MapPinned } from "lucide-react"

const stats = [
  { icon: <Earth size={50} />, value: "11", label: "Vibrant Cities" },
  {
    icon: <MapPinned size={50} />,
    value: "22",
    label: "prime locations in Asia's CBDs",
  },
  {
    icon: <Briefcase size={50} />,
    value: "25",
    label: "years in business",
  },
  {
    icon: <Landmark size={50} />,
    value: "100%",
    label: "grade A+ Buildings",
  },
  {
    icon: <Handshake size={50} />,
    value: "80,000+",
    label: "businesses served",
  },
]

const WhyCeoSuite = () => {
  return (
    <section className="grid grid-cols-1 gap-10 md:grid-cols-4">
      <div className="grid grid-cols-2 content-start gap-24 md:col-span-2">
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

      <div className="space-y-4 bg-primary p-14 text-white md:col-span-2">
        <div className="flex items-center gap-4 text-sm">
          <span>Why CEO SUITE?</span>
          <span className="h-px w-16 bg-white/70" />
        </div>

        <h2 className="text-5xl leading-tight font-bold">
          We revolutionize your workspace
        </h2>

        <p className="text-md leading-relaxed">
          In today&apos;s fast-paced business environment, finding the right
          workspace solution is crucial to your company&apos;s success. CEO
          SUITE offers an unparalleled workspace experience that combines
          premium locations, flexibility, top-notch amenities, and exceptional
          service to meet the needs of modern businesses.
        </p>
        <p className="text-md leading-relaxed">
          As Asia&apos;s leading serviced office provider, CEO SUITE stands out
          as the ideal partner for companies seeking more than just office
          space—a place where business can thrive.
        </p>
      </div>
    </section>
  )
}

export default WhyCeoSuite
