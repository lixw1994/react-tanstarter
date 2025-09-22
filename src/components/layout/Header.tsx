import { useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { Button } from "~/components/ui/button";

// 定义用户类型
interface User {
  id?: string;
  name?: string;
  email?: string;
  image?: string;
  [key: string]: unknown; // 允许其他属性，但使用 unknown 类型更安全
}

interface HeaderProps {
  appName: string;
  showNavigation?: boolean;
}

function Header({ appName, showNavigation = true }: HeaderProps) {
  // 直接从全局状态获取用户信息
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<User | null>(["user"]) || null;
  const isLoggedIn = !!user;

  return (
    <header className="border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b px-4 backdrop-blur">
      {/* 左侧 Logo */}
      <div className="flex items-center gap-2">
        <Link to="/" className="flex items-center gap-1 font-semibold">
          <span role="img" aria-label="logo">
            📱
          </span>
          <span>{appName}</span>
        </Link>
      </div>

      {/* 中间导航 - 可选显示 */}
      {showNavigation && (
        <nav className="hidden items-center gap-6 md:flex">
          {/* 导航项已移至侧边栏 */}
        </nav>
      )}

      {/* 右侧区域 - 如果未登录显示登录按钮 */}
      <div className="flex items-center gap-4">
        {!isLoggedIn && (
          <Button size="sm">
            <Link to="/login">登录</Link>
          </Button>
        )}
      </div>
    </header>
  );
}

export default Header;
