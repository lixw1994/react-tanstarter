import { z } from "zod";

const clientEnvSchema = z.object({
  VITE_BASE_URL: z.string(),
  VITE_APP_NAME: z.string(),
  VITE_ALLOW_SIGNUP: z.stringbool().default(false),
  VITE_ALLOW_PASSWORD_AUTH: z.stringbool().default(false),
  VITE_ALLOW_GITHUB_AUTH: z.stringbool().default(false),
  VITE_ALLOW_GOOGLE_AUTH: z.stringbool().default(false),
  VITE_ALLOW_FEISHU_AUTH: z.stringbool().default(false),
});

export const clientEnv = clientEnvSchema.parse(import.meta.env);
