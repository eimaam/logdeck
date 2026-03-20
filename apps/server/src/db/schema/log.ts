import { pgTable, boolean, serial, text, timestamp, varchar, jsonb, integer } from "drizzle-orm/pg-core";
import { UserRoleEnum } from "@logdeck/shared/types";
import { projects } from "./project";





export const logs = pgTable("logs", {
    id: serial("id").primaryKey(),
    projectId: integer("project_id").references(() => projects.id),
    level: varchar("level", { length: 50 }).notNull(), // info, error, warn, debug
    message: text("message").notNull(),
    metadata: jsonb("metadata"),
    serviceName: varchar("service_name", { length: 255 }),
    source: varchar("source", { length: 255 }), // e.g., 'server', 'browser', 'lambda'
    createdAt: timestamp("created_at").defaultNow().notNull(),
});