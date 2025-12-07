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

export const Route = createFileRoute("/(app)/page-a")({
  component: PageA,
});

function PageA() {
  const { t } = useTranslation();

  return (
    <PageContainer title={t("nav.pageA")} description={t("pages.pageA.description")}>
      <Card>
        <CardHeader>
          <CardTitle>{t("pages.pageA.cardTitle")}</CardTitle>
          <CardDescription>{t("pages.pageA.cardDescription")}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">{t("pages.pageA.cardContent")}</p>
        </CardContent>
      </Card>
    </PageContainer>
  );
}
