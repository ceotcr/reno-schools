'use client'

import Link from "next/link"
import { Plus, School } from "lucide-react"
import { useSchools, useDeleteSchool } from "@/lib/hooks/use-schools"
import { SchoolCard } from "@/components/school-card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
export default function HomePage() {
  const { data: schools = [], isLoading } = useSchools()
  const deleteMutation = useDeleteSchool()

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this school?")) return
    await deleteMutation.mutateAsync(id)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-12">
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 text-transparent bg-clip-text">Schools Directory</h1>
            <p className="text-muted-foreground mt-2">Discover and manage educational institutions</p>
          </div>
          <Button asChild size="lg" className="shadow-lg hover:shadow-primary/20 transition-all duration-300">
            <Link href="/schools/new" className="gap-2">
              <Plus className="w-5 h-5" />
              Add New School
            </Link>
          </Button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-in fade-in duration-500">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ))}
          </div>
        ) : schools.length === 0 ? (
          <div className="text-center py-16 bg-card rounded-lg border-2 border-dashed">
            <School className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold mb-2">No schools found</h2>
            <p className="text-muted-foreground mb-6 max-w-sm mx-auto">Get started by adding your first school to the directory.</p>
            <Button asChild size="lg" variant="outline">
              <Link href="/schools/new" className="gap-2">
                <Plus className="w-5 h-5" />
                Add New School
              </Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-in fade-in duration-500">
            {schools.map((school, index) => (
              <div key={school.id}
                className="animate-in fade-in slide-in-from-bottom-4 duration-500"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <SchoolCard
                  key={school.id}
                  school={school}
                  onDelete={() => handleDelete(school.id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
