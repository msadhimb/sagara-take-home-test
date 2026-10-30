import Hero from "@/view/LandingPage/components/Hero"
import Spaces from "./components/Spaces"
import Recommended from "./components/Recomended"
import WhyCeoSuite from "./components/WhyCEOSuite"
import Promotions from "./components/Promotions"
import BestDeals from "./components/BestDeals"
import MeetingRoomPackage from "./components/MeetingRoomPackage"
import CorporatePartners from "./components/CorporatePartners"
import TrustedBy from "./components/Trusted"
import NewsInsights from "./components/NewsInsight"
import Faq from "./components/Faq"
import DownloadApp from "./components/DownloadApp"

const LandingPage = () => {
  return (
    <div className="space-y-16 overflow-x-hidden sm:space-y-24 lg:space-y-44">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Hero />
        <div className="space-y-16 sm:space-y-24 lg:space-y-44">
          <Spaces />
          <Recommended />
          <WhyCeoSuite />
          <Promotions />
          <BestDeals />
          <MeetingRoomPackage />
          <CorporatePartners />
        </div>
      </div>

      <TrustedBy />

      <div className="container mx-auto space-y-16 px-4 sm:space-y-24 sm:px-6 lg:space-y-44 lg:px-8">
        <NewsInsights />
        <Faq />
      </div>

      <DownloadApp />
    </div>
  )
}

export default LandingPage
