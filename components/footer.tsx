import { Car, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
    return (
        <footer id="contact" className="bg-slate-900 text-slate-300">
            <div className="container px-4 md:px-6 py-12 mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center">
                            <Car className="h-6 w-6 text-blue-400" />
                            <span className="ml-2 text-lg font-bold text-white">CleanCar Pro</span>
                        </div>
                        <p className="text-sm text-slate-400">
                            We care for your car with the dedication it deserves. Quality and punctuality guaranteed.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-white">Services</h3>
                        <ul className="space-y-2 text-sm">
                            <li>Basic Wash</li>
                            <li>Full Wash</li>
                            <li>Premium Wash</li>
                            <li>Complete Detailing</li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-white">Opening Hours</h3>
                        <ul className="space-y-2 text-sm">
                            <li>Monday to Saturday</li>
                            <li>08:00 AM to 6:00 PM</li>
                            <li>Sunday: Closed</li>
                            <li>Holidays: Check Availability</li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-white">Contact</h3>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-center space-x-2">
                                <MapPin className="h-4 w-4" />
                                <span>123 Flower Street - Lisbon</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <Phone className="h-4 w-4" />
                                <span>+351 912 345 678</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <Mail className="h-4 w-4" />
                                <span>contact@cleancar.pt</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-800 mt-12 pt-8 text-center">
                    <p className="text-xs text-slate-400">
                        © {new Date().getFullYear()} CleanCar Pro. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
