import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Button } from "~/components/ui/button";

export const Route = createFileRoute("/(public)/about")({
  component: About,
});

function About() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-4">
      <h1 className="text-4xl font-bold">{t("about.title")}</h1>
      <p className="text-muted-foreground text-xl">{t("about.subtitle")}</p>
      <Button asChild>
        <Link to="/">{t("about.backHome")}</Link>
      </Button>
    </div>
  );
}
