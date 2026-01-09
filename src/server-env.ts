import { z } from "zod";

const envSchema = z.object({
  ADMIN_EMAILS: z.string().transform((val) => val.trim().toLowerCase().split(",")),
  BETTER_AUTH_SECRET: z.string().min(32),
  BETTER_AUTH_URL: z.string(),
  GITHUB_CLIENT_ID: z.string().optional(),
  GITHUB_CLIENT_SECRET: z.string().optional(),
  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_CLIENT_SECRET: z.string().optional(),
  FEISHU_CLIENT_ID: z.string().optional(),
  FEISHU_CLIENT_SECRET: z.string().optional(),
});

export const serverEnv = envSchema.parse(process.env);
