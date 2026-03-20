import { getAuth } from "@/features/auth/hooks/useAuth";
import { redirect } from "react-router-dom";

export const requireAuth = async () => {
    const { isAuthenticated } = getAuth();

    if (!isAuthenticated) {
        return redirect("/auth")
    }

    return null;
};