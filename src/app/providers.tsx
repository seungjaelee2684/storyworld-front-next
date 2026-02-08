'use client';

import { PrivateRoute } from "@/components/PrivateRoute";
import { HydrationBoundary, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { Toaster } from "sonner";

export function Providers({children}: {children: React.ReactNode}) {
    const queryClient = new QueryClient();

    const pathname = usePathname();
    const isLimitPage = pathname.startsWith("/dashboard")
        || pathname.startsWith("/story/create");

    return (
        <QueryClientProvider client={queryClient}>
            <HydrationBoundary state={null}>
                <PrivateRoute isLimit={isLimitPage}>
                    {children}
                    <Toaster richColors position="top-center" expand={true} />
                </PrivateRoute>
            </HydrationBoundary>
        </QueryClientProvider>
    )
}