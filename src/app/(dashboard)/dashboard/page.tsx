'use client';

import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useMe } from "@/hooks/auth/useMe";
import DashboardSidebar from "../_components/DashboardSidebar";

export default function Dashboard() {

    const {data: me} = useMe();
    console.log("me", me);
    
    return (
        <SidebarProvider>
            <DashboardSidebar me={me} />
            <SidebarInset className="bg-sidebar p-4">
                <div className="w-full min-h-full relative flex flex-col bg-background rounded-md p-4">
                    <SidebarTrigger />
                    
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}