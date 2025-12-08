import { createServerFn } from "@tanstack/react-start";
import { getRequest, setResponseHeader } from "@tanstack/react-start/server";
import { serverEnv } from "~/config/server-env";
import { getAuth } from "~/lib/auth";

/**
 * Server function to get current user's auth info.
 */
export const $getAuthInfo = createServerFn({ method: "GET" }).handler(
  async ({ context }) => {
    const session = await getAuth(context.db).api.getSession({
      headers: getRequest().headers,
      returnHeaders: true,
    });

    // Forward any Set-Cookie headers to the client
    const cookies = session.headers?.getSetCookie();
    if (cookies?.length) {
      setResponseHeader("Set-Cookie", cookies);
    }

    if (!session.response?.user) {
      return { user: null, isAdmin: false };
    }

    const isAdmin = serverEnv.ADMIN_EMAILS.includes(session.response.user.email);
    return { user: session.response.user, isAdmin };
  },
);
