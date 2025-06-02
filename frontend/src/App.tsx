import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger, SidebarContent, SidebarHeader, SidebarFooter, SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar"
import Home from './pages/Home';
import Game from './pages/Game';
import "./index.css"

function App() {
    return (
        <Router>
            <SidebarProvider>
                <div className="flex flex-row w-full">
                    <SidebarContent>
                        <SidebarHeader>
                            <h1>Storybook</h1>
                        </SidebarHeader>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                123
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarContent>
                    <SidebarTrigger />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/game/:storyTitle/:storyId" element={<Game />} />
                    </Routes>
                </div>
            </SidebarProvider>
        </Router>
    );
}

export default App;