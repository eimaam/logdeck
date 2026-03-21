import { config } from "@/shared/config/envs";
import { AuthService } from "./auth.service";
import { UserService, verifyGoogleToken } from "@/features/users/user.service";
import { catchAsync } from "@/shared/utils/controller";
import { generateAuthTokens } from "@/shared/utils/jwt.utils";
import { responseHandler, sendSuccess } from "@/shared/utils/response";
import { NodeEnvEnum } from "@logdeck/shared";
import { Context } from "hono";
import { setCookie, deleteCookie, getCookie } from "hono/cookie";
import { verifyRefreshToken, rotateRefreshToken, generateAccessToken } from "@/shared/utils/jwt.utils";
import { db } from "@/shared/db";
import { eq } from "drizzle-orm";
import { users } from "@/shared/db/schema";

export class AuthController {
    static loginWithGoogle = catchAsync(async (c: Context) => {
        const { token } = await c.req.json<{ token: string }>();

        // verifyGoogleToken uses google-auth-library to verify the ID Token
        const googleUser = await verifyGoogleToken(token);

        // find or create user 
        const user = await AuthService.findOrCreateUser(googleUser);

        if (!user) {
            return responseHandler.badRequest(c, "We experienced a problem signing you in. please try again");
        }

        // Generate JWT tokens
        const ipAddress = c.req.header('x-forwarded-for') || '127.0.0.1';
        const authTokens = await generateAuthTokens(user, ipAddress);

        // set refresh and access token as HTTP-only cookie
        setCookie(c, "accessToken", authTokens.accessToken, {
            httpOnly: true,
            secure: config.environment === NodeEnvEnum.PRODUCTION,
            sameSite: config.environment === NodeEnvEnum.PRODUCTION ? 'None' : 'Strict',
            maxAge: 1 * 60 * 60, // 1 hour
            path: '/',
        })

        setCookie(c, 'refreshToken', authTokens.refreshToken, {
            httpOnly: true,
            secure: config.environment === NodeEnvEnum.PRODUCTION,
            sameSite: config.environment === NodeEnvEnum.PRODUCTION ? 'None' : 'Strict',
            maxAge: 7 * 24 * 60 * 60, // 7 days
            path: '/',
        });

        const data = {
            user: {
                id: user.id,
                email: user.email,
                fullName: user.fullName,
                avatarUrl: user.avatarUrl,

                role: user.role,

                isOnboarded: user.isOnboarded,
                lastLoginAt: user.lastLoginAt,
                createdAt: user.createdAt
            },
        };

        return sendSuccess({
            c,
            message: 'Login successful',
            data
      });
    });

    static refreshToken = catchAsync(async (c: Context) => {
        const refreshToken = getCookie(c, 'refreshToken');

        if (!refreshToken) {
            return responseHandler.unauthorized(c, 'Refresh token missing');
        }

        try {
            const tokenRecord = await verifyRefreshToken(refreshToken);
            const user = await db.query.users.findFirst({
                where: eq(users.id, tokenRecord.userId),
            });

            if (!user) {
                return responseHandler.unauthorized(c, 'User not found');
            }

            const ipAddress = c.req.header('x-forwarded-for') || '127.0.0.1';
            const newRefreshToken = await rotateRefreshToken(refreshToken, user.id, ipAddress);
            const newAccessToken = generateAccessToken(user);

            // set refresh and access token as HTTP-only cookie
            setCookie(c, "accessToken", newAccessToken, {
                httpOnly: true,
                secure: config.environment === NodeEnvEnum.PRODUCTION,
                sameSite: config.environment === NodeEnvEnum.PRODUCTION ? 'None' : 'Strict',
                maxAge: 1 * 60 * 60, // 1 hour
                path: '/',
            })

            setCookie(c, 'refreshToken', newRefreshToken, {
                httpOnly: true,
                secure: config.environment === NodeEnvEnum.PRODUCTION,
                sameSite: config.environment === NodeEnvEnum.PRODUCTION ? 'None' : 'Strict',
                maxAge: 7 * 24 * 60 * 60, // 7 days
                path: '/',
            });

            return sendSuccess({
                c,
                message: 'Token refreshed successfully',
                data: {
                    user: {
                        id: user.id,
                        email: user.email,
                        fullName: user.fullName,
                        avatarUrl: user.avatarUrl,
                        role: user.role,
                    }
                }
            });
        } catch (error: any) {
            console.error('Refresh Token Error:', error);
            // Clear cookies if refresh fails
            deleteCookie(c, 'refreshToken', { path: '/' });
            deleteCookie(c, 'accessToken', { path: '/' });
            return responseHandler.unauthorized(c, error.message || 'Invalid refresh token');
        }
    });

    static logOut = catchAsync(async (c: Context) => {
        deleteCookie(c, 'refreshToken', {
            path: '/',
            secure: config.environment === NodeEnvEnum.PRODUCTION,
            sameSite: config.environment === NodeEnvEnum.PRODUCTION ? 'None' : 'Strict',
        });

        return sendSuccess({
            c,
            message: 'Logged out successfully'
        });
    });
}