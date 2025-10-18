'use client'
import LoadingIndicator from "@/components/loading-indicator";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { useBookingForm } from "../hooks/booking-context";
import type { BookingForm, FormFieldName } from "@/types/booking-form";

interface SelectDateProps {
    form: BookingForm,
}

export function SelectDate({ form }: SelectDateProps ) {

    const { selectedDate,
        setSelectedDate,
        isLoading,
        data,
        selectedTime,
        setSelectedTime
    } = useBookingForm()

    console.log(data);

    return (
        <Card className="border-slate-200">
            <CardHeader>
                <CardTitle className="text-slate-900">Select date and time</CardTitle>
                <CardDescription>Choose the best day and time for you</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <FormField
                    control={form.control}
                    name={"booking" as FormFieldName}
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
                    name={"time" as FormFieldName}
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
                                                        type="button"
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
    )
}