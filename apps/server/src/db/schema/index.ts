import { pgTable, boolean, serial, text, timestamp, varchar, jsonb, integer } from "drizzle-orm/pg-core";
import { UserRoleEnum } from "@logdeck/shared/types";
import { users } from "./user";
import { refreshTokens } from "./refreshToken";
import { projects } from "./project";
import { logs } from "./log";

export { users, refreshTokens, projects, logs };
export * from "./user";
export * from "./refreshToken";
export * from "./project";
export * from "./log";




export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type RefreshToken = typeof refreshTokens.$inferSelect;
export type NewRefreshToken = typeof refreshTokens.$inferInsert;
export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;
export type Log = typeof logs.$inferSelect;
export type NewLog = typeof logs.$inferInsert;
