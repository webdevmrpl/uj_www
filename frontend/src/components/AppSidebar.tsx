import { Home, Inbox, Play } from "lucide-react"
import { Link } from "react-router-dom"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

const items = [
    {
        title: "Home",
        url: "/",
        icon: Home,
    },
    {
        title: "Rules",
        url: "/rules",
        icon: Inbox,
    },
    {
        title: "Play",
        url: "/games",
        icon: Play,
    }
]

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarContent className="bg-green-900 text-white">
                <SidebarGroup>
                    <SidebarGroupLabel className="text-white">Navigation</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton className="py-6" asChild>
                                        <Link to={item.url}>
                                            <div className="flex flex-row items-center gap-2">
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </div>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}