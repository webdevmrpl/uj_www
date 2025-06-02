import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Outlet } from "react-router-dom"
import { AppSidebar } from "@/components/AppSidebar"
const Layout = () => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="w-full mb-8">
                <div className="flex flex-row h-[116px] mb-8">
                    <header className="flex z-10 fixed flex-row items-center w-full bg-green-700 p-8 text-center border-b-4 border-green-900">
                        <SidebarTrigger size='lg' className="text-white size-12" />
                        <h1 className="text-white text-2xl font-bold mx-auto">LATERAL THINKING GAME</h1>
                    </header>
                </div>
                <Outlet />
            </main>
        </SidebarProvider>
    )
}

export default Layout;