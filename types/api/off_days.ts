import { OffDaysType } from "@/enum/off_days"

export interface OffDayDTO {
    id: string
    reason: string
    date: string        
    offDaysType: OffDaysType
  }