import { ThemeLangSwitcher } from "~/components/common/ThemeLangSwitcher";
import { cn } from "~/lib/utils";

interface AuthLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function AuthLayout({ children, className }: AuthLayoutProps) {
  return (
    <div
      className={cn(
        "bg-background relative flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10",
        className,
      )}
    >
      {/* Theme/Language Switcher - Fixed at top right */}
      <div className="absolute top-4 right-4">
        <ThemeLangSwitcher />
      </div>
      <div className="w-full max-w-sm">{children}</div>
    </div>
  );
}
