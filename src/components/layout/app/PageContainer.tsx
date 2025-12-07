import { cn } from "~/lib/utils";

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
  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        {description && <p className="text-muted-foreground mt-2">{description}</p>}
      </div>
      <div className={cn("space-y-6", className)}>{children}</div>
    </div>
  );
}
