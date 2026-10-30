import Image from "next/image"
import React from "react"
import HeroForm from "./components/HeroForm"

const Hero = () => {
  return (
    <section className="space-y-24 py-24">
      <div className="grid grid-cols-1 items-end gap-8 md:grid-cols-2 lg:gap-54">
        <h1 className="text-5xl font-bold">
          Discover Your Perfect Workspace at CEO SUITE.
        </h1>
        <p className="text-md">
          Experience the ultimate in flexible, premium workspaces where luxury
          meets productivity—CEO SUITE offers an inspiring environment tailored
          to elevate your business success.
        </p>
      </div>

      <div className="relative flex flex-col items-center gap-6 md:block">
        <div className="z-10 flex w-full justify-center md:absolute md:top-1/2 md:left-0 md:w-auto md:-translate-y-1/2">
          <HeroForm />
        </div>

        <div className="w-full max-w-300 md:ml-auto">
          <Image
            src="/assets/hero-image.png"
            width={0}
            height={0}
            alt="hero"
            sizes="100vw"
            className="h-auto w-full"
          />
        </div>
      </div>
    </section>
  )
}

export default Hero
