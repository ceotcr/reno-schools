'use client'

import { useRouter } from "next/navigation"
import { useCreateSchool } from "@/lib/hooks/use-schools"
import { SchoolForm } from "@/components/school-form"
import { toast } from "sonner"

export default function NewSchoolPage() {
    const router = useRouter()
    const createMutation = useCreateSchool()

    const handleSubmit = async (formData: FormData) => {
        try {
            await createMutation.mutateAsync(formData)
            toast.success("School created successfully")
            router.push("/")
        } catch (error) {
            toast.error("Failed to create school")
        }
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <h1 className="text-3xl font-bold mb-8">Add New School</h1>
            <div className="bg-card p-6 rounded-lg border">
                <SchoolForm
                    onSubmit={handleSubmit}
                    isLoading={createMutation.isPending}
                />
            </div>
        </div>
    )
}
