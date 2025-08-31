import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { SchoolService } from "@/lib/services/school.service"
import type { School } from "@/lib/types/school"

export const useSchools = () => {
    return useQuery<School[], Error>({
        queryKey: ["schools"],
        queryFn: SchoolService.getAll,
    })
}

export const useSchool = (id: string) => {
    return useQuery<School, Error>({
        queryKey: ["schools", id],
        queryFn: () => SchoolService.getById(id),
        enabled: !!id,
    })
}

export const useCreateSchool = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (formData: FormData) => SchoolService.create(formData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["schools"] })
        },
    })
}

export const useUpdateSchool = (id: string) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (formData: FormData) => SchoolService.update(id, formData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["schools"] })
            queryClient.invalidateQueries({ queryKey: ["schools", id] })
        },
    })
}

export const useDeleteSchool = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: number) => SchoolService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["schools"] })
        },
    })
}
