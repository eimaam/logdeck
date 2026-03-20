import { create } from 'zustand';
import { persist, createJSONStorage } from "zustand/middleware"
import type { AuthState } from '../types/auth.types';
import type { IUser } from '@logdeck/shared';
import { authApi } from '../api/auth.api';

interface AuthStore extends AuthState {
    login: (token: string) => Promise<void>;
    logout: () => void;
}

const useAuthStoreBase = create<AuthStore>()(
    persist(
        (set) => ({
            // states
            user: null,
            isAuthenticated: false,
            isLoading: false,
            isOnboarded: false,
            error: null,

            // actions
            login: async (token: string) => {
                set({ isLoading: true, error: null });

                try {
                    const user = await authApi.loginWithGoogle(token);

                    set({
                        user,
                        isLoading: false,
                        isAuthenticated: true
                    })

                } catch (error: any) {
                    console.log("Error login in", error);
                    set({
                        error: error.message || "Login failed",
                        isLoading: false
                    })
                }
            },
            logout: async () => {
                try {
                    await authApi.logout();

                    const response = {
                        user: null,
                        isLoading: false,
                        isAuthenticated: false,
                        error: null
                    }
                    set(response)
                } catch (error) {
                    console.error("there was a problem logging out")
                }
            },
            updateUser: (newData: Partial<IUser>) => set((state) => ({
                user: state.user ? { ...state.user, ...newData } : null
            }))
        }),
        {
            name: "auth-storage",
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                user: state.user,
                isAuthenticated: state.isAuthenticated,
                isOnboarded: state.isOnboarded
            })
        }
    )
)


export const useUser = () => useAuthStoreBase((s) => s.user);
export const useIsAuth = () => useAuthStoreBase((s) => s.isAuthenticated);

export const useAuthActions = () => ({
    login: useAuthStoreBase.getState().login,
    logout: useAuthStoreBase.getState().logout,
});

export const getAuth = () => useAuthStoreBase.getState();
