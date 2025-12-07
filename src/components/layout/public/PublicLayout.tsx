import { cn } from "~/lib/utils";

interface PublicLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function PublicLayout({ children, className }: PublicLayoutProps) {
  return (
    <div className={cn("bg-background text-foreground min-h-screen", className)}>
      {children}
    </div>
  );
}
