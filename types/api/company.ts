import { AppointmentInterval } from "@/enum/appointment_interval"

export interface CompanySettingsDTO {
    id: string
    appointmentInterval: AppointmentInterval
    maxCancellationInterval: number
  }
  
  export interface CompanyDTO {
    id: string
    name: string
    email: string
    phone: string
    address: string
    stripeAccountId: string
    settings: CompanySettingsDTO
  }