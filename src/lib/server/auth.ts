import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { reactStartCookies } from "better-auth/react-start";

import { db } from "./db";

// Convert string environment variables to boolean
const toBool = (value: string | undefined): boolean =>
  value?.toLowerCase() === 'true' || value === '1';

// Authentication feature flags
const AUTH_CONFIG = {
  ALLOW_SIGNUP: toBool(process.env.VITE_ALLOW_SIGNUP),
  ALLOW_PASSWORD_AUTH: toBool(process.env.VITE_ALLOW_PASSWORD_AUTH),
  ALLOW_GITHUB_AUTH: toBool(process.env.VITE_ALLOW_GITHUB_AUTH),
  ALLOW_GOOGLE_AUTH: toBool(process.env.VITE_ALLOW_GOOGLE_AUTH),
};

export const auth = betterAuth({
  baseURL: process.env.VITE_BASE_URL,
  database: drizzleAdapter(db, {
    provider: "pg",
  }),

  // https://www.better-auth.com/docs/integrations/tanstack#usage-tips
  plugins: [reactStartCookies()],

  // https://www.better-auth.com/docs/concepts/session-management#session-caching
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes
    },
  },

  // https://www.better-auth.com/docs/concepts/oauth
  socialProviders: AUTH_CONFIG.ALLOW_GITHUB_AUTH || AUTH_CONFIG.ALLOW_GOOGLE_AUTH ? {
    ...(AUTH_CONFIG.ALLOW_GITHUB_AUTH ? {
      github: {
        clientId: process.env.GITHUB_CLIENT_ID!,
        clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      }
    } : {}),
    ...(AUTH_CONFIG.ALLOW_GOOGLE_AUTH ? {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      }
    } : {})
  } : undefined,

  // https://www.better-auth.com/docs/authentication/email-password
  emailAndPassword: {
    enabled: AUTH_CONFIG.ALLOW_PASSWORD_AUTH,
  },
});
