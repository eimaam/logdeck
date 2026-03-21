import { config } from '@/config/envs';
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(config.google.clientId);

/**
 * Verify Google ID token (from @react-oauth/google)
 * modern react auth flow...
 * 
 * @param token - Google ID token received from frontend
 * @returns User information from Google
 */
export async function verifyGoogleToken(token: string) {
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: config.google.clientId,
        });

        const payload = ticket.getPayload();

        if (!payload || !payload.email) {
            throw new Error('Invalid token payload');
        }

        return {
            googleId: payload.sub,
            email: payload.email,
            fullName: payload.name || payload.email.split('@')[0],
            avatarUrl: payload.picture || '',
            emailVerified: payload.email_verified || false,
        };
    } catch (error) {
        throw new Error('Invalid Google token');
    }
}

/**
 * Verify Google Access Token (for custom button flow)
 * 
 * @param accessToken - Google Access token received from frontend
 * @returns User information from Google
 */
export async function verifyGoogleAccessToken(accessToken: string) {
    try {
        const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user info from Google');
        }

        const payload = await response.json() as any;

        if (!payload.email) {
            throw new Error('Invalid token payload');
        }

        return {
            googleId: payload.sub,
            email: payload.email,
            fullName: payload.name || payload.email.split('@')[0],
            avatarUrl: payload.picture || '',
            emailVerified: payload.email_verified || false,
        };
    } catch (error) {
        throw new Error('Invalid Google access token');
    }
}
