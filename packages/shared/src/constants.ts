const isBrowser = typeof window !== 'undefined';

const getEnv = (key: string, defaultValue: string): string => {
    // Vite environment variables (prefixed with VITE_ for client-side)
    // @ts-ignore
    if (typeof import.meta !== 'undefined' && import.meta.env) {
        // @ts-ignore
        const viteVal = import.meta.env[`VITE_${key}`] || import.meta.env[key];
        if (viteVal) return viteVal;
    }

    // Node environment variables
    if (typeof process !== 'undefined' && process.env) {
        const nodeVal = process.env[key];
        if (nodeVal) return nodeVal;
    }

    return defaultValue;
};

export const LANDING_URL = getEnv('LANDING_URL', 'http://localhost:5173');
export const APP_URL = getEnv('APP_URL', 'http://localhost:5174');
export const CONSOLE_URL = getEnv('CONSOLE_URL', 'http://localhost:5175');
export const API_URL = getEnv('API_URL', 'http://localhost:3000');
