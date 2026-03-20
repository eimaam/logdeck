import jwt from 'jsonwebtoken';
import { Context } from 'hono';
import { setCookie, deleteCookie } from 'hono/cookie';
import { config } from '@/config/envs';

export const signAccessToken = (userId: string) => {
    return jwt.sign({ sub: userId }, config.auth.jwtSecret, {
        expiresIn: config.auth.accessTokenExpiry as any,
    });
};

export const signRefreshToken = (userId: string) => {
    return jwt.sign({ sub: userId }, config.auth.jwtRefreshSecret, {
        expiresIn: config.auth.refreshTokenExpiry as any,
    });
};

export const verifyAccessToken = (token: string) => {
    return jwt.verify(token, config.auth.jwtSecret);
};

export const verifyRefreshToken = (token: string) => {
    return jwt.verify(token, config.auth.jwtRefreshSecret);
};

export const setRefreshTokenCookie = (c: Context, token: string) => {
    const isProd = config.environment === 'production';

    setCookie(c, 'refreshToken', token, {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? 'None' : 'Lax',
        path: '/',
        maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
    });
};

export const clearRefreshTokenCookie = (c: Context) => {
    deleteCookie(c, 'refreshToken', {
        path: '/',
    });
};
