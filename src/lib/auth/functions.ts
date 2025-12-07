import { createServerFn } from "@tanstack/react-start";
import { getRequest, setResponseHeader } from "@tanstack/react-start/server";
import { serverEnv } from "~/config/server-env";
import { getAuth } from "~/lib/auth";
import { adminMiddleware, authMiddleware } from "./middleware";

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

/**
 * Factory function to create a server function with auth middleware built-in.
 * The handler will have access to `context.user` (the authenticated user).
 */
export const createAuthServerFn = (options?: Parameters<typeof createServerFn>[0]) =>
  createServerFn(options).middleware([authMiddleware]);

/**
 * Factory function to create a server function with admin middleware built-in.
 * The handler will have access to `context.user` (the authenticated admin user).
 * Will throw 401 if not authenticated, 403 if not an admin.
 */
export const createAdminServerFn = (options?: Parameters<typeof createServerFn>[0]) =>
  createServerFn(options).middleware([adminMiddleware]);
