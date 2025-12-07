import handler from "@tanstack/react-start/server-entry";
import { getDb } from "./lib/db";

export type RequestContext = {
  env: Env;
  db: ReturnType<typeof getDb>;
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
    return handler.fetch(request, {
      context: {
        env,
        db: getDb(env),
        waitUntil: ctx.waitUntil.bind(ctx),
        passThroughOnException: ctx.passThroughOnException.bind(ctx),
      },
    });
  },
};
