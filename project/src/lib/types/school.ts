import { z } from "zod"

export const schoolFormSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    address: z.string().min(5, "Address must be at least 5 characters"),
    city: z.string().min(2, "City must be at least 2 characters"),
    state: z.string().min(2, "State must be at least 2 characters"),
    contact: z.string().min(10, "Contact must be at least 10 characters"),
    email_id: z.email("Invalid email address"),
    image: z.any().nonoptional("School image is required"),
})

export type SchoolFormValues = z.infer<typeof schoolFormSchema>

export type School = {
    id: number
    name: string
    address: string
    city: string
    state: string
    contact: string
    email_id: string
    image: string
    createdAt: string
    updatedAt: string
}
