import { AppointmentInterval } from "@/enum/appointment_interval"
import { OffDayDTO } from "./off_days"
import { OperatingHoursDTO } from "./operating_hours"
import { ServiceDTO } from "./services"

export interface CompanySettingsDTO {
  id: string
  appointmentInterval: AppointmentInterval
  maxCancellationInterval: number
  services: ServiceDTO[]
  operatingHours: OperatingHoursDTO[]
  offDays: OffDayDTO[]
}

export interface CompanyDTO {
  id: string
  name: string
  email: string
  phone: string
  address: string
  stripeAccountId: string
  depositPercentage: number
  settings: CompanySettingsDTO
}