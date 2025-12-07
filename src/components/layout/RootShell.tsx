import { Toaster } from "~/components/ui/sonner";
import "~/i18n";

interface RootShellProps {
  children: React.ReactNode;
}

export function RootShell({ children }: RootShellProps) {
  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col">
      {children}
      <Toaster />
    </div>
  );
}
