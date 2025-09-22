import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="bg-background text-foreground flex min-h-svh flex-col">
      <main className="flex-grow">{children}</main>
    </div>
  );
}

export default Layout;
