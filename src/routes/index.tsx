import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: async ({ context }) => {
    if (!context.user) {
      throw redirect({ to: "/login" });
    }

    // 如果用户已登录，直接重定向到仪表板
    throw redirect({ to: "/dashboard" });
  },
});
