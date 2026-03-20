import type { IUser } from "@logdeck/shared"

export interface AuthState {
    user: IUser | null;
    isAuthenticated: boolean;
    isOnboarded: boolean;
    isLoading: boolean;

    error: string | null

    updateUser: (user: Partial<IUser>) => void
}
