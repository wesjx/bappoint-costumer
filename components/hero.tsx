'use client'
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export default function Hero() {
    return (
        <>
            <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-blue-50 to-cyan-100">
                <div className="container px-4 md:px-6 mx-auto">
                    <div className="flex flex-col items-center space-y-4 text-center">
                        <div className="space-y-2">
                            <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200">
                                🚗 Professional Car Wash
                            </Badge>
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-slate-900">
                                Your car <span className="text-blue-600">shining</span> like new
                            </h1>
                            <p className="mx-auto max-w-[700px] text-slate-600 md:text-xl">
                                Professional car wash and detailing services. Book online and pay only 50% to reserve your spot.
                                Quality guaranteed!
                            </p>
                        </div>
                        <div className="space-x-4">
                            <Button
                                onClick={() => {
                                    const element = document.getElementById("booking")
                                    if (element) {
                                        element.scrollIntoView({ behavior: "smooth" })
                                    }
                                }} size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                                Book Now
                            </Button>
                            <Button
                                onClick={() => {
                                    const element = document.getElementById("services")
                                    if (element) {
                                        element.scrollIntoView({ behavior: "smooth" })
                                    }
                                }}
                                variant="outline"
                                size="lg"
                                className="border-slate-300 text-slate-700 hover:bg-slate-50 bg-transparent"
                            >
                                View Services
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
