import { Car } from "lucide-react";
import Link from "next/link";
import MenuBurger from "./menu_burger";

export function Header() {
    return (
        <>
            <header className="flex px-4 lg:px-6 h-16 justify-between items-center bg-white border-b border-slate-200">
                <Link href="/" className="flex items-center justify-center">
                    <Car className="h-8 w-8 text-blue-600" />
                    <span className="ml-2 text-xl font-bold text-slate-900">CleanCar Pro</span>
                </Link>
                <nav className="ml-auto hidden md:flex gap-4 sm:gap-6">
                    <Link href="#services" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
                        Services
                    </Link>
                    <Link
                        href="#bookings"
                        className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
                    >
                        Bookings
                    </Link>
                    <Link href="#reviews" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
                        Reviews
                    </Link>
                    <Link href="#contact" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
                        Contact
                    </Link>

                </nav>
                <MenuBurger />
            </header></>
    )
}