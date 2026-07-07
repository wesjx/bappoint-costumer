import { NextResponse } from "next/server"
import { getCompanyBySlug } from "@/lib/api-client"
import type { CompanyDTO } from "@/types/api/company"

const COMPANY_SLUG = process.env.NEXT_PUBLIC_COMPANY_SLUG!

export async function GET() {
  if (!COMPANY_SLUG) {
    return NextResponse.json(
      { error: "Missing NEXT_PUBLIC_COMPANY_SLUG" },
      { status: 500 }
    )
  }

  try {
    const company: CompanyDTO = await getCompanyBySlug(COMPANY_SLUG)
    return NextResponse.json(company)
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message ?? "Unknown error" },
      { status: 500 }
    )
  }
}