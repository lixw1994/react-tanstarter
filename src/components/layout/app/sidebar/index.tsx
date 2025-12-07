import { useTranslation } from "react-i18next";
import { cn } from "~/lib/utils";
import { SidebarFooter } from "./SidebarFooter";
import { SidebarHeader } from "./SidebarHeader";
import { SidebarNav, SidebarSection, type NavItem } from "./SidebarNav";
import { useSidebar } from "./useSidebar";

interface SidebarProps {
  appName: string;
  logo?: React.ReactNode;
  navItems: NavItem[];
  settingsItems?: NavItem[];
  adminItems?: NavItem[];
  isAdmin?: boolean;
}

export function Sidebar({
  appName,
  logo,
  navItems,
  settingsItems,
  adminItems,
  isAdmin = false,
}: SidebarProps) {
  const { t } = useTranslation();
  const { isCollapsed, isMobile, isMobileOpen, closeMobile } = useSidebar();

  return (
    <>
      {isMobile && !isMobileOpen && <SidebarHeader appName={appName} logo={logo} />}

      {isMobile && isMobileOpen && (
        <div
          className={cn(
            "fixed inset-0 z-35 bg-black/60 backdrop-blur-sm",
            "transition-opacity duration-300 ease-out",
            "md:hidden",
          )}
          onClick={closeMobile}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          "bg-sidebar text-sidebar-foreground flex h-screen flex-col",
          "border-sidebar-border border-r",
          !isMobile && [
            "sticky top-0 transition-[width] duration-200 ease-out",
            isCollapsed ? "w-16" : "w-64",
          ],
          isMobile && [
            "fixed inset-y-0 left-0 z-40",
            "w-[280px] max-w-[85vw]",
            "shadow-2xl",
            "transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
            isMobileOpen ? "translate-x-0" : "-translate-x-full",
            "pb-[env(safe-area-inset-bottom)]",
          ],
        )}
      >
        <SidebarHeader appName={appName} logo={logo} />

        <div className="flex flex-1 flex-col overflow-y-auto py-4">
          <SidebarNav items={navItems} />

          {settingsItems && settingsItems.length > 0 && (
            <SidebarSection title={t("sidebar.settings")}>
              <SidebarNav items={settingsItems} />
            </SidebarSection>
          )}

          {isAdmin && adminItems && adminItems.length > 0 && (
            <SidebarSection title={t("sidebar.admin")}>
              <SidebarNav items={adminItems} />
            </SidebarSection>
          )}
        </div>

        <SidebarFooter />
      </aside>
    </>
  );
}

export { type NavItem } from "./SidebarNav";
export { SidebarProvider, useSidebar } from "./useSidebar";
