import { createBrowserRouter } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import ErrorPage from "../../../packages/shared/src/components/404";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: LandingPage,
    },
    {
        path: "*",
        Component: ErrorPage
    },
]);
