'use client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import type { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"
import { useState } from "react"

export function Providers({ children, session }: { children: React.ReactNode, session: Session | null }) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: 10 * 60 * 1000, // 10 minutes
                    },
                },
            })
    )

    return (
        <SessionProvider>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </SessionProvider>
    )
}
