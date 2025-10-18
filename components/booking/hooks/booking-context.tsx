'use client'
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react"
import { format } from "date-fns"
import { servicesData } from "@/app/data/services"
import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then(res => res.json())

interface BookingContextType {
  selectedDate: Date | undefined
  setSelectedDate: (date: Date | undefined) => void
  selectedTime: string
  setSelectedTime: (time: string) => void
  selectedServices: number[]
  setSelectedServices: (services: number[]) => void
  computeTotal: () => number
  computeSignal: () => number
  onSubmit: () => Promise<void>
  data: any
  isLoading: boolean
}

const BookingContext = createContext<BookingContextType | undefined>(undefined)

export function BookingProvider({ children }: { children: ReactNode }) {
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
    selectedDate ? `/api/available-times?date=${format(selectedDate, "yyyy-MM-dd")}` : null,
    fetcher,
    { dedupingInterval: 100_000 }
  )

  const computeTotal = () =>
    selectedServices.reduce((total, id) => {
      const service = servicesData.find(s => s.id === id)
      return total + (service?.price || 0)
    }, 0)

  const computeSignal = () => computeTotal() * 0.5

  async function onSubmit() {
    const selectedService = servicesData.filter(s => selectedServices.includes(s.id))
    const amount = computeSignal()
    const duration = selectedService.map(s => s.duration)
    const totalDuration = duration.reduce((acc, val) => acc + val, 0)

    const booking_id = localStorage.getItem("booking_id")

    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount,
        date: selectedDate,
        time: selectedTime,
        services: selectedService.map(s => s.name),
        duration: totalDuration,
        booking_id,
      }),
    })

    const data = await res.json()
    window.location.href = data.url
    console.log(data)
  }

  return (
    <BookingContext.Provider value={{
      selectedDate,
      setSelectedDate,
      selectedTime,
      setSelectedTime,
      selectedServices,
      setSelectedServices,
      computeTotal,
      computeSignal,
      onSubmit,
      data,
      isLoading,
    }}>
      {children}
    </BookingContext.Provider>
  )
}

export function useBookingForm() {
  const context = useContext(BookingContext)
  if (!context) {
    throw new Error("useBookingForm must be used within a BookingProvider")
  }
  return context
}
