import { AppointmentStatus } from "@/enum/appointment_status"

export interface CreateBooking{
    createdAt: string
    paymentDeadLine: string
    costumerName: string
    costumerEmail: string
    costumerPhone: string
    appointmentDate: string
    startTime: string
    endTime: string
    totalAmount: number
    appointmentStatus: AppointmentStatus
    stripeSessionId: string
    serviceIds: []
    companyId: string
}