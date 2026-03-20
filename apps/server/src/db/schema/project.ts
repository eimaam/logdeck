import { pgTable, boolean, serial, text, timestamp, varchar, jsonb, integer } from "drizzle-orm/pg-core";
import { UserRoleEnum } from "@logdeck/shared/types";
import { users } from "./user";



export const projects = pgTable("projects", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    apiKey: varchar("api_key", { length: 255 }).notNull().unique(),
    userId: integer("user_id").references(() => users.id),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});