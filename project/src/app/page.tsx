'use client'

import Link from "next/link"
import { useSchools, useDeleteSchool } from "@/lib/hooks/use-schools"
import { SchoolCard } from "@/components/school-card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"

export default function HomePage() {
  const { data: schools = [], isLoading } = useSchools()
  const deleteMutation = useDeleteSchool()

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this school?")) return

    try {
      await deleteMutation.mutateAsync(id)
      toast.success("School deleted successfully")
    } catch (error) {
      toast.error("Failed to delete school")
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Schools Directory</h1>
        <Button asChild>
          <Link href="/schools/new">Add New School</Link>
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))}
        </div>
      ) : schools.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2">No schools found</h2>
          <p className="text-muted-foreground mb-4">Get started by adding your first school.</p>
          <Button asChild>
            <Link href="/schools/new">Add New School</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schools.map((school) => (
            <SchoolCard
              key={school.id}
              school={school}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
