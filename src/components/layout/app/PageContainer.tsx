import { Menu } from "lucide-react";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { useSidebar } from "./sidebar/useSidebar";

interface PageContainerProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function PageContainer({
  title,
  description,
  children,
  className,
}: PageContainerProps) {
  const { isMobile, openMobile } = useSidebar();

  return (
    <div className="flex min-h-screen flex-col">
      {/* Mobile Header */}
      {isMobile && (
        <header className="bg-background/95 supports-[backdrop-filter]:bg-background/80 sticky top-0 z-30 flex h-14 items-center gap-3 border-b px-4 backdrop-blur">
          <Button
            variant="ghost"
            size="icon"
            onClick={openMobile}
            className="h-9 w-9 shrink-0"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="truncate text-lg font-semibold">{title}</h1>
        </header>
      )}

      {/* Page Content */}
      <div className="flex-1 p-6 lg:p-8">
        <div className="mb-6">
          {/* Desktop title - hidden on mobile since it's in the header */}
          <h1 className="hidden text-3xl font-bold tracking-tight md:block">{title}</h1>
          {description && (
            <p className="text-muted-foreground mt-2 md:mt-2">{description}</p>
          )}
        </div>
        <div className={cn("space-y-6", className)}>{children}</div>
      </div>
    </div>
  );
}
