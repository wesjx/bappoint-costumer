'use client'

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { format } from "date-fns"
import useSWR from "swr"

import type { CompanyDTO } from "@/types/api/company"
import type { ServiceDTO } from "@/types/api/services"

const fetcher = (url: string) => fetch(url).then(res => res.json())

interface BookingContextType {
  company: CompanyDTO | undefined
  services: ServiceDTO[]
  selectedDate: Date | undefined
  setSelectedDate: (date: Date | undefined) => void
  selectedTime: string
  setSelectedTime: (time: string) => void
  selectedServices: string[]
  setSelectedServices: (services: string[]) => void
  computeTotal: () => number
  computeSignal: () => number
  computeSignalPercentage: () => number
  onSubmit: () => Promise<void>
  data: any
  isLoading: boolean
}

const BookingContext = createContext<BookingContextType | undefined>(undefined)

export function BookingProvider({ children }: { children: ReactNode }) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [selectedServices, setSelectedServices] = useState<string[]>([])

  useEffect(() => {
    setSelectedDate(new Date())
  }, [])

  const generateBookingId = () => {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
      return crypto.randomUUID()
    }
  
    return `booking_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`
  }

  useEffect(() => {
    if (!localStorage.getItem("booking_id")) {
      const id = generateBookingId()
      localStorage.setItem("booking_id", id)
    }
  }, [])

  const { data: company, isLoading: isCompanyLoading } = useSWR<CompanyDTO>(
    "/api/company",
    fetcher
  )

  const services = company?.settings.services ?? []

  const { data, isLoading } = useSWR(
    selectedDate ? `/api/available-times?date=${format(selectedDate, "yyyy-MM-dd")}` : null,
    fetcher,
    { dedupingInterval: 100_000 }
  )

  const computeTotal = () =>
    selectedServices.reduce((total, id) => {
      const service = services.find(s => s.id === id)
      return total + (service?.price || 0)
    }, 0)

    const computeSignalPercentage = () => company?.depositPercentage ?? 50
    const computeSignal = () => computeTotal() * (computeSignalPercentage() / 100)
    
  async function onSubmit() {
    const selectedService = services.filter(s => selectedServices.includes(s.id))
    const amount = computeSignal()
    const totalDuration = selectedService.reduce((acc, service) => acc + service.durationMinutes, 0)

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

    const response = await res.json()
    window.location.href = response.url
  }

  return (
    <BookingContext.Provider
      value={{
        company,
        services,
        selectedDate,
        setSelectedDate,
        selectedTime,
        setSelectedTime,
        selectedServices,
        setSelectedServices,
        computeTotal,
        computeSignal,
        computeSignalPercentage,
        onSubmit,
        data,
        isLoading: isCompanyLoading || isLoading,
      }}
    >
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
