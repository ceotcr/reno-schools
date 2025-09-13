import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { MapPin, Phone, Mail, Pencil, Trash } from "lucide-react"
import { School } from "@/lib/types/school"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DeleteConfirmDialog } from "@/components/delete-confirm-dialog"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

interface SchoolCardProps {
    school: School
    onDelete: (id: number) => void
}

export function SchoolCard({ school, onDelete }: SchoolCardProps) {
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const { data: session } = useSession()
    const router = useRouter()
    return (
        <Card className="flex flex-col h-full py-0 overflow-hidden group hover:shadow-lg transition-all duration-300 border-2">
            <CardHeader className="relative h-48 p-0">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
                <Image
                    src={school.image}
                    alt={school.name}
                    fill
                    className="object-cover transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                    <h3 className="text-xl font-semibold text-white mb-1 line-clamp-2">{school.name}</h3>
                    <p className="text-white/80 text-sm line-clamp-1">{school.city}, {school.state}</p>
                </div>
            </CardHeader>
            <CardContent className="flex-1 p-4">
                <div className="space-y-3">
                    <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 mt-1 text-muted-foreground/70 shrink-0" />
                        <p className="text-sm text-muted-foreground line-clamp-2">{school.address}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-muted-foreground/70 shrink-0" />
                        <p className="text-sm text-muted-foreground hover:text-primary transition-colors">
                            <a href={`tel:${school.contact}`}>{school.contact}</a>
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-muted-foreground/70 shrink-0" />
                        <p className="text-sm text-muted-foreground truncate hover:text-primary transition-colors">
                            <a href={`mailto:${school.email_id}`}>{school.email_id}</a>
                        </p>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex gap-2">
                <Button
                    asChild
                    variant="outline"
                    className="flex-1 hover:bg-secondary hover:text-secondary-foreground transition-colors duration-300"
                >
                    <Link href={(session && session.user) ? `/schools/edit/${school.id}` : "/auth"}>
                        <Pencil className="w-4 h-4 mr-2" />
                        Edit
                    </Link>
                </Button>
                <Button
                    variant="destructive"
                    className="flex-1 hover:bg-destructive/90 transition-colors duration-300"
                    onClick={() => {
                        session && session.user ? setIsDeleteDialogOpen(true) : router.push("/auth");
                    }}
                >
                    <Trash className="w-4 h-4 mr-2" />
                    Delete
                </Button>
            </CardFooter>

            <DeleteConfirmDialog
                isOpen={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
                onConfirm={() => onDelete(school.id)}
                title="Delete School"
                description={`Are you sure you want to delete ${school.name}? This action cannot be undone.`}
            />
        </Card>
    )
}
