import { Path, UseFormReturn } from "react-hook-form";
import z from "zod";

export const formSchema = z.object({
    name: z.string(),
    booking: z.date(),
    time: z.string().min(1, "Select one time."),
    services: z.array(z.number().int().min(1)),
})

export type BookingFormType = z.infer<typeof formSchema>

export type BookingForm = UseFormReturn<BookingFormType>

export type FormFieldName = Path<BookingFormType>
export type FormFieldServices = Path<BookingFormType>