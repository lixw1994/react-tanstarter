import { cn } from "~/lib/utils";

interface AuthLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function AuthLayout({ children, className }: AuthLayoutProps) {
  return (
    <div
      className={cn(
        "bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10",
        className,
      )}
    >
      <div className="w-full max-w-sm">{children}</div>
    </div>
  );
}
