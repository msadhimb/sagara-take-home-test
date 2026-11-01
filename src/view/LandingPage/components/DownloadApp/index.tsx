import AbstractA from "@/components/Icons/abstract/AbstractA"
import AbstractB from "@/components/Icons/abstract/AbstractB"
import AppStoreBlack from "@/components/Icons/AppStoreBlack"
import Elipse from "@/components/Icons/elipse"
import GooglePlayBlack from "@/components/Icons/GooglePlayBlack"
import PhoneA from "@/components/Icons/phone/PhoneA"
import PhoneB from "@/components/Icons/phone/PhoneB"

const DownloadApp = () => {
  return (
    <section className="relative grid grid-cols-1 overflow-hidden bg-linear-to-b from-primary/5 to-primary/15 px-4 py-10 sm:px-6 sm:py-12 md:h-140 md:px-12 md:pt-12 md:pb-0 lg:grid-cols-2">
      {/* LEFT */}
      <div>
        <div className="absolute bottom-0 left-0 z-0 hidden md:block">
          <AbstractB />
        </div>
        <div className="relative z-10 flex max-w-lg flex-col justify-center gap-4 sm:max-w-xl sm:gap-5 md:h-full md:max-w-none md:p-25">
          <h2 className="text-2xl font-bold text-primary sm:text-3xl md:text-4xl">
            Download the CEO SUITE App Now!
          </h2>
          <p className="text-sm text-neutral-600 sm:text-base md:text-lg">
            Simplify your meeting planning with our app. Download now to enjoy
            seamless booking and more.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <AppStoreBlack />
            <GooglePlayBlack />
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div>
        <div className="absolute right-0 bottom-0 z-2 hidden md:block">
          <Elipse />
        </div>
        <div className="absolute right-0 -bottom-80 z-2 hidden rotate-90 md:block">
          <AbstractA />
        </div>
        <div className="absolute right-92 bottom-0 z-2 hidden lg:block">
          <PhoneA />
        </div>
        <div className="absolute -top-20 right-0 z-2 hidden lg:block">
          <PhoneB />
        </div>
      </div>
    </section>
  )
}

export default DownloadApp
