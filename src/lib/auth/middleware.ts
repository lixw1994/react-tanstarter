import { createMiddleware } from "@tanstack/react-start";
import { getRequest, setResponseStatus } from "@tanstack/react-start/server";
import { serverEnv } from "~/server-env";

// https://tanstack.com/start/latest/docs/framework/react/guide/middleware
// This is just an example middleware that you can modify and use in your server functions or routes.

/**
 * Middleware to force authentication on server requests (including server functions), and add the user to the context.
 */
export const authMiddleware = createMiddleware().server(async ({ context, next }) => {
  const session = await context.auth.api.getSession({
    headers: getRequest().headers,
    query: {
      // ensure session is fresh
      // https://www.better-auth.com/docs/concepts/session-management#session-caching
      disableCookieCache: true,
    },
  });

  if (!session) {
    setResponseStatus(401);
    throw new Error("Unauthorized");
  }

  return next({ context: { user: session.user } });
});

/**
 * Middleware to force authentication and check if the user is an admin.
 */
export const adminMiddleware = createMiddleware().server(async ({ context, next }) => {
  const session = await context.auth.api.getSession({
    headers: getRequest().headers,
    query: {
      disableCookieCache: true,
    },
  });

  if (!session) {
    setResponseStatus(401);
    throw new Error("Unauthorized");
  }

  const adminEmails = serverEnv.ADMIN_EMAILS;

  if (!adminEmails.includes(session.user.email)) {
    setResponseStatus(403);
    throw new Error("Forbidden");
  }

  return next({ context: { user: session.user } });
});
