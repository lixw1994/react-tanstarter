import { genericOAuthClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { clientEnv } from "~/client-env";

const authClient = createAuthClient({
  baseURL: clientEnv.VITE_BASE_URL,
  plugins: [genericOAuthClient()],
});

export default authClient;
