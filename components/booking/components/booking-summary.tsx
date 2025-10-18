import { Button } from "@/components/ui/button"
import { useBookingForm } from "../hooks/booking-context"

export default function BookingSummary() {
    const { selectedServices,
        computeSignal,
        computeTotal,
        selectedDate,
        selectedTime,
        onSubmit
    } = useBookingForm()
    return (
        <>
            {selectedServices.length > 0 && (
                <div className="border-t border-slate-200 pt-4 space-y-3">
                    <div className="flex justify-between text-lg">
                        <span className="font-semibold text-slate-900">Total:</span>
                        <span className="font-bold text-slate-900">€{computeTotal()}</span>
                    </div>
                    <div className="flex justify-between text-sm text-slate-600">
                        <span>Signal (50%):</span>
                        <span className="font-semibold">€{computeSignal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-slate-600">
                        <span>The rest (on site):</span>
                        <span className="font-semibold">€{(computeTotal() - computeSignal()).toFixed(2)}</span>
                    </div>
                    <Button
                        className="w-full bg-green-600 hover:bg-green-700 text-white"
                        size="lg"
                        disabled={!selectedDate || !selectedTime}
                        type="submit"
                        onClick={onSubmit}
                    >
                        Pay signal €{computeSignal().toFixed(2)} and confirm
                    </Button>
                    <p className="text-xs text-slate-500 text-center">
                        Secure payment by card • Remainder paid on site
                    </p>
                </div>
            )}
        </>
    )
}