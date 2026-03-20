import axios from 'axios';
import { config } from '@/config/config';

/**
 * Global API Client
 * 
 */
export const apiClient = axios.create({
    baseURL: config.api.BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

/**
 * request Interceptor
 */
apiClient.interceptors.request.use(
    (axiosConfig) => {
        return axiosConfig;
    },
    (error) => {
        return Promise.reject(error);
    }
);

/**
 * Response Interceptor
 * Handles common error responses (e.g., 401 Unauthorized)
 */
apiClient.interceptors.response.use(
    (response) => {
        return response.data; // Return only the data portion of the response
    },
    (error) => {
        const originalRequest = error.config;

        // Handle 401 Unauthorized errors (token expiration)
        if (error.response?.status === 401 && !originalRequest._retry) {
            console.warn('Unauthorized request. Possible token expiration.');
        }

        // Format consistent error object
        const errorMessage = error.response?.data?.message || error.message || 'An unexpected error occurred';

        return Promise.reject({
            ...error,
            message: errorMessage,
        });
    }
);

export default apiClient;
