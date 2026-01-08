import { createFileRoute } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { PageContainer } from "~/components/layout/app/PageContainer";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { $getUsers } from "./-functions";
import { useDeleteUserMutation } from "./-mutations";

export const Route = createFileRoute("/(app)/admin/user-management/")({
  loader: () => $getUsers(),
  component: UserManagementPage,
});

function UserManagementPage() {
  const { t, i18n } = useTranslation();
  const users = Route.useLoaderData();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const deleteMutation = useDeleteUserMutation();

  const handleDelete = (userId: string) => {
    setDeletingId(userId);
    deleteMutation.mutate(userId, {
      onSettled: () => setDeletingId(null),
    });
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString(i18n.language === "zh" ? "zh-CN" : "en-US");
  };

  return (
    <PageContainer
      title={t("userManagement.title")}
      description={t("userManagement.description")}
    >
      <Card>
        <CardHeader>
          <CardTitle>
            {t("userManagement.userList")} ({users.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50 border-b">
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    {t("userManagement.username")}
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    {t("userManagement.email")}
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    {t("userManagement.emailVerification")}
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    {t("userManagement.registrationTime")}
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-semibold">
                    {t("userManagement.actions")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-muted/50 border-b transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {user.image ? (
                          <img
                            src={user.image}
                            alt={user.name}
                            className="h-8 w-8 rounded-full"
                          />
                        ) : (
                          <div className="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <span className="font-medium">{user.name}</span>
                      </div>
                    </td>
                    <td className="text-muted-foreground px-4 py-3 text-sm">
                      {user.email}
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={user.emailVerified ? "success" : "warning"}>
                        {user.emailVerified
                          ? t("userManagement.verified")
                          : t("userManagement.unverified")}
                      </Badge>
                    </td>
                    <td className="text-muted-foreground px-4 py-3 text-sm">
                      {formatDate(user.createdAt)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            disabled={deletingId === user.id}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            aria-label={t("userManagement.deleteUser", {
                              name: user.name,
                            })}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              {t("userManagement.deleteDialogTitle")}
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              {t("userManagement.confirmDelete", { name: user.name })}
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>{t("common.cancel")}</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(user.id)}
                              className="bg-destructive hover:bg-destructive/90 text-white"
                            >
                              {t("common.delete")}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="text-muted-foreground px-4 py-8 text-center"
                    >
                      {t("userManagement.noUsers")}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </PageContainer>
  );
}
