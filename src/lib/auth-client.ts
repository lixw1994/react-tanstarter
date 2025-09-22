import { createAuthClient } from "better-auth/react";

// Convert string environment variables to boolean
const toBool = (value: string | undefined): boolean =>
  value?.toLowerCase() === 'true' || value === '1';

// Application configuration
export const APP_CONFIG = {
  APP_NAME: import.meta.env.VITE_APP_NAME || 'Tanstarter Default',
};

// Authentication feature flags
export const AUTH_CONFIG = {
  ALLOW_SIGNUP: toBool(import.meta.env.VITE_ALLOW_SIGNUP),
  ALLOW_PASSWORD_AUTH: toBool(import.meta.env.VITE_ALLOW_PASSWORD_AUTH),
  ALLOW_GITHUB_AUTH: toBool(import.meta.env.VITE_ALLOW_GITHUB_AUTH),
  ALLOW_GOOGLE_AUTH: toBool(import.meta.env.VITE_ALLOW_GOOGLE_AUTH),
};

const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export default authClient;
