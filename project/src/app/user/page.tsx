"use client";
export const dynamic = "force-dynamic";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { nameSchema, NameSchema } from "@/lib/types/auth-user";
import { useUserApi } from "@/lib/hooks/use-auth-user";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";


export default function UserPage() {
  const router = useRouter();
  const { data: session, update, status } = useSession();

  const { updateUser, processing } = useUserApi();
  const form = useForm<NameSchema>({
    resolver: zodResolver(nameSchema),
    defaultValues: { name: "" },
  });

  // 🔥 Update form values once session loads
  useEffect(() => {
    if (session?.user?.name) {
      form.reset({ name: session.user.name });
    }
  }, [session, form]);

  const onSubmit = async (values: NameSchema) => {
    const ok = await updateUser(values.name);
    if (ok) {
      await update({ name: values.name });
      toast.success("Name updated successfully.");
      router.push("/");
    } else {
      toast.error("Failed to update name. Please try again.");
    }
  };

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
        <p className="text-center text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <Card className="w-full max-w-md p-8 shadow-lg">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-center mb-2">Update Your Name</h2>
            <Separator className="mb-4" />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Save
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  );
}
