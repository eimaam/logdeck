import { config } from "@/config/envs";
import { AuthService } from "@/services/auth.service";
import { UserService, verifyGoogleToken } from "@/services/user.service";
import { catchAsync } from "@/utils/controller";
import { generateAuthTokens } from "@/utils/jwt.utils";
import { responseHandler, sendSuccess } from "@/utils/response";
import { NodeEnvEnum } from "@logdeck/shared";
import { Context } from "hono";
import { setCookie, deleteCookie } from "hono/cookie";

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