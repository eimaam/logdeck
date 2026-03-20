import { pgTable, boolean, serial, text, timestamp, varchar, jsonb, integer } from "drizzle-orm/pg-core";
import { UserRoleEnum } from "@logdeck/shared/types";


export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    fullName: varchar("full_name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    role: text("role").$type<UserRoleEnum>().default(UserRoleEnum.USER).notNull(),
    isOnboarded: boolean("is_onboarded").default(true).notNull(),

    googleId: text("google_id").notNull().unique(),
    avatarUrl: text("avatar_url"),

    lastLoginAt: timestamp("last_login_at").defaultNow().notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull().$onUpdate(() => new Date()),
});