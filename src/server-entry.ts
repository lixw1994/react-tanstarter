import handler from "@tanstack/react-start/server-entry";
import { getAuth } from "./lib/auth";
import { getDb } from "./lib/db";

export type RequestContext = {
  env: Env;
  db: ReturnType<typeof getDb>;
  auth: ReturnType<typeof getAuth>;
  waitUntil: (promise: Promise<unknown>) => void;
  passThroughOnException: () => void;
};

declare module "@tanstack/react-start" {
  interface Register {
    server: {
      requestContext: RequestContext;
    };
  }
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    const db = getDb(env);
    const auth = getAuth(db);
    return handler.fetch(request, {
      context: {
        env,
        db,
        auth,
        waitUntil: ctx.waitUntil.bind(ctx),
        passThroughOnException: ctx.passThroughOnException.bind(ctx),
      },
    });
  },
};
