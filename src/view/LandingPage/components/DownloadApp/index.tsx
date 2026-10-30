import AbstractA from "@/components/Icons/abstract/AbstractA"
import AbstractB from "@/components/Icons/abstract/AbstractB"
import AppStoreBlack from "@/components/Icons/AppStoreBlack"
import Elipse from "@/components/Icons/elipse"
import GooglePlayBlack from "@/components/Icons/GooglePlayBlack"
import PhoneA from "@/components/Icons/phone/PhoneA"
import PhoneB from "@/components/Icons/phone/PhoneB"
import Image from "next/image"

const DownloadApp = () => {
  return (
    <section className="relative h-140 overflow-hidden bg-linear-to-b from-primary/5 to-primary/15 px-6 pt-12 md:px-12">
      <div className="absolute bottom-0 left-0 z-0">
        <AbstractB />
      </div>
      <div className="relative z-25 flex h-full flex-col justify-center space-y-4 p-25">
        <h2 className="text-4xl font-bold text-primary">
          Download the CEO SUITE App Now!
        </h2>
        <p className="text-lg text-neutral-600">
          Simplify your meeting planning with our app. Download now to enjoy
          seamless booking and more.
        </p>

        <div className="flex items-center gap-3">
          <AppStoreBlack />
          <GooglePlayBlack />
        </div>
      </div>

      <div className="absolute right-0 bottom-0 z-2">
        <Elipse />
      </div>
      <div className="absolute right-0 -bottom-80 z-2 rotate-90">
        <AbstractA />
      </div>
      <div className="absolute right-92 bottom-0 z-2">
        <PhoneA />
      </div>
      <div className="absolute -top-20 right-0 z-2">
        <PhoneB />
      </div>
    </section>
  )
}

export default DownloadApp
