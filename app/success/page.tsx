import { Suspense } from "react";
import SuccessPage from "./success-page";

export default function Page() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen">
            <p className="text-lg font-medium">Loading payment details...</p>
        </div>}>
            <SuccessPage/>
        </Suspense>
    )
}