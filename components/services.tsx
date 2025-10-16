import { Clock, Droplets, Shield, Sparkles } from "lucide-react";

export default function Services() {
    return (
        <>
            <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
                <div className="container px-4 md:px-6 mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold tracking-tighter text-slate-900">Why Choose CleanCar Pro?</h2>
                            <p className="text-slate-600 text-lg">
                                We’ve been experts in car care for over 10 years. Our qualified team uses premium products and professional techniques to ensure the best results for your vehicle.
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                        <Droplets className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900">Premium Products</h3>
                                        <p className="text-sm text-slate-600">Professional waxes and shampoos</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                                        <Sparkles className="h-5 w-5 text-green-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900">Guaranteed Results</h3>
                                        <p className="text-sm text-slate-600">100% satisfaction guaranteed</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                                        <Shield className="h-5 w-5 text-purple-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900">Full Insurance</h3>
                                        <p className="text-sm text-slate-600">Comprehensive coverage</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                                        <Clock className="h-5 w-5 text-orange-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900">Punctuality</h3>
                                        <p className="text-sm text-slate-600">Always on time</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <img
                                src="/placeholder.svg?height=400&width=600"
                                alt="Clean and shiny car"
                                className="rounded-lg shadow-xl w-full h-auto"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
