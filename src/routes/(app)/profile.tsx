import { createFileRoute } from "@tanstack/react-router";
import { Calendar, Mail, User } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PageContainer } from "~/components/layout/app/PageContainer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export const Route = createFileRoute("/(app)/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const { t } = useTranslation();
  const context = Route.useRouteContext();
  const user = context.user;

  return (
    <PageContainer title={t("profile.title")} description={t("profile.description")}>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="mr-2 h-5 w-5" />
              {t("profile.accountInfo")}
            </CardTitle>
            <CardDescription>{t("profile.basicAccountInfo")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <Mail className="text-muted-foreground h-4 w-4" />
              <div>
                <p className="text-sm font-medium">{t("profile.emailAddress")}</p>
                <p className="text-muted-foreground text-sm">{user?.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <User className="text-muted-foreground h-4 w-4" />
              <div>
                <p className="text-sm font-medium">{t("profile.username")}</p>
                <p className="text-muted-foreground text-sm">{user?.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Calendar className="text-muted-foreground h-4 w-4" />
              <div>
                <p className="text-sm font-medium">{t("profile.registrationTime")}</p>
                <p className="text-muted-foreground text-sm">{t("common.unknown")}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
