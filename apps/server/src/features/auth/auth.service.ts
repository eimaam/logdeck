import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '@/shared/db';
import { users } from '@/shared/db/schema';
import { eq } from 'drizzle-orm';
import { config } from '@/shared/config/envs';
import { LoginInput } from './auth.validator';

export class AuthService {
  static async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  static async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  static generateTokens(userId: number) {
    const accessToken = jwt.sign(
      { userId },
      config.auth.jwtSecret,
      { expiresIn: config.auth.accessTokenExpiry as any }
    );

    const refreshToken = jwt.sign(
      { userId },
      config.auth.jwtRefreshSecret,
      { expiresIn: config.auth.refreshTokenExpiry as any }
    );

    return { accessToken, refreshToken };
  }

  static async findOrCreateUser(data: any) {
    const { googleId, email, avatarUrl, fullName } = data;

    // find existing user via googleId
    let user = await db.query.users.findFirst({
      where: eq(users.googleId, googleId)
    });

    // if not found via googleId, check via email (link accounts)
    if (!user) {
      user = await db.query.users.findFirst({
        where: eq(users.email, email)
      });

      if (user) {
        // link googleId to existing user
        await db.update(users)
          .set({ googleId, avatarUrl: avatarUrl || user.avatarUrl })
          .where(eq(users.id, user.id));
        
        // Refresh local user object
        user = await db.query.users.findFirst({
          where: eq(users.id, user.id)
        });
      }
    }

    const now = new Date();

    if (user) {
      await db.update(users)
        .set({ lastLoginAt: now, avatarUrl: avatarUrl || user.avatarUrl })
        .where(eq(users.id, user.id));
      
      return { ...user, lastLoginAt: now };
    } else {
      // create new user
      const [newUser] = await db.insert(users).values({
        fullName,
        email,
        googleId,
        avatarUrl,
        lastLoginAt: now,
      }).returning();

      return newUser;
    }
  }
}
