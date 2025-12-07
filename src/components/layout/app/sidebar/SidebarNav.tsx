import { Link, useLocation } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { cn } from "~/lib/utils";
import { useSidebar } from "./useSidebar";

export interface NavItem {
  titleKey: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
}

interface SidebarNavProps {
  items: NavItem[];
  className?: string;
}

export function SidebarNav({ items, className }: SidebarNavProps) {
  const { t } = useTranslation();
  const { isCollapsed, isMobile, closeMobile } = useSidebar();
  const location = useLocation();

  return (
    <TooltipProvider delayDuration={0}>
      <nav className={cn("space-y-1 px-3", className)}>
        {items.map((item) => {
          const isActive =
            location.pathname === item.href ||
            (item.href !== "/" && location.pathname.startsWith(item.href));
          const title = t(item.titleKey);

          const linkContent = (
            <Link
              to={item.href}
              onClick={isMobile ? closeMobile : undefined}
              className={cn(
                "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                "hover:bg-sidebar-accent",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                  : "text-sidebar-foreground/70 hover:text-sidebar-foreground",
                isCollapsed && !isMobile && "justify-center px-2",
              )}
            >
              <item.icon
                className={cn(
                  "h-5 w-5 shrink-0 transition-transform group-hover:scale-110",
                  isActive && "text-sidebar-primary-foreground",
                )}
              />

              {(!isCollapsed || isMobile) && (
                <>
                  <span className="flex-1 truncate">{title}</span>
                  {item.badge && (
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase",
                        isActive
                          ? "bg-sidebar-primary-foreground/20 text-sidebar-primary-foreground"
                          : "bg-sidebar-accent text-sidebar-accent-foreground",
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </Link>
          );

          // Show tooltip when collapsed on desktop
          if (isCollapsed && !isMobile) {
            return (
              <Tooltip key={item.href}>
                <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                <TooltipContent side="right" className="font-medium" sideOffset={8}>
                  {title}
                </TooltipContent>
              </Tooltip>
            );
          }

          return <div key={item.href}>{linkContent}</div>;
        })}
      </nav>
    </TooltipProvider>
  );
}

interface SidebarSectionProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function SidebarSection({ title, children, className }: SidebarSectionProps) {
  const { isCollapsed, isMobile } = useSidebar();

  return (
    <div className={cn("py-2", className)}>
      {title && (!isCollapsed || isMobile) && (
        <h3 className="text-sidebar-foreground/50 mb-2 px-4 text-xs font-semibold tracking-wider uppercase">
          {title}
        </h3>
      )}
      {title && isCollapsed && !isMobile && (
        <div className="bg-sidebar-border mx-auto mb-2 h-px w-8" />
      )}
      {children}
    </div>
  );
}
