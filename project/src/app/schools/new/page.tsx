'use client'

import { useRouter } from "next/navigation"
import { useCreateSchool } from "@/lib/hooks/use-schools"
import { SchoolForm } from "@/components/school-form"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NewSchoolPage() {
    const router = useRouter()
    const createMutation = useCreateSchool()

    const handleSubmit = async (formData: FormData) => {
        await createMutation.mutateAsync(formData)
        router.push("/")
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl space-y-8">
            <div className="flex items-center justify-between">
                <Button onClick={() => router.push('/')}>
                    <ArrowLeft /> Home
                </Button>
                <h1 className="text-3xl font-bold">Add New School</h1>
            </div>

            <div className="bg-card p-6 rounded-lg border">
                <SchoolForm
                    onSubmit={handleSubmit}
                    isLoading={createMutation.isPending}
                />
            </div>
        </div>
    )
}
