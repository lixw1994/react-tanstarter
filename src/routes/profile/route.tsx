import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import SidebarLayout from "~/components/layout/SidebarLayout";

export const Route = createFileRoute("/profile")({
  component: RouteLayout,
  beforeLoad: async ({ context }) => {
    if (!context.user) {
      throw redirect({ to: "/login" });
    }
  },
});

function RouteLayout() {
  return (
    <SidebarLayout>
      <Outlet />
    </SidebarLayout>
  );
}
