"use client"

import { useRouter } from "next/navigation";

export default function CancelPage() {
  const router = useRouter();

  return (
    <div className="max-w-md mx-auto py-20 text-center">
      <h1 className="text-3xl font-bold text-red-600 mb-4">Payment Cancelled ❌</h1>
      <p className="mb-6">Your payment was not completed. Please try again or contact support if the problem persists.</p>
      <button
        onClick={() => router.push("/")}
        className="px-6 py-2 bg-blue-100 text-blue-800 border border-blue-200 rounded hover:bg-blue-200 transition"
      >
        Go Back to Home
      </button>
    </div>
  );
}
