import { createBrowserRouter } from "react-router";
import Layout from "./layout";
import Home from './pages/Home';
import Rules from './pages/Rules';
import Games from "./pages/Games";
import Play from "./pages/Play";

export const router = createBrowserRouter([
    {
        Component: Layout,
        children: [
            {
                path: "/",
                Component: Home,
            },
            {
                path: "/rules",
                Component: Rules,
            },
            {
                path: "/games",
                Component: Games
            },
            {
                path: "/games/:storyId",
                Component: Play,
            },
        ],
    },
]);
