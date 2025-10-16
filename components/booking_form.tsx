"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Car } from "lucide-react"
import { Calendar } from "./ui/calendar"
import { Button } from "./ui/button"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem } from "./ui/form"
import { Checkbox } from "./ui/checkbox"
import { servicesData } from "@/app/data/services";
import useSWR from 'swr'
import LoadingIndicator from "./loading-indicator"
import { format } from "date-fns"
import { useEffect } from "react"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const formSchema = z.object({
    booking: z.date(),
    time: z.string().min(1, "Select one time."),
    services: z.array(z.number().int().min(1)),
})

export default function BookingForm() {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
    const [selectedTime, setSelectedTime] = useState<string>("")
    const [selectedServices, setSelectedServices] = useState<number[]>([])

    useEffect(() => {
        if (!localStorage.getItem("booking_id")) {
            const id = crypto.randomUUID()
            localStorage.setItem("booking_id", id)
        }
    }, [])

    const { data, isLoading } = useSWR(
        selectedDate ? `/api/available-times?date=${format(selectedDate, 'yyyy-MM-dd')}` : null,
        fetcher,
        { dedupingInterval: 100_000 } // cache por 5 minutos no client também
    )

    console.log(data)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    const computeTotal = () => {
        return selectedServices.reduce((total, servicoId) => {
            const service = servicesData.find((s) => s.id === servicoId)
            return total + (service?.price || 0)
        }, 0)
    }

    const computeSignal = () => {
        return computeTotal() * 0.5
    }


    async function onSubmit(values: z.infer<typeof formSchema>) {
        const selectedService = servicesData.filter((s) => values.services.includes(s.id))
        const amount = computeSignal()
        const duration = servicesData
            .filter(service => selectedService.map(s => s.id).includes(service.id))
            .map(service => service.duration)
        const totalDuration = duration.reduce((acumulator, currentValue) => acumulator + currentValue, 0)

        const booking_id = localStorage.getItem("booking_id")

        const res = await fetch("/api/stripe/checkout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                amount,
                date: selectedDate,
                time: selectedTime,
                services: selectedService.map((s) => s.name),
                duration: totalDuration,
                booking_id
            })
        })

        const data = await res.json()
        window.location.href = data.url

        console.log(values)
    }

    return (
        <>
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
                                <Card className="border-slate-200">
                                    <CardHeader>
                                        <CardTitle className="text-slate-900">Select date and time</CardTitle>
                                        <CardDescription>Choose the best day and time for you</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <FormField
                                            control={form.control}
                                            name="booking"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Calendar
                                                            mode="single"
                                                            selected={selectedDate}
                                                            onSelect={(date) => {
                                                                field.onChange(date)
                                                                setSelectedDate(date)
                                                            }}
                                                            className="rounded-md border border-slate-200"
                                                            disabled={(date) => date < new Date() || date.getDay() === 0}
                                                        />
                                                    </FormControl>

                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="time"
                                            render={({ field }) => {
                                                return <FormItem>
                                                    <FormControl>
                                                        {selectedDate && (
                                                            <div>
                                                                <h4 className="font-semibold text-slate-900 mb-3">Available Times</h4>
                                                                <div className="grid grid-cols-4 gap-2">
                                                                    {isLoading && <LoadingIndicator />}
                                                                    {data?.times?.length > 0 ? (
                                                                        data.times.map((time: string) => (
                                                                            <Button
                                                                                key={time}
                                                                                variant={selectedTime === time ? "default" : "outline"}
                                                                                size="sm"
                                                                                onClick={() => {
                                                                                    field.onChange(time)
                                                                                    setSelectedTime(time)
                                                                                }}
                                                                                className={selectedTime === time ? "bg-blue-600 hover:bg-blue-700" : ""}
                                                                            >
                                                                                {time}
                                                                            </Button>
                                                                        ))

                                                                    ) : selectedDate && !isLoading ? (
                                                                        <p>No times available</p>
                                                                    ) : null
                                                                    }
                                                                </div>
                                                            </div>
                                                        )}

                                                    </FormControl>
                                                </FormItem>
                                            }}
                                        />

                                    </CardContent>
                                </Card>

                                <Card className="border-slate-200">
                                    <CardHeader>
                                        <CardTitle className="text-slate-900">Choose Services</CardTitle>
                                        <CardDescription>Select one or more services</CardDescription>
                                    </CardHeader>

                                    <CardContent className="space-y-4">
                                        <FormField
                                            control={form.control}
                                            name="services"
                                            render={({ field }) => (
                                                <FormItem>
                                                    {servicesData.map((service) => (
                                                        <div
                                                            key={service.id}
                                                            className="flex items-start space-x-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                                                        >
                                                            <FormControl>
                                                                <Checkbox
                                                                    id={`service-${service.id}`}
                                                                    checked={selectedServices.includes(service.id)}
                                                                    onCheckedChange={() => {
                                                                        const updated = selectedServices.includes(service.id)
                                                                            ? selectedServices.filter((id) => id !== service.id)
                                                                            : [...selectedServices, service.id]

                                                                        setSelectedServices(updated)
                                                                        field.onChange(updated)
                                                                    }}
                                                                    className="mt-1"
                                                                />
                                                            </FormControl>
                                                            <div className="flex-1">
                                                                <label htmlFor={`service-${service.id}`} className="cursor-pointer">
                                                                    <div className="flex justify-between items-start">
                                                                        <div>
                                                                            <h4 className="font-semibold text-slate-900">{service.name}</h4>
                                                                            <p className="text-sm text-slate-600">{service.description}</p>
                                                                            <p className="text-xs text-slate-500 mt-1">⏱️ {service.duration}</p>
                                                                        </div>
                                                                        <span className="font-bold text-blue-600">€{service.price}</span>
                                                                    </div>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </FormItem>
                                            )}
                                        />


                                        {selectedServices.length > 0 && (
                                            <div className="border-t border-slate-200 pt-4 space-y-3">
                                                <div className="flex justify-between text-lg">
                                                    <span className="font-semibold text-slate-900">Total:</span>
                                                    <span className="font-bold text-slate-900">€{computeTotal()}</span>
                                                </div>
                                                <div className="flex justify-between text-sm text-slate-600">
                                                    <span>Signal (50%):</span>
                                                    <span className="font-semibold">€{computeSignal().toFixed(2)}</span>
                                                </div>
                                                <div className="flex justify-between text-sm text-slate-600">
                                                    <span>The rest (on site):</span>
                                                    <span className="font-semibold">€{(computeTotal() - computeSignal()).toFixed(2)}</span>
                                                </div>
                                                <Button
                                                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                                                    size="lg"
                                                    disabled={!selectedDate || !selectedTime}
                                                    type="submit"
                                                >
                                                    Pay signal €{computeSignal().toFixed(2)} and confirm
                                                </Button>
                                                <p className="text-xs text-slate-500 text-center">
                                                    Secure payment by card • Remainder paid on site
                                                </p>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
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
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {servicesData.map((service) => (
                                    <Card key={service.id} className="border-slate-200 hover:shadow-lg transition-shadow">
                                        <CardHeader className="text-center">
                                            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                                                <Car className="h-8 w-8 text-blue-600" />
                                            </div>
                                            <CardTitle className="text-slate-900">{service.name}</CardTitle>
                                            <CardDescription className="text-slate-600">{service.description}</CardDescription>
                                        </CardHeader>
                                        <CardContent className="text-center space-y-4">
                                            <div className="text-3xl font-bold text-blue-600">€{service.price}</div>
                                            <div className="text-sm text-slate-500">⏱️ {service.duration}</div>
                                            <Button variant="outline" className="w-full bg-transparent">
                                                Select
                                            </Button>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </section>
                </form>
            </Form>

        </>
    )
}