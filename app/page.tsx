import { Header } from "@/components/header"
import Hero from "@/components/hero"
import Services from "@/components/services"
import BookingForm from "@/components/booking_form"
import Coments from "../components/coments"
import Footer from "@/components/footer"


export default function Page() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header />
      <Hero />
      <Services />
      <BookingForm />
      <Coments />
      <Footer />
    </div>

  )
}
