/**
 * Drizzle ORM Configuration
 *
 * Environment variable loading order (later files override earlier):
 *   - .env                  (base defaults)
 *   - .env.local            (local overrides)
 *   - .env.[mode]           (mode-specific)
 *   - .env.[mode].local     (mode-specific local overrides)
 *
 * Usage:
 *   pnpm db:push             # Push to local D1 (development)
 *   pnpm db:push:production  # Push to remote D1 (production)
 */
import dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";
import fs from "fs";
import path from "path";

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

// Load env files in order, later files override earlier
const mode = process.env.NODE_ENV || "development";
const envFiles = [".env", ".env.local", `.env.${mode}`, `.env.${mode}.local`];

const env: Record<string, string> = {};
for (const file of envFiles) {
  const filePath = path.join(process.cwd(), file);
  if (fs.existsSync(filePath)) {
    const parsed = dotenv.parse(fs.readFileSync(filePath));
    // Merge: later files override earlier (skip empty values)
    for (const [key, value] of Object.entries(parsed)) {
      if (value !== "" || !(key in env)) {
        env[key] = value;
      }
    }
  }
}

const isLocal = mode === "development";

console.log(
  `[drizzle] mode=${mode}, db=${isLocal ? getLocalD1DB() : env.SCRIPT_CLOUDFLARE_DATABASE_ID}`,
);

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
          accountId: env.SCRIPT_CLOUDFLARE_ACCOUNT_ID!,
          databaseId: env.SCRIPT_CLOUDFLARE_DATABASE_ID!,
          token: env.SCRIPT_CLOUDFLARE_D1_TOKEN!,
        },
      }),
});
