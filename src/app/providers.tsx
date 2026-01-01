'use client';

import { HydrationBoundary, QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function Providers({children}: {children: React.ReactNode}) {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <HydrationBoundary state={null}>
                {children}
            </HydrationBoundary>
        </QueryClientProvider>
    )
}