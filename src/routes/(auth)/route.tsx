import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { AUTH_CONFIG } from "~/lib/auth-client";

export const Route = createFileRoute("/(auth)")({
  component: RouteComponent,
  beforeLoad: async ({ context, location }) => {
    const REDIRECT_URL = "/dashboard";

    // If user is logged in, redirect to dashboard
    if (context.user) {
      throw redirect({
        to: REDIRECT_URL,
      });
    }

    // If it's signup page but signup is not allowed, redirect to login page
    if (location.pathname === "/signup" && !AUTH_CONFIG.ALLOW_SIGNUP) {
      throw redirect({
        to: "/login",
      });
    }

    return {
      redirectUrl: REDIRECT_URL,
    };
  },
});

function RouteComponent() {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Outlet />
      </div>
    </div>
  );
}
