'use client';

import { PrivateRoute } from "@/components/PrivateRoute";
import { HydrationBoundary, QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function Providers({children}: {children: React.ReactNode}) {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <HydrationBoundary state={null}>
                <PrivateRoute>
                    {children}
                </PrivateRoute>
            </HydrationBoundary>
        </QueryClientProvider>
    )
}