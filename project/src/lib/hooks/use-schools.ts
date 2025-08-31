import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { SchoolService } from "@/lib/services/school.service"
import type { School } from "@/lib/types/school"
import { toast } from "sonner"

export const useSchools = () => {
    return useQuery<School[], Error>({
        queryKey: ["schools"],
        queryFn: async () => {
            try {
                return await SchoolService.getAll()
            } catch (error) {
                toast.error("Failed to fetch schools")
                throw error
            }
        }
    })
}

export const useSchool = (id: string) => {
    return useQuery<School, Error>({
        queryKey: ["schools", id],
        queryFn: async () => {
            try {
                return await SchoolService.getById(id)
            } catch (error) {
                toast.error("Failed to fetch school details")
                throw error
            }
        },
        enabled: !!id
    })
}

export const useCreateSchool = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (formData: FormData) => {
            return SchoolService.create(formData)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["schools"] })
            toast.success("School created successfully")
        },
        onError: (error) => {
            toast.error("Failed to create school")
        },
    })
}

export const useUpdateSchool = (id: string) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (formData: FormData) => {
            return SchoolService.update(id, formData)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["schools"] })
            queryClient.invalidateQueries({ queryKey: ["schools", id] })
            toast.success("School updated successfully")
        },
        onError: (error) => {
            toast.error("Failed to update school")
        },
    })
}

export const useDeleteSchool = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: number) => {
            return SchoolService.delete(id)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["schools"] })
            toast.success("School deleted successfully")
        },
        onError: (error) => {
            toast.error("Failed to delete school")
        },
    })
}
