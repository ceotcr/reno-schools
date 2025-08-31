import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { schoolFormSchema, type SchoolFormValues } from "@/lib/types/school"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface SchoolFormProps {
    initialData?: Partial<SchoolFormValues>
    onSubmit: (data: FormData) => Promise<void>
    isLoading: boolean
}

export function SchoolForm({ initialData, onSubmit, isLoading }: SchoolFormProps) {
    const form = useForm<SchoolFormValues>({
        resolver: zodResolver(schoolFormSchema),
        defaultValues: {
            name: initialData?.name || "",
            address: initialData?.address || "",
            city: initialData?.city || "",
            state: initialData?.state || "",
            contact: initialData?.contact || "",
            email_id: initialData?.email_id || "",
        },
    })

    const handleSubmit = async (values: SchoolFormValues) => {
        const formData = new FormData()
        Object.entries(values).forEach(([key, value]) => {
            if (key === "image" && value instanceof FileList) {
                formData.append(key, value[0])
            } else {
                formData.append(key, value as string)
            }
        })
        await onSubmit(formData)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>School Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter school name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Enter school address" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter city" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>State</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter state" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="contact"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Contact Number</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter contact number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email_id"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter email address" type="email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="image"
                    render={({ field: { onChange, ...field } }) => (
                        <FormItem>
                            <FormLabel>School Image</FormLabel>
                            <FormControl>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => onChange(e.target.files)}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Saving..." : "Save School"}
                </Button>
            </form>
        </Form>
    )
}
