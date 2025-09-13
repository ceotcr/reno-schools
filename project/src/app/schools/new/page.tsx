'use client'

import { useRouter } from "next/navigation"
import { useCreateSchool } from "@/lib/hooks/use-schools"
import { SchoolForm } from "@/components/school-form"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

import { useSession } from "next-auth/react"
import { AvatarDropdown } from "@/components/avatar-dropdown"
import { useEffect } from "react"
export default function NewSchoolPage() {
    const router = useRouter()
    const createMutation = useCreateSchool()
    const { data: session, status } = useSession()
    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/auth")
        }
    }, [router, session])
    const handleSubmit = async (formData: FormData) => {
        // Redirect to /auth if not signed in
        if (status === "loading") {
            return
        }
        if (!session || !session.user) {
            router.push("/auth")
            return
        }
        await createMutation.mutateAsync(formData)
        router.push("/")
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl space-y-8">
            <div className="flex items-center justify-between mb-4">
                <Button onClick={() => router.push('/')}> <ArrowLeft /> Home </Button>
            </div>
            <h1 className="text-3xl font-bold">Add New School</h1>
            <div className="bg-card p-6 rounded-lg border">
                <SchoolForm
                    onSubmit={handleSubmit}
                    isLoading={createMutation.isPending}
                />
            </div>
        </div>
    )
}
