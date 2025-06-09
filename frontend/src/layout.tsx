import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Outlet } from "react-router-dom"
import { AppSidebar } from "@/components/AppSidebar"

const Layout = () => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="w-full min-h-screen bg-gray-50">
                <div className="flex flex-row h-16">
                    <header className="flex z-10 fixed flex-row items-center w-full bg-gradient-to-r from-green-800 to-green-700 shadow-lg">
                        <div className="flex items-center h-16 px-4">
                            <SidebarTrigger 
                                size='lg' 
                                className="text-white hover:bg-white/10 transition-colors duration-200" 
                            />
                        </div>
                        <div className="flex-1 flex justify-center items-center h-16 border-b border-green-600">
                            <h1 className="text-white text-xl font-bold tracking-wide">
                                LATERAL THINKING GAME
                            </h1>
                        </div>
                        <div className="w-16 h-16 px-4" /> 
                    </header>
                </div>
                <div className="px-6 py-4">
                    <Outlet />
                </div>
            </main>
        </SidebarProvider>
    )
}

export default Layout;