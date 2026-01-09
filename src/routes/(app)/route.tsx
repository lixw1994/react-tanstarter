import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { clientEnv } from "~/client-env";
import { AppLayout } from "~/components/layout/app/AppLayout";

export const Route = createFileRoute("/(app)")({
  beforeLoad: async ({ context }) => {
    if (!context.user) {
      throw redirect({ to: "/login" });
    }
  },
  component: AuthedLayout,
});

function AuthedLayout() {
  const { isAdmin } = Route.useRouteContext();

  return (
    <AppLayout appName={clientEnv.VITE_APP_NAME} isAdmin={isAdmin}>
      <Outlet />
    </AppLayout>
  );
}
