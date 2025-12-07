import type { LucideIcon } from "lucide-react";
import { BarChart3, Home, Settings, Shield, Table } from "lucide-react";

export interface NavItem {
  titleKey: string;
  href: string;
  icon: LucideIcon;
}

/**
 * Navigation configuration for the app layout.
 * Add new pages here to have them appear in the sidebar.
 */
export const navConfig = {
  /** Main navigation items */
  main: [
    { titleKey: "nav.dashboard", href: "/dashboard", icon: Home },
    { titleKey: "nav.pageA", href: "/page-a", icon: Table },
    { titleKey: "nav.pageB", href: "/page-b", icon: BarChart3 },
  ] satisfies NavItem[],

  /** Settings navigation */
  settings: [
    { titleKey: "nav.settings", href: "/settings", icon: Settings },
  ] satisfies NavItem[],

  /** Admin-only navigation (only visible when isAdmin is true) */
  admin: [
    { titleKey: "nav.userManagement", href: "/admin/user-management", icon: Shield },
  ] satisfies NavItem[],
};
