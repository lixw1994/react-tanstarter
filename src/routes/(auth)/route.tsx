import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { AuthLayout } from "~/components/layout/auth/AuthLayout";
import { clientEnv } from "~/config/client-env";

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
    if (location.pathname === "/signup" && !clientEnv.VITE_ALLOW_SIGNUP) {
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
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  );
}
