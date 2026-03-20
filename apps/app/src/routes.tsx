import { createBrowserRouter, redirect } from "react-router-dom";
import AuthPage from "./features/auth/AuthPage";
import { getAuth } from "./features/auth/hooks/useAuth";
import { ErrorPage } from "@logdeck/shared";
import DashboardLayout from "./components/DashboardLayout";
import DashboardPage from "./pages/DashboardPage";

export const router = createBrowserRouter([
    {
        path: "/auth",
        loader: () => {
            const isAuthenticated = getAuth().isAuthenticated;
            return isAuthenticated ? redirect("/") : null;
        },
        Component: AuthPage,
    },
    {
        path: "/",
        element: <DashboardLayout />,
        loader: () => {
            const isAuthenticated = getAuth().isAuthenticated;
            if (!isAuthenticated) return redirect("/auth");
            return null;
        },
        children: [
            {
                index: true,
                Component: DashboardPage,
            },
            {
                path: "projects",
                Component: () => <div className="p-8 text-text-muted">Projects Page (Coming Soon)</div>,
            },
            {
                path: "events",
                Component: () => <div className="p-8 text-text-muted">Events Flow (Coming Soon)</div>,
            },
            {
                path: "analytics",
                Component: () => <div className="p-8 text-text-muted">Analytics (Coming Soon)</div>,
            },
            {
                path: "settings",
                Component: () => <div className="p-8 text-text-muted">Settings (Coming Soon)</div>,
            },
        ],
    },
    {
        path: "*",
        Component: ErrorPage,
    },
]);
