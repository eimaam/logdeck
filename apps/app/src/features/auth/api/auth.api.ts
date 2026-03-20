import { apiClient } from '../../../lib/api-client';
import type { IUser } from '@logdeck/shared';

interface LoginResponse {
    message: string;
    data: {
        user: IUser;
    };
}

export const authApi = {
    /**
     * Login with Google ID token
     */
    loginWithGoogle: async (token: string): Promise<IUser> => {
        const response = await apiClient.post<any, LoginResponse>('/auth/login', { token });
        return response.data.user;
    },

    logout: async (): Promise<void> => {
        await apiClient.post('/auth/logout');
    }
};
