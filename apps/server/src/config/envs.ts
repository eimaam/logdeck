import dotenv from 'dotenv';

dotenv.config();

import { NodeEnvEnum } from '@logdeck/shared';


export const config = {
    environment: (process.env.NODE_ENV as NodeEnvEnum) || NodeEnvEnum.DEVELOPMENT,
    port: parseInt(process.env.PORT || '8000', 10),
    db: {
        url: process.env.NODE_ENV === NodeEnvEnum.DEVELOPMENT
            ? process.env.DEV_DB_URL || 'postgres://postgres:postgres@localhost:5432/logdeck'
            : process.env.PROD_DB_URL || 'postgres://postgres:postgres@localhost:5432/logdeck'
    },
    auth: {
        jwtSecret: process.env.JWT_SECRET || 'mygoddamnsecret',
        jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || 'supersupergoddamnsecretroooooomies',
        accessTokenExpiry: process.env.ACCESS_TOKEN_EXPIRY || '15m',
        refreshTokenExpiry: process.env.REFRESH_TOKEN_EXPIRY || '7d',
    },
    google: {
        clientUrl: process.env.GOOGLE_CLIENT_URL || "",
        clientId: process.env.GOOGLE_CLIENT_ID || ""
    },
    clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
};

export type Config = typeof config;
