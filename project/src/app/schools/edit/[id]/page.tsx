'use client'

import { useRouter } from "next/navigation"
import { useSchool, useUpdateSchool } from "@/lib/hooks/use-schools"
import { SchoolForm } from "@/components/school-form"
import { Skeleton } from "@/components/ui/skeleton"
import { use } from "react"

export default function EditSchoolPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const router = useRouter()
    const { data: school, isLoading: isFetching } = useSchool(id)
    const updateMutation = useUpdateSchool(id)

    const handleSubmit = async (formData: FormData) => {
        try {
            await updateMutation.mutateAsync(formData)
            router.push("/")
        } catch (error) {
            // Error is already handled by the mutation
        }
    }

    if (isFetching) {
        return (
            <div className="container mx-auto px-4 py-8 max-w-2xl">
                <Skeleton className="h-10 w-48 mb-8" />
                <div className="space-y-6">
                    <Skeleton className="h-96 w-full" />
                </div>
            </div>
        )
    }

    if (!school) return null

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <h1 className="text-3xl font-bold mb-8">Edit School</h1>
            <div className="bg-card p-6 rounded-lg border">
                <SchoolForm
                    initialData={school}
                    onSubmit={handleSubmit}
                    isLoading={updateMutation.isPending}
                />
            </div>
        </div>
    )
}
