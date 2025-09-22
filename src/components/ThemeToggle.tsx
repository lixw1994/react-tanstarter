import { MoonIcon, SunIcon } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "~/lib/utils";

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export default function ThemeToggle({ className, showLabel = false }: ThemeToggleProps) {
  function toggleTheme() {
    if (
      document.documentElement.classList.contains("dark") ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    } else {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    }
  }

  const isDark = typeof window !== "undefined" && 
    (document.documentElement.classList.contains("dark") ||
     (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches));

  if (showLabel) {
    return (
      <Button 
        variant="outline" 
        type="button" 
        onClick={toggleTheme}
        className={cn("gap-2", className)}
      >
        <SunIcon className="size-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
        <MoonIcon className="absolute size-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
        <span>{isDark ? "浅色模式" : "深色模式"}</span>
      </Button>
    );
  }

  return (
    <Button 
      variant="outline" 
      size="icon" 
      type="button" 
      onClick={toggleTheme}
      className={cn(className)}
    >
      <SunIcon className="size-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <MoonIcon className="absolute size-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
