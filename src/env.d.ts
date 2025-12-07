/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Client-side environment variables
  readonly VITE_BASE_URL: string;
  readonly VITE_APP_NAME: string;
  readonly VITE_ALLOW_SIGNUP: string;
  readonly VITE_ALLOW_PASSWORD_AUTH: string;
  readonly VITE_ALLOW_GITHUB_AUTH: string;
  readonly VITE_ALLOW_GOOGLE_AUTH: string;
  readonly VITE_ALLOW_FEISHU_AUTH: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Server-side environment variables
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly VITE_BASE_URL: string;
      readonly DATABASE_URL: string;
      readonly BETTER_AUTH_SECRET: string;
      readonly BETTER_AUTH_URL: string;
      readonly GITHUB_CLIENT_ID: string;
      readonly GITHUB_CLIENT_SECRET: string;
      readonly GOOGLE_CLIENT_ID: string;
      readonly GOOGLE_CLIENT_SECRET: string;
      readonly FEISHU_CLIENT_ID: string;
      readonly FEISHU_CLIENT_SECRET: string;
      readonly NODE_ENV: string;
      readonly CLOUDFLARE_ACCOUNT_ID: string;
      readonly CLOUDFLARE_DATABASE_ID: string;
      readonly CLOUDFLARE_D1_TOKEN: string;
    }
  }
}

export {};
