import Image from "next/image"
import Link from "next/link"
import { School } from "@/lib/types/school"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface SchoolCardProps {
    school: School
    onDelete: (id: number) => void
}

export function SchoolCard({ school, onDelete }: SchoolCardProps) {
    return (
        <Card className="flex flex-col h-full">
            <CardHeader className="relative h-48 p-0">
                <Image
                    src={school.image}
                    alt={school.name}
                    fill
                    className="object-cover rounded-t-lg"
                />
            </CardHeader>
            <CardContent className="flex-1 p-4">
                <h3 className="text-lg font-semibold mb-2">{school.name}</h3>
                <p className="text-sm text-muted-foreground mb-1">{school.address}</p>
                <p className="text-sm text-muted-foreground mb-1">{school.city}, {school.state}</p>
                <p className="text-sm text-muted-foreground mb-1">{school.contact}</p>
                <p className="text-sm text-muted-foreground">{school.email_id}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex gap-2">
                <Button asChild variant="outline" className="flex-1">
                    <Link href={`/schools/edit/${school.id}`}>
                        Edit
                    </Link>
                </Button>
                <Button
                    variant="destructive"
                    className="flex-1"
                    onClick={() => onDelete(school.id)}
                >
                    Delete
                </Button>
            </CardFooter>
        </Card>
    )
}
