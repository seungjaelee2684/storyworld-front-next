'use client';

import { PrivateRoute } from "@/components/PrivateRoute";
import { HydrationBoundary, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

export function Providers({children}: {children: React.ReactNode}) {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <HydrationBoundary state={null}>
                <PrivateRoute>
                    {children}
                    <Toaster richColors position="bottom-right" expand={true} />
                </PrivateRoute>
            </HydrationBoundary>
        </QueryClientProvider>
    )
}