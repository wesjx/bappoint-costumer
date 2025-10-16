import { AlignJustifyIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./ui/sheet";
import Link from "next/link";

export default function MenuBurger() {
    return (
        <div className="block md:hidden">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="link"><AlignJustifyIcon /></Button>
                </SheetTrigger>
                <SheetContent>
                    <nav className="py-6 ml-auto flex flex-col items-center gap-4 sm:gap-6">
                        <SheetClose asChild>
                            <Link href="#servicos" className="text-lg font-medium text-slate-600 hover:text-blue-600 transition-colors">
                                Services
                            </Link>
                        </SheetClose>
                        <SheetClose asChild>
                            <Link
                                href="#booking"
                                className="text-lg font-medium text-slate-600 hover:text-blue-600 transition-colors"
                            >
                                Bookings
                            </Link>
                        </SheetClose>
                        <SheetClose asChild>
                            <Link href="#reviews" className="text-lg font-medium text-slate-600 hover:text-blue-600 transition-colors">
                                Reviews
                            </Link>
                        </SheetClose>
                        <SheetClose asChild>
                            <Link href="#contact" className="text-lg font-medium text-slate-600 hover:text-blue-600 transition-colors">
                                Contact
                            </Link>
                        </SheetClose>
                    </nav>
                </SheetContent>
            </Sheet>
        </div>
    )
}