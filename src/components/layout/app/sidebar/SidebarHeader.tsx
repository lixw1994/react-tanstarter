import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Menu, X } from "lucide-react";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { useSidebar } from "./useSidebar";

interface SidebarHeaderProps {
  appName: string;
  logo?: React.ReactNode;
}

export function SidebarHeader({ appName, logo }: SidebarHeaderProps) {
  const { isCollapsed, isMobile, isMobileOpen, toggle, closeMobile, openMobile } =
    useSidebar();

  // Mobile hamburger button (rendered outside sidebar)
  if (isMobile && !isMobileOpen) {
    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={openMobile}
        className="bg-background fixed top-4 left-4 z-40 h-10 w-10 border shadow-md md:hidden"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <div
      className={cn(
        "border-sidebar-border flex h-16 shrink-0 items-center border-b px-4",
        isCollapsed && !isMobile ? "justify-center" : "justify-between",
      )}
    >
      {/* Logo & App Name */}
      {(!isCollapsed || isMobile) && (
        <Link
          to="/"
          className="flex items-center gap-3 font-bold transition-transform hover:scale-105"
          onClick={isMobile ? closeMobile : undefined}
        >
          {logo ?? (
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-blue-500 to-purple-600 text-white shadow-lg">
              <span className="text-sm">✦</span>
            </div>
          )}
          <span className="from-foreground to-muted-foreground bg-linear-to-r bg-clip-text text-transparent">
            {appName}
          </span>
        </Link>
      )}

      {/* Collapse Button (Desktop) / Close Button (Mobile) */}
      {isMobile ? (
        <Button
          variant="ghost"
          size="icon"
          onClick={closeMobile}
          className="hover:bg-destructive/10 hover:text-destructive h-9 w-9"
          aria-label="Close menu"
        >
          <X className="h-5 w-5" />
        </Button>
      ) : (
        <Button
          variant="ghost"
          size="icon"
          onClick={toggle}
          className="hidden h-9 w-9 transition-transform hover:scale-110 md:flex"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      )}
    </div>
  );
}
