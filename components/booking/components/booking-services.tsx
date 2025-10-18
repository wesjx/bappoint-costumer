'use client'
import { servicesData } from "@/app/data/services";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Car } from "lucide-react";

export function BookingServices() {
    return (
        <div id="#services" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                        <div className="text-sm text-slate-500">⏱️ {service.duration} minutes</div>
                        <Button onClick={() => {
                            const element = document.getElementById("booking")
                            if (element) {
                                element.scrollIntoView({ behavior: "smooth" })
                            }
                        }} type="button" variant="outline" className="w-full bg-transparent">
                            Select
                        </Button>
                    </CardContent>
                </Card>
            ))
            }
        </div >
    )
}