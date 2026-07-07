import { NextResponse } from "next/server"

import type { CompanyDTO } from "@/types/api/company"
import type { SlotsAvailable } from "@/types/api/slots_available"

import { get, getCompanyBySlug } from "@/lib/api-client"

const COMPANY_SLUG = process.env.NEXT_PUBLIC_COMPANY_SLUG!

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const date = searchParams.get("date")

  if (!date) {
    return NextResponse.json(
      { error: "Missing date param" },
      { status: 400 }
    )
  }

  if (!COMPANY_SLUG) {
    return NextResponse.json(
      { error: "Missing NEXT_PUBLIC_COMPANY_SLUG" },
      { status: 500 }
    )
  }

  try {
    const company: CompanyDTO = await getCompanyBySlug(COMPANY_SLUG)

    const slots = await get<SlotsAvailable[]>(
      `/companies/${company.id}/appointments/available-times?date=${date}`
    )

    const times = slots.map((slot) => slot.start.split("T")[1])

    return NextResponse.json({ times })
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message ?? "Unknown error" },
      { status: 500 }
    )
  }
}
