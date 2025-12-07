import { navConfig } from "~/config/nav";
import { Sidebar, SidebarProvider } from "./sidebar";

interface AppLayoutProps {
  children: React.ReactNode;
  appName?: string;
  isAdmin?: boolean;
}

export function AppLayout({
  children,
  appName = "App",
  isAdmin = false,
}: AppLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar
          appName={appName}
          navItems={navConfig.main}
          settingsItems={navConfig.settings}
          adminItems={navConfig.admin}
          isAdmin={isAdmin}
        />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </SidebarProvider>
  );
}
