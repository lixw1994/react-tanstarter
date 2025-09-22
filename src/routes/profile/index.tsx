import { createFileRoute } from "@tanstack/react-router";
import {
  Calendar,
  Mail,
  User,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export const Route = createFileRoute("/profile/")({
  component: ProfilePage,
});

function ProfilePage() {
  const context = Route.useRouteContext();
  const user = context.user;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">个人资料</h1>
        <p className="text-muted-foreground">管理您的账户信息和使用统计</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* 用户信息 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="mr-2 h-5 w-5" />
              账户信息
            </CardTitle>
            <CardDescription>您的基本账户信息</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <Mail className="text-muted-foreground h-4 w-4" />
              <div>
                <p className="text-sm font-medium">邮箱地址</p>
                <p className="text-muted-foreground text-sm">{user?.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <User className="text-muted-foreground h-4 w-4" />
              <div>
                <p className="text-sm font-medium">用户名</p>
                <p className="text-muted-foreground text-sm">{user?.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Calendar className="text-muted-foreground h-4 w-4" />
              <div>
                <p className="text-sm font-medium">注册时间</p>
                <p className="text-muted-foreground text-sm">未知</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
