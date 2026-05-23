import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupAction, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarRail, useSidebar } from "@/components/ui/sidebar"
import { UserInfoType } from "@/types/authType"
import { Book, ChevronDown, ChevronsUpDown, Home, Plus, User2 } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

const sidebarItems = [
    {
        label: "대시보드 홈",
        icon: <Home className="size-5" />,
        href: "/dashboard",
    },
    {
        label: "대시보드 홈",
        icon: <Home className="size-5" />,
        href: "/dashboard",
    },
    {
        label: "대시보드 홈",
        icon: <Home className="size-5" />,
        href: "/dashboard",
    },
];

const DashboardSidebar = ({ me }: { me: UserInfoType | undefined }) => {

    const isMobile = useSidebar();
    const [activeTeam, setActiveTeam] = useState<number>(0);

    return (
        <Sidebar collapsible="icon" className="border-none">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton
                                    size="lg"
                                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                >
                                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary/10 text-sidebar-primary-foreground">
                                        <Image src="/images/square_logo.png" alt="logo" width={16} height={16} />
                                    </div>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-semibold">Story World</span>
                                        <span className="truncate text-xs">My Workspace</span>
                                    </div>
                                    <ChevronsUpDown className="ml-auto" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                                align="start"
                                side={isMobile ? "bottom" : "right"}
                                sideOffset={4}
                            >
                                <DropdownMenuLabel className="text-xs text-muted-foreground">
                                    Teams
                                </DropdownMenuLabel>
                                <DropdownMenuItem
                                    onClick={() => setActiveTeam(0)}
                                    className="gap-2 p-2"
                                >
                                    <div className="flex size-6 items-center justify-center rounded-md border">
                                        <Book className="size-4" />
                                    </div>
                                    <span>My Workspace</span>
                                    <DropdownMenuShortcut>⌘1</DropdownMenuShortcut>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="gap-2 p-2">
                                    <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                                        <Plus className="size-4" />
                                    </div>
                                    <div className="font-medium text-muted-foreground">Add team</div>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {sidebarItems.map((item, index) => (
                                <SidebarMenuItem key={index}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.href}>
                                            {item.icon}
                                            <span>{item.label}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                                <SidebarMenuButton
                                    size="lg"
                                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                >
                                    <Avatar className="h-8 w-8 rounded-lg">
                                        <AvatarImage src={"/images/square_logo.png"} alt={me?.nickname || ""} />
                                        <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                                    </Avatar>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-semibold">{me?.nickname}</span>
                                        <span className="truncate text-xs">{me?.username}</span>
                                    </div>
                                </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}

export default DashboardSidebar