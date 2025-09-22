import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { genericOAuth } from "better-auth/plugins";
import { reactStartCookies } from "better-auth/react-start";

import { getDB } from "./db";

// Convert string environment variables to boolean
const toBool = (value: string | undefined): boolean =>
  value?.toLowerCase() === "true" || value === "1";

// Authentication feature flags
const AUTH_CONFIG = {
  ALLOW_SIGNUP: toBool(process.env.VITE_ALLOW_SIGNUP),
  ALLOW_PASSWORD_AUTH: toBool(process.env.VITE_ALLOW_PASSWORD_AUTH),
  ALLOW_GITHUB_AUTH: toBool(process.env.VITE_ALLOW_GITHUB_AUTH),
  ALLOW_GOOGLE_AUTH: toBool(process.env.VITE_ALLOW_GOOGLE_AUTH),
  ALLOW_FEISHU_AUTH: toBool(process.env.VITE_ALLOW_FEISHU_AUTH),
};

export const auth = betterAuth({
  baseURL: process.env.VITE_BASE_URL,
  database: drizzleAdapter(getDB(), {
    provider: "pg",
  }),

  // https://www.better-auth.com/docs/integrations/tanstack#usage-tips
  plugins: [
    reactStartCookies(),
    genericOAuth({
      config: [
        {
          providerId: "feishu",
          clientId: process.env.FEISHU_CLIENT_ID as string,
          clientSecret: process.env.FEISHU_CLIENT_SECRET as string,
          authorizationUrl: "https://accounts.feishu.cn/open-apis/authen/v1/authorize",
          tokenUrl: "https://open.feishu.cn/open-apis/authen/v2/oauth/token",
          userInfoUrl: "https://open.feishu.cn/open-apis/authen/v1/user_info",
          redirectURI: `${process.env.VITE_BASE_URL}/api/auth/callback/feishu`,
          scopes: ["contact:user.email:readonly", "contact:user.department:readonly"], // and more...
          mapProfileToUser: (profile) => {
            console.log("feishu profile", profile.data);
            return {
              id: profile.data.union_id || profile.data.open_id,
              name: profile.data.name,
              email: profile.data.email || `${profile.data.en_name}@joycastle.mobi`,
              emailVerified: true,
              image: profile.data.avatar_url,
            };
          },
        },
      ],
    }),
  ],

  // https://www.better-auth.com/docs/concepts/session-management#session-caching
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes
    },
  },

  // https://www.better-auth.com/docs/concepts/oauth
  socialProviders:
    AUTH_CONFIG.ALLOW_GITHUB_AUTH || AUTH_CONFIG.ALLOW_GOOGLE_AUTH
      ? {
          ...(AUTH_CONFIG.ALLOW_GITHUB_AUTH
            ? {
                github: {
                  clientId: process.env.GITHUB_CLIENT_ID!,
                  clientSecret: process.env.GITHUB_CLIENT_SECRET!,
                },
              }
            : {}),
          ...(AUTH_CONFIG.ALLOW_GOOGLE_AUTH
            ? {
                google: {
                  clientId: process.env.GOOGLE_CLIENT_ID!,
                  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
                },
              }
            : {}),
        }
      : undefined,

  // https://www.better-auth.com/docs/authentication/email-password
  emailAndPassword: {
    enabled: AUTH_CONFIG.ALLOW_PASSWORD_AUTH,
  },
});
