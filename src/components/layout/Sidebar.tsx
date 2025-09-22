import { useQueryClient } from "@tanstack/react-query";
import { Link, useLocation } from "@tanstack/react-router";
import {
  ChevronLeft,
  ChevronRight,
  Home,
  Store,
  LogOut,
  Menu,
  User,
  X,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import authClient from "~/lib/auth-client";
import { cn } from "~/lib/utils";

interface User {
  id?: string;
  name?: string;
  email?: string;
  image?: string;
  [key: string]: unknown;
}

interface SidebarProps {
  appName: string;
  className?: string;
}

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "404",
    href: "/not-found",
    icon: Store,
  },
  {
    title: "个人资料",
    href: "/profile",
    icon: User,
  },
];

interface SidebarContentProps {
  isCollapsed: boolean;
  filteredNavItems: NavItem[];
  location: ReturnType<typeof useLocation>;
  setIsCollapsed: (collapsed: boolean) => void;
  isMobile?: boolean;
  onMobileClose?: () => void;
  queryClient: ReturnType<typeof useQueryClient>;
  appName: string;
  isAdmin: boolean;
}

function SidebarContent({
  isCollapsed,
  filteredNavItems,
  location,
  setIsCollapsed,
  isMobile = false,
  onMobileClose,
  queryClient,
  appName,
  isAdmin,
}: SidebarContentProps) {
  return (
    <div className="flex h-full flex-col">
      {/* Logo & Header - 固定顶部 */}
      <div
        className={cn(
          "flex items-center px-4 py-6 border-b border-border/50 flex-shrink-0",
          isCollapsed ? "justify-center" : "justify-between",
        )}
      >
        {!isCollapsed && (
          <Link
            to="/dashboard"
            className="group flex items-center gap-3 font-bold text-lg transition-all duration-200 hover:scale-105"
            onClick={onMobileClose}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg">
              <span role="img" aria-label="logo" className="text-sm">
                📱
              </span>
            </div>
            <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent dark:from-white dark:to-gray-300">
              {appName}
            </span>
          </Link>
        )}
        {isMobile ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={onMobileClose}
            className="h-9 w-9 rounded-lg hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950"
          >
            <X className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden h-9 w-9 rounded-lg transition-all duration-200 hover:bg-gray-100 hover:scale-110 dark:hover:bg-gray-800 lg:flex"
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        )}
      </div>

      {/* Navigation - 可滚动区域 */}
      <nav className="flex-1 overflow-y-auto px-4 py-2">
        <TooltipProvider>
          <div className="space-y-1 pb-4">
            {filteredNavItems.map((item) => {
              const isActive =
                location.pathname === item.href ||
                (item.href !== "/dashboard" && location.pathname.startsWith(item.href));

              const NavLink = (
                <Link
                  to={item.href}
                  onClick={onMobileClose}
                  className={cn(
                    "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                    "hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100/50 hover:shadow-sm dark:hover:from-gray-800/50 dark:hover:to-gray-700/30",
                    isActive
                      ? "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 shadow-md ring-1 ring-blue-200/50 dark:from-blue-950/50 dark:to-indigo-950/30 dark:text-blue-300 dark:ring-blue-800/30"
                      : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100",
                    isCollapsed && !isMobile && "justify-center px-2",
                  )}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-gradient-to-b from-blue-500 to-indigo-600 shadow-sm" />
                  )}

                  <div className={cn(
                    "flex items-center justify-center rounded-lg p-1.5 transition-all duration-200",
                    isActive
                      ? "bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400"
                      : "group-hover:bg-white/60 group-hover:shadow-sm dark:group-hover:bg-gray-700/50"
                  )}>
                    <item.icon
                      className={cn("h-4 w-4", isCollapsed && !isMobile && "h-5 w-5")}
                    />
                  </div>

                  {(!isCollapsed || isMobile) && (
                    <>
                      <span className="flex-1">{item.title}</span>
                      {item.badge && (
                        <span className={cn(
                          "rounded-full px-2 py-0.5 text-xs font-medium",
                          isActive
                            ? "bg-blue-200 text-blue-700 dark:bg-blue-800 dark:text-blue-300"
                            : "bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
                        )}>
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </Link>
              );

              if (isCollapsed && !isMobile) {
                return (
                  <Tooltip key={item.href} delayDuration={0}>
                    <TooltipTrigger asChild>{NavLink}</TooltipTrigger>
                    <TooltipContent side="right" className="font-medium bg-gray-900 text-white border-gray-700">
                      {item.title}
                    </TooltipContent>
                  </Tooltip>
                );
              }

              return <div key={item.href}>{NavLink}</div>;
            })}
          </div>
        </TooltipProvider>
      </nav>

      {/* 用户信息区域 - 固定在最底部 */}
      <div className="border-t border-border/50 bg-gradient-to-r from-gray-50/50 to-white/50 p-4 flex-shrink-0 dark:from-gray-900/50 dark:to-gray-800/50">
        {/* 用户信息 */}
        {queryClient.getQueryData<User | null>(["user"]) && (
          <div className="space-y-3">
            {/* 用户头像和下拉菜单 */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                {isCollapsed && !isMobile ? (
                  <Tooltip delayDuration={0}>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-10 w-10 rounded-full p-0"
                      >
                        <img
                          src={queryClient.getQueryData<User | null>(["user"])?.image ?? "/default-avatar.jpeg"}
                          alt="User Avatar"
                          className="h-8 w-8 rounded-full object-cover"
                        />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      {queryClient.getQueryData<User | null>(["user"])?.name ||
                       queryClient.getQueryData<User | null>(["user"])?.email?.split('@')[0]}
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  <Button
                    variant="ghost"
                    className="h-auto w-full justify-start p-2"
                  >
                    <img
                      src={queryClient.getQueryData<User | null>(["user"])?.image ?? "/default-avatar.jpeg"}
                      alt="User Avatar"
                      className="h-8 w-8 rounded-full object-cover"
                    />
                    <div className="ml-3 flex-1 text-left">
                      <p className="text-sm font-medium">
                        {queryClient.getQueryData<User | null>(["user"])?.name ||
                         queryClient.getQueryData<User | null>(["user"])?.email?.split('@')[0]}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {queryClient.getQueryData<User | null>(["user"])?.email}
                      </p>
                    </div>
                  </Button>
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align={isCollapsed ? "center" : "end"}
                side="top"
                className="w-56 rounded-xl border-0 bg-white/95 p-2 shadow-xl ring-1 ring-gray-200/50 backdrop-blur-xl dark:bg-gray-900/95 dark:ring-gray-700/50"
              >
                <div className="px-3 py-2 mb-1">
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                    {queryClient.getQueryData<User | null>(["user"])?.name ||
                     queryClient.getQueryData<User | null>(["user"])?.email?.split('@')[0]}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {queryClient.getQueryData<User | null>(["user"])?.email}
                  </p>
                </div>
                <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent dark:via-gray-700 mb-1" />
                <DropdownMenuItem asChild>
                  <Link
                    to="/profile"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all duration-200 hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-950/50 dark:hover:text-blue-300"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400">
                      <User className="h-4 w-4" />
                    </div>
                    个人资料
                  </Link>
                </DropdownMenuItem>
                <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent dark:via-gray-700 my-1" />
                <DropdownMenuItem
                  onSelect={async () => {
                    try {
                      await authClient.signOut();
                      await queryClient.invalidateQueries({ queryKey: ["user"] });
                      queryClient.setQueryData(["user"], null);
                      window.location.href = "/";
                    } catch (error) {
                      console.error("Logout failed:", error);
                    }
                  }}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all duration-200 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-950/50 dark:hover:text-red-300"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-400">
                    <LogOut className="h-4 w-4" />
                  </div>
                  退出登录
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </div>
  );
}

export function Sidebar({ appName, className }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  const queryClient = useQueryClient();

  const user = queryClient.getQueryData<User | null>(["user"]) || null;

  // 检查是否是管理员
  const [isAdmin, setIsAdmin] = useState(false);

  // 添加调试信息
  console.log("Sidebar render - Current user:", user?.email, "isAdmin:", isAdmin);

  // 当用户信息变化时，检查是否是管理员
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user?.email) {
        return false;
      }

      try {
        console.log("Checking admin status for user:", user.email);
        const res = await fetch("/api/admin/check-admin");
        console.log("Admin check response status:", res.status);
        return res.status === 200;
      } catch (error) {
        console.log("Admin check error:", error);
        return false;
      }
    };

    checkAdminStatus().then(setIsAdmin);
  }, [user?.email]);

  const filteredNavItems = navItems.filter((item) => {
    return true;
  });

  // 关闭移动端侧边栏
  const closeMobileSidebar = () => {
    setIsMobileOpen(false);
  };

  // 监听路由变化，关闭移动端侧边栏
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsMobileOpen(true)}
        className="bg-background fixed top-4 left-4 z-50 h-10 w-10 border p-0 shadow-md lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={closeMobileSidebar}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform border-r border-border/50 bg-gradient-to-b from-white via-gray-50/50 to-white shadow-2xl transition-transform duration-300 ease-in-out dark:from-gray-950 dark:via-gray-900/50 dark:to-gray-950 lg:hidden",
          isMobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <SidebarContent
          isCollapsed={false}
          filteredNavItems={filteredNavItems}
          location={location}
          setIsCollapsed={setIsCollapsed}
          isMobile={true}
          onMobileClose={closeMobileSidebar}
          queryClient={queryClient}
          appName={appName}
          isAdmin={isAdmin}
        />
      </div>

      {/* Desktop Sidebar */}
      <div
        className={cn(
          "hidden h-screen flex-col border-r border-border/50 bg-gradient-to-b from-white via-gray-50/50 to-white shadow-xl transition-all duration-300 dark:from-gray-950 dark:via-gray-900/50 dark:to-gray-950 lg:flex",
          isCollapsed ? "w-16" : "w-64",
          className,
        )}
      >
        <SidebarContent
          isCollapsed={isCollapsed}
          filteredNavItems={filteredNavItems}
          location={location}
          setIsCollapsed={setIsCollapsed}
          queryClient={queryClient}
          appName={appName}
          isAdmin={isAdmin}
        />
      </div>
    </>
  );
}
