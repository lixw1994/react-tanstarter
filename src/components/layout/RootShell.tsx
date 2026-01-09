import { Toaster } from "~/components/ui/sonner";

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
