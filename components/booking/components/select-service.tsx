'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { FormControl, FormField, FormItem } from "@/components/ui/form"
import { useBookingForm } from "../hooks/booking-context"
import { BookingForm, FormFieldServices } from "@/types/booking-form"

interface SelectServicesProps {
  form: BookingForm
}

export function SelectServices({ form }: SelectServicesProps) {
  const {
    selectedServices,
    setSelectedServices,
    services,
  } = useBookingForm()

  return (
    <Card className="border-slate-200">
      <CardHeader>
        <CardTitle className="text-slate-900">Choose Services</CardTitle>
        <CardDescription>Select one or more services</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <FormField
          control={form.control}
          name={"services" as FormFieldServices}
          render={({ field }) => (
            <FormItem>
              {services.map((service) => (
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
                          <p className="text-sm text-slate-600">
                            {service.durationMinutes} minutes
                          </p>
                        </div>
                        <span className="font-bold text-blue-600">
                          €{Number(service.price).toFixed(2)}
                        </span>
                      </div>
                    </label>
                  </div>
                </div>
              ))}
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  )
}
