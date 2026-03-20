import { createBrowserRouter, redirect } from "react-router-dom";
import AuthPage from "./features/auth/AuthPage";
import { getAuth } from "./features/auth/hooks/useAuth";
import { ErrorPage } from "@logdeck/shared";

export const router = createBrowserRouter([
    {
        path: "/",
        loader: () => {
            const isAuthenticated = getAuth().isAuthenticated
            return isAuthenticated ? redirect("/viewer") : redirect("/auth")
        },
    },
    {
        path: "auth",
        loader: () => {
            const isAuthenticated = getAuth().isAuthenticated
            return isAuthenticated ? redirect("/viewer") : null
        },
        Component: AuthPage
    },
    
    {
        path: "*",
        Component: ErrorPage
    },
]);
