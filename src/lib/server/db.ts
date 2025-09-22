import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import { drizzle as pgDrizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "./schema";

// Neon环境优化配置
const neonConfig = {
  arrayMode: false,
  fullResults: false,
  fetchOptions: {
    cache: "no-store", // 确保数据一致性
  },
};

// 传统PostgreSQL环境配置
const postgresConfig = {
  idle_timeout: 20,
  max_lifetime: 60 * 30,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
  max: 1, // 限制连接数，适配Serverless环境
};

const driver = neon(
  process.env.DATABASE_URL || "postgresql://user:password@localhost:5432/tanstarter",
  neonConfig,
);
const pgDriver = postgres(
  process.env.DATABASE_URL || "postgresql://user:password@localhost:5432/tanstarter",
  postgresConfig,
);

const db = drizzle({ client: driver, schema, casing: "snake_case" });
const pgDb = pgDrizzle({ client: pgDriver, schema, casing: "snake_case" });

export function getDB() {
  if (process.env.DATABASE_URL && process.env.DATABASE_URL.includes("neon")) {
    return db;
  }
  return pgDb;
}
