'use client'
import { Form } from "../ui/form";
import { SelectDate } from "./components/select-date";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SelectServices } from "./components/select-service";
import { BookingServices } from "./components/booking-services";
import { BookingFormType, formSchema } from "@/types/booking-form";
import BookingSummary from "./components/booking-summary";
import { useBookingForm } from "./hooks/booking-context";

export function BookingForm() {
    const { onSubmit
    } = useBookingForm()

    const form = useForm<BookingFormType>({
        resolver: zodResolver(formSchema)
    })

    return (
        <div id="booking">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>

                    <section id="bookings" className="w-full py-12 md:py-24 lg:py-32 bg-slate-50">
                        <div className="container px-4 md:px-6 mx-auto">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl font-bold tracking-tighter text-slate-900 mb-4">Schedule your appointment</h2>
                                <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                                    Choose the date, time, and services you want. Pay just 50% to confirm your appointment.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">

                                <SelectDate form={form} />

                                <SelectServices form={form} />
                                <BookingSummary />
                            </div>
                        </div>
                    </section>

                    <section id="services" className="w-full py-12 md:py-24 lg:py-32 bg-white">
                        <div className="container px-4 md:px-6 mx-auto">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl font-bold tracking-tighter text-slate-900 mb-4">Our Services</h2>
                                <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                                    We offer a full range of services to keep your vehicle always impeccable
                                </p>
                                <BookingServices />
                            </div>
                        </div>
                    </section>

                </form>
            </Form>
        </div>
    )
}