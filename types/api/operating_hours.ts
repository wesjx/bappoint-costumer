import { WeekDay } from "@/enum/week_day"

export interface OperatingHoursDTO {
    id: string
    weekday: WeekDay
    isActive: boolean
    startTime: string
    endTime: string
    lunchStartTime: string | null
    lunchEndTime: string | null
  }