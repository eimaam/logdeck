import { Context, Next } from "hono";
import { getCookie } from "hono/cookie";

import { config } from "@/shared/config/envs";
import { db } from "@/shared/db";
import { users } from "@/shared/db/schema";
import { eq } from "drizzle-orm";
import { responseHandler } from "@/shared/utils/response";
import jwt, { JwtPayload } from "jsonwebtoken";


export const authMiddleware = async (c: Context, next: Next) => {
  try {
    const authHeader = c.req.header("Authorization");
    let token = "";

    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7);
    } else {
      // Check for accessToken in cookies
      token = getCookie(c, "accessToken") || "";
    }

    if (!token) {
      return responseHandler.unauthorized(c, "Authentication required");
    }

    // 2. Verify token
    const decoded = jwt.verify(token, config.auth.jwtSecret) as JwtPayload;

    if (!decoded || !decoded.userId) {
      return responseHandler.unauthorized(c, "Invalid token");
    }

    const user = await db.query.users.findFirst({
      where: eq(users.id, decoded.userId),
    });

    if (!user) {
      return responseHandler.unauthorized(c, "User not found");
    }

    // 4. Attach user to context
    c.set("user", user);

    await next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    return responseHandler.unauthorized(c, "Invalid or expired token");
  }
};
