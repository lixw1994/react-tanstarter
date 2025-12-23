import { betterAuth } from "better-auth";
import { DB, drizzleAdapter } from "better-auth/adapters/drizzle";
import { genericOAuth, GenericOAuthConfig } from "better-auth/plugins";
import { tanstackStartCookies } from "better-auth/tanstack-start";

import { clientEnv } from "~/config/client-env";
import { serverEnv } from "~/config/server-env";

// Create auth instance lazily
export function getAuth(db: DB) {
  const genericOAuthConfigs: GenericOAuthConfig[] = [];
  if (clientEnv.VITE_ALLOW_FEISHU_AUTH) {
    genericOAuthConfigs.push({
      providerId: "feishu",
      clientId: serverEnv.FEISHU_CLIENT_ID as string,
      clientSecret: serverEnv.FEISHU_CLIENT_SECRET as string,
      authorizationUrl: "https://accounts.feishu.cn/open-apis/authen/v1/authorize",
      tokenUrl: "https://open.feishu.cn/open-apis/authen/v2/oauth/token",
      userInfoUrl: "https://open.feishu.cn/open-apis/authen/v1/user_info",
      redirectURI: `${clientEnv.VITE_BASE_URL}/api/auth/callback/feishu`,
      scopes: ["contact:user.email:readonly", "contact:user.department:readonly"],
      mapProfileToUser: (profile) => {
        return {
          id: profile.data.union_id || profile.data.open_id,
          name: profile.data.name,
          email: profile.data.email || `${profile.data.en_name}@example.com`,
          emailVerified: true,
          image: profile.data.avatar_url,
        };
      },
    });
  }

  return betterAuth({
    baseURL: clientEnv.VITE_BASE_URL,
    database: drizzleAdapter(db, {
      provider: "sqlite",
    }),

    plugins: [
      tanstackStartCookies(),
      genericOAuth({
        config: genericOAuthConfigs,
      }),
    ],

    session: {
      cookieCache: {
        enabled: true,
        maxAge: 5 * 60,
      },
    },

    socialProviders:
      clientEnv.VITE_ALLOW_GITHUB_AUTH || clientEnv.VITE_ALLOW_GOOGLE_AUTH
        ? {
            ...(clientEnv.VITE_ALLOW_GITHUB_AUTH
              ? {
                  github: {
                    clientId: process.env.GITHUB_CLIENT_ID!,
                    clientSecret: process.env.GITHUB_CLIENT_SECRET!,
                  },
                }
              : {}),
            ...(clientEnv.VITE_ALLOW_GOOGLE_AUTH
              ? {
                  google: {
                    clientId: process.env.GOOGLE_CLIENT_ID!,
                    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
                  },
                }
              : {}),
          }
        : undefined,

    emailAndPassword: {
      enabled: clientEnv.VITE_ALLOW_PASSWORD_AUTH,
    },
  });
}
