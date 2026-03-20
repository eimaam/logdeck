import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { config } from '../config/envs';
import { db } from '../db';
import { refreshTokens, User } from '../db/schema/index';
import { and, eq, isNull, lt } from 'drizzle-orm';

export interface TokenPayload {
    userId: number;
    email: string;
    fullName: string;
    role: string;
}

export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
}

/**
 * Generate access token (short-lived)
 */
export function generateAccessToken(user: User): string {
    const payload: TokenPayload = {
        userId: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
    };

    return jwt.sign(payload, config.auth.jwtSecret, {
        expiresIn: config.auth.accessTokenExpiry as any,
    });
}

/**
 * Generate refresh token (long-lived) and store in db
 */
export async function generateRefreshToken(
    userId: number,
    ipAddress?: string
): Promise<string> {
    // Create a cryptographically secure random token
    const token = crypto.randomBytes(40).toString('hex');

    // Calculate expiration date
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

    await db.insert(refreshTokens).values({
        userId,
        token,
        expiresAt,
        createdByIp: ipAddress,
    });

    return token;
}

/**
 * Generate both access and refresh tokens
 */
export async function generateAuthTokens(
    user: User,
    ipAddress?: string
): Promise<AuthTokens> {
    const accessToken = generateAccessToken(user);
    const refreshToken = await generateRefreshToken(user.id, ipAddress);

    return { accessToken, refreshToken };
}

/**
 * Verify access token
 */
export function verifyAccessToken(token: string): TokenPayload {
    try {
        return jwt.verify(token, config.auth.jwtSecret) as TokenPayload;
    } catch (error) {
        throw new Error('Invalid or expired access token');
    }
}

/**
 * Verify and get refresh token from database
 */
export async function verifyRefreshToken(token: string) {
    const refreshToken = await db.query.refreshTokens.findFirst({
        where: eq(refreshTokens.token, token),
    });

    if (!refreshToken) {
        throw new Error('Invalid refresh token');
    }

    if (refreshToken.revokedAt) {
        throw new Error('Refresh token has been revoked');
    }

    if (refreshToken.expiresAt < new Date()) {
        throw new Error('Refresh token has expired');
    }

    return refreshToken;
}

/**
 * Revoke refresh token (for logout)
 */
export async function revokeRefreshToken(
    token: string,
    ipAddress?: string
): Promise<void> {
    await db.update(refreshTokens)
        .set({ revokedAt: new Date(), revokedByIp: ipAddress })
        .where(eq(refreshTokens.token, token));
}

/**
 * Revoke all refresh tokens for a user
 */
export async function revokeAllUserTokens(
    userId: number,
    ipAddress?: string
): Promise<void> {
    await db.update(refreshTokens)
        .set({ revokedAt: new Date(), revokedByIp: ipAddress })
        .where(
            and(
                eq(refreshTokens.userId, userId),
                isNull(refreshTokens.revokedAt)
            )
        );
}

/**
 * Rotate refresh token (revoke old, generate new)
 */
export async function rotateRefreshToken(
    oldToken: string,
    userId: number,
    ipAddress?: string
): Promise<string> {
    const newToken = await generateRefreshToken(userId, ipAddress);

    await db.update(refreshTokens)
        .set({
            revokedAt: new Date(),
            revokedByIp: ipAddress,
            replacedByToken: newToken
        })
        .where(eq(refreshTokens.token, oldToken));

    return newToken;
}

/**
 * Clean up expired tokens
 */
export async function cleanupExpiredTokens(): Promise<number> {
    const result = await db.delete(refreshTokens)
        .where(lt(refreshTokens.expiresAt, new Date()));
    
    // Note: drizzle-orm/node-postgres doesn't return row count directly in delete result usually
    // it depends on the driver. For pg, it's often result.rowCount.
    return (result as any).rowCount || 0;
}
