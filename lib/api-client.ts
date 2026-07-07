import type { CompanyDTO } from "@/types/api/company"

const BASE_URL = process.env.NEXT_PUBLIC_API_URL!

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`API error ${res.status}: ${text}`)
  }
  return res.json() as Promise<T>
}

export const get = async <T>(path: string): Promise<T> => {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
  return handleResponse<T>(res)
}

export const post = async <T, B>(path: string, body: B): Promise<T> => {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
  return handleResponse<T>(res)
}

export const getCompanyBySlug = (slug: string): Promise<CompanyDTO> => {
  return get<CompanyDTO>(`/companies/slug/${slug}`)
}
