import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import LandingPage from "@/view/LandingPage"

export default function Page() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        <LandingPage />
      </div>
      <Footer />
    </>
  )
}
