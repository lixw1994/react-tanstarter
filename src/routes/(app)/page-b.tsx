import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { PageContainer } from "~/components/layout/app/PageContainer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export const Route = createFileRoute("/(app)/page-b")({
  component: PageB,
});

function PageB() {
  const { t } = useTranslation();

  return (
    <PageContainer title={t("nav.pageB")} description={t("pages.pageB.description")}>
      <Card>
        <CardHeader>
          <CardTitle>{t("pages.pageB.cardTitle")}</CardTitle>
          <CardDescription>{t("pages.pageB.cardDescription")}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">{t("pages.pageB.cardContent")}</p>
        </CardContent>
      </Card>
    </PageContainer>
  );
}
