import { createServerFileRoute } from "@tanstack/react-start/server";
import { auth } from "~/lib/server/auth";
import { env } from "~/lib/server/env";

function normalizeEmail(value?: string | null) {
  return value?.trim().toLowerCase() ?? "";
}

function getAdminSet(): Set<string> {
  if (!env.ADMIN_EMAILS) return new Set();
  return new Set(
    env.ADMIN_EMAILS
      .split(",")
      .map((email) => normalizeEmail(email))
      .filter(Boolean),
  );
}

const admins = getAdminSet();

export const ServerRoute = createServerFileRoute(
  "/api/admin/check-admin",
).methods({
  GET: async ({ request }) => {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session?.user?.email) {
      return Response.json({ error: "未授权访问" }, { status: 401 });
    }

    const email = normalizeEmail(session.user.email);

    if (!admins.has(email)) {
      return Response.json({ error: "非管理员账号" }, { status: 403 });
    }

    return Response.json({ isAdmin: true });
  },
});
