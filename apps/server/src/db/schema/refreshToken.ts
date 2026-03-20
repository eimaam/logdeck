import { pgTable, boolean, serial, text, timestamp, varchar, jsonb, integer } from "drizzle-orm/pg-core";
import { users } from "./user";


export const refreshTokens = pgTable("refreshtokens", {
    id: serial("id").primaryKey(),
    userId: integer("user_id").references(() => users.id),
    token: varchar("token").notNull(),
    replacedByToken: varchar("replaced_by_token"),
    
    createdByIp: text("created_by_ip"),
    revokedByIp: text("revoked_by_ip"),

    expiresAt: timestamp("expires_at").notNull(),
    revokedAt: timestamp("revoked_at"),

    createdAt: timestamp("created_at").defaultNow().notNull()
})