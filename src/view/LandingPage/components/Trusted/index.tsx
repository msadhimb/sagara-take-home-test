import LogoLoop from "@/components/LogoLoop"
import Image from "next/image"

const logos = [
  { src: "/assets/client/image-1.png", alt: "uber", title: "", width: 50 },
  { src: "/assets/client/image-2.png", alt: "dell", title: "", width: 200 },
  { src: "/assets/client/image-3.png", alt: "samsung", title: "", width: 200 },
  { src: "/assets/client/image-4.png", alt: "nike", title: "", width: 200 },
]

const TrustedBy = () => {
  return (
    <section className="space-y-8 bg-neutral-50 px-4 py-12 text-center">
      <h2 className="text-3xl font-normal">
        <span className="relative inline-block font-bold">
          Trusted
          <svg
            className="absolute -bottom-[7px] left-0 h-[12px] w-full overflow-visible"
            viewBox="0 0 88 12"
            preserveAspectRatio="none"
            fill="none"
          >
            <path
              d="M1 8 C24 1.5 58 1.5 87 9"
              stroke="#E9878D"
              strokeWidth="3.8"
              strokeLinecap="round"
            />
          </svg>
        </span>{" "}
        by <span className="font-bold text-primary">80,000+</span> customers
      </h2>
      <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 py-5">
        <LogoLoop
          logos={logos}
          direction="right"
          focus={1}
          tiltX={0}
          tiltY={0}
          fadeOut
          fadeOutWidth={0.12}
          scrollBoost={0}
          draggable
          intro
          speed={50}
        />
      </div>
    </section>
  )
}

export default TrustedBy
