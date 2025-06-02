import { Home, Inbox, Play } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarHeader,
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
    const location = useLocation();

    return (
        <Sidebar>
            <SidebarContent className="bg-green-900">
                <SidebarHeader className="p-4">
                    <h2 className="text-xl font-bold text-white">Lateral Thinking</h2>
                    <p className="text-sm text-green-200 mt-1">Train your brain</p>
                </SidebarHeader>
                <SidebarGroup>
                    <SidebarGroupLabel className="text-green-200 px-4">Navigation</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => {
                                const isActive = location.pathname === item.url || 
                                    (item.url !== "/" && location.pathname.startsWith(item.url));
                                
                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton 
                                            className={`py-3 px-4 w-full transition-colors duration-200 ${
                                                isActive 
                                                    ? 'bg-green-800 text-white' 
                                                    : 'text-green-100 hover:bg-green-800/50'
                                            }`} 
                                            asChild
                                        >
                                            <Link to={item.url}>
                                                <div className="flex flex-row items-center gap-3">
                                                    <item.icon className={`size-5 ${isActive ? 'text-green-300' : 'text-green-400'}`} />
                                                    <span>{item.title}</span>
                                                </div>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}