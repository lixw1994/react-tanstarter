import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import Footer from "./Footer";
import { FloatingControls } from "./FloatingControls";
import Header from "./Header";
import { Sidebar } from "./Sidebar";
import { APP_CONFIG } from "~/lib/auth-client";

interface SidebarLayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
}

function SidebarLayout({
  children,
  showHeader = false,  // 默认不显示 Header
  showFooter = false,
}: SidebarLayoutProps) {
  const appName = APP_CONFIG.APP_NAME;
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<any>(["user"]) || null;

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100/50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800/50">
      {/* Sidebar - 确保完整高度 */}
      <div className="h-full">
        <Sidebar appName={appName} />
      </div>

      {/* Main Content Area */}
      <div className="flex h-full min-w-0 flex-1 flex-col">
        {/* Optional Header */}
        {showHeader && <Header appName={appName} showNavigation={false} />}

        {/* Main Content */}
        <main className="relative flex-1 overflow-auto">
          {/* Content Container with Glass Effect */}
          <div className="relative h-full">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.03),transparent_50%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)]" />

            {/* Main Content */}
            <div className="relative h-full p-4 lg:p-6">
              <div className="h-full w-full">
                {children}
              </div>
            </div>
          </div>

          {/* 悬浮控制栏 */}
          <FloatingControls user={user} />
        </main>

        {/* Optional Footer */}
        {showFooter && <Footer />}
      </div>
    </div>
  );
}

export default SidebarLayout;
