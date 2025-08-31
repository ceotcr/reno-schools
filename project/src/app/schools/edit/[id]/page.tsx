'use client'

import { useRouter } from "next/navigation"
import { useSchool, useUpdateSchool } from "@/lib/hooks/use-schools"
import { SchoolForm } from "@/components/school-form"
import { Skeleton } from "@/components/ui/skeleton"
import { use } from "react"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function EditSchoolPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const router = useRouter()
    const { data: school, isLoading: isFetching } = useSchool(id)
    const updateMutation = useUpdateSchool(id)

    const handleSubmit = async (formData: FormData) => {
        await updateMutation.mutateAsync(formData)
        router.push("/")
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
        <div className="container mx-auto space-y-8 px-4 py-8 max-w-2xl">
            <div className="flex items-center justify-between">
                <Button onClick={() => router.push('/')}>
                    <ArrowLeft /> Home
                </Button>
                <h1 className="text-3xl font-bold">Edit School</h1>
            </div>
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
