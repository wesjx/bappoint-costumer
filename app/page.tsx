import { Header } from "@/components/header"
import Hero from "@/components/hero"
import Services from "@/components/services"
import Coments from "../components/coments"
import Footer from "@/components/footer"
import { BookingForm } from "@/components/booking/booking-form"
import { BookingProvider } from "@/components/booking/hooks/booking-context"

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header />
      <Hero />
      <Services />
      <BookingProvider>
        <BookingForm />
      </BookingProvider>
      <Coments />
      <Footer />
    </div>

  )
}
