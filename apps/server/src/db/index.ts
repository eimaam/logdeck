import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema";
import { config } from "@/config/envs";

const pool = new pg.Pool({
    connectionString: config.db.url,
});

export const db = drizzle(pool, { schema });
