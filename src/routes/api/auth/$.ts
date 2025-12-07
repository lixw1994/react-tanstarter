import { createFileRoute } from "@tanstack/react-router";
import { getAuth } from "~/lib/auth";

export const Route = createFileRoute("/api/auth/$")({
  server: {
    handlers: {
      GET: async ({ request, context }) => {
        return getAuth(context.db).handler(request);
      },
      POST: async ({ request, context }) => {
        return getAuth(context.db).handler(request);
      },
    },
  },
});
