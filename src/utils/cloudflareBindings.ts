import type { R2Bucket } from "@cloudflare/workers-types";

interface CloudflareBindings {
  R2: R2Bucket;
}
/**
 * Will only work when being accessed on the server. Obviously, CF bindings are not available in the browser.
 * @returns
 */
export async function getCFBindings() {
  if (import.meta.env.DEV) {
    const { getPlatformProxy } = await import("wrangler");
    const { env } = await getPlatformProxy();
    return env as unknown as CloudflareBindings;
  }

  return process.env as unknown as CloudflareBindings;
}
