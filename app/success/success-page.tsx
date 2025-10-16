'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { format } from "date-fns";

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [paymentInfo, setPaymentInfo] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    if (sessionId) {
      fetch(`/api/stripe/checkout?session_id=${sessionId}`)
        .then((res) => res.json())
        .then((data) => setPaymentInfo(data))
    }
  }, [sessionId])

  if (!sessionId || !paymentInfo) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-medium">Loading payment details...</p>
      </div>
    )
  }

  if (paymentInfo) {
    const localId = localStorage.getItem("booking_id")
    const bookingIdFromStripe = paymentInfo.booking_id

    if (bookingIdFromStripe !== localId) {
      alert("Invalid booking ID")
      router.push("/")
    }
  }
  console.log(paymentInfo)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-blue-800 mb-6">✅ Payment Confirmed!</h1>

        <div className="text-left space-y-3 mb-6">
          <p><strong>Name:</strong> {paymentInfo.customer_name || 'N/A'}</p>
          <p><strong>Email:</strong> {paymentInfo.customer_email || 'N/A'}</p>
          <p><strong>Phone number:</strong> {paymentInfo.phone_number || 'N/A'}</p>
          <p><strong>Status:</strong> {paymentInfo.payment_status}</p>
          <p><strong>Services:</strong> {paymentInfo.services}</p>
          <p><strong>Booking Date:</strong> {format(new Date(paymentInfo.booking_date), "dd-MMM-yyyy")}</p>
          <p><strong>Time:</strong> {paymentInfo.booking_time}</p>
          <p><strong>Duration:</strong> {paymentInfo.duration}</p>
          <p><strong>Total Amount:</strong> €{(paymentInfo.amount_total / 100).toFixed(2)}</p>
        </div>

        <button
          onClick={() => router.push('/')}
          className="bg-blue-100 text-blue-800 border-blue-200 px-6 py-2 rounded-lg hover:bg-blue-300 transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  )
}
