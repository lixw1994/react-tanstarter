import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { useSidebar } from "./useSidebar";

interface SidebarHeaderProps {
  appName: string;
  logo?: React.ReactNode;
}

export function SidebarHeader({ appName, logo }: SidebarHeaderProps) {
  const { isCollapsed, isMobile, toggle, closeMobile } = useSidebar();

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
          {logo ?? <img src="/logo.svg" alt={appName} className="h-8 w-auto" />}
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
