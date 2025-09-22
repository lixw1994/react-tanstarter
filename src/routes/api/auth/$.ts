import { createServerFileRoute } from "@tanstack/react-start/server";
import { auth } from "~/lib/server/auth";

export const ServerRoute = createServerFileRoute("/api/auth/$").methods({
  GET: async ({ request }: { request: Request }) => {
    return auth.handler(request);
  },
  POST: async ({ request }: { request: Request }) => {
    return auth.handler(request);
  },
});
