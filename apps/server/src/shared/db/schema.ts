import { pgTable, boolean, serial, text, timestamp, varchar, jsonb, integer } from "drizzle-orm/pg-core";
import { UserRoleEnum } from "@logdeck/shared/types";
import { users } from "../../features/users/user.schema";
import { refreshTokens } from "../../features/auth/refreshToken.schema";
import { projects } from "../../features/projects/project.schema";
import { logs } from "../../features/logs/log.schema";

export * from "../../features/users/user.schema";
export * from "../../features/auth/refreshToken.schema";
export * from "../../features/projects/project.schema";
export * from "../../features/logs/log.schema";




export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type RefreshToken = typeof refreshTokens.$inferSelect;
export type NewRefreshToken = typeof refreshTokens.$inferInsert;
export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;
export type Log = typeof logs.$inferSelect;
export type NewLog = typeof logs.$inferInsert;
