/// <reference types="vite/client" />

interface ImportMetaEnv {
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
