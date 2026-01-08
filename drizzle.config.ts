/**
 * Drizzle ORM Configuration
 *
 * Uses Vite's loadEnv for environment variable loading:
 *   - development: .env → .env.local (local SQLite via wrangler)
 *   - production:  .env → .env.production → .env.production.local (remote D1 via HTTP)
 *
 * Usage:
 *   pnpm db:push             # Push to local D1 (development)
 *   pnpm db:push:production  # Push to remote D1 (production)
 */
import { defineConfig } from "drizzle-kit";
import fs from "fs";
import path from "path";
import { loadEnv } from "vite";

function getLocalD1DB() {
  try {
    const basePath = path.resolve(".wrangler");
    const dbFile = fs
      .readdirSync(basePath, { encoding: "utf-8", recursive: true })
      .find((f) => f.endsWith(".sqlite"));

    if (!dbFile) {
      throw new Error(`.sqlite file not found in ${basePath}`);
    }

    return path.resolve(basePath, dbFile);
  } catch (err) {
    console.log(`Error: ${err}`);
  }
}

// Load env using Vite's loadEnv (respects .env, .env.local, .env.[mode], .env.[mode].local)
const mode = process.env.NODE_ENV || "development";
const env = loadEnv(mode, process.cwd(), "");
const isLocal = mode === "development";

console.log(`[drizzle] mode=${mode}, db=${isLocal ? getLocalD1DB() : env.CLOUDFLARE_DATABASE_ID}`);

export default defineConfig({
  schema: "./src/lib/db/schema/index.ts",
  out: "./drizzle",
  dialect: "sqlite",
  casing: "snake_case",
  ...(isLocal
    ? {
        dbCredentials: {
          url: getLocalD1DB(),
        },
      }
    : {
        driver: "d1-http",
        dbCredentials: {
          accountId: env.CLOUDFLARE_ACCOUNT_ID!,
          databaseId: env.CLOUDFLARE_DATABASE_ID!,
          token: env.CLOUDFLARE_D1_TOKEN!,
        },
      }),
});
