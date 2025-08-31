import type { School } from "@/lib/types/school"

export const SchoolService = {
    getAll: async (): Promise<School[]> => {
        const response = await fetch("/api/schools")
        const data = await response.json()
        return data.schools
    },

    getById: async (id: string): Promise<School> => {
        const response = await fetch(`/api/schools/${id}`)
        if (!response.ok) {
            throw new Error("Failed to fetch school")
        }
        return response.json()
    },

    create: async (formData: FormData): Promise<School> => {
        const response = await fetch("/api/schools", {
            method: "POST",
            body: formData,
        })
        if (!response.ok) {
            throw new Error("Failed to create school")
        }
        return response.json()
    },

    update: async (id: string, formData: FormData): Promise<School> => {
        const response = await fetch(`/api/schools/${id}`, {
            method: "PUT",
            body: formData,
        })
        if (!response.ok) {
            throw new Error("Failed to update school")
        }
        return response.json()
    },

    delete: async (id: number): Promise<void> => {
        const response = await fetch(`/api/schools/${id}`, {
            method: "DELETE",
        })
        if (!response.ok) {
            throw new Error("Failed to delete school")
        }
    },
}
