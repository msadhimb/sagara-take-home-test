import Image from "next/image"
import React from "react"
import HeroForm from "./components/HeroForm"

const Hero = () => {
  return (
    <section className="space-y-10 py-12 md:space-y-24 md:py-24">
      <div className="grid grid-cols-1 items-end gap-6 md:grid-cols-2 md:gap-8 lg:gap-54">
        <h1 className="text-3xl leading-tight font-bold sm:text-4xl lg:text-5xl">
          Discover Your Perfect Workspace at CEO SUITE.
        </h1>
        <p className="text-base md:text-lg">
          Experience the ultimate in flexible, premium workspaces where luxury
          meets productivity—CEO SUITE offers an inspiring environment tailored
          to elevate your business success.
        </p>
      </div>

      <div className="relative flex flex-col items-center gap-6 lg:block">
        <div className="z-10 flex w-full justify-center lg:absolute lg:top-1/2 lg:left-0 lg:w-auto lg:-translate-y-1/2">
          <HeroForm />
        </div>

        <div className="hidden w-full max-w-full lg:ml-auto lg:block lg:max-w-300">
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
