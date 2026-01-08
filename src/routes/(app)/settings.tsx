import { createFileRoute } from "@tanstack/react-router";
import { Moon, Sun } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { PageContainer } from "~/components/layout/app/PageContainer";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Label } from "~/components/ui/label";

export const Route = createFileRoute("/(app)/settings")({
  component: SettingsPage,
});

function getInitialTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  const stored = localStorage.getItem("theme") as "light" | "dark" | null;
  return stored ?? "light";
}

function SettingsPage() {
  const { t, i18n } = useTranslation();
  const [theme, setTheme] = useState<"light" | "dark">(getInitialTheme);

  const handleThemeChange = (newTheme: "light" | "dark") => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <PageContainer title={t("settings.title")} description={t("settings.description")}>
      <div className="max-w-2xl space-y-6">
        {/* Theme Section */}
        <Card>
          <CardHeader>
            <CardTitle>{t("settings.theme")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Label>{t("settings.selectTheme")}</Label>
            <div className="flex gap-4">
              <Button
                variant={theme === "light" ? "default" : "outline"}
                onClick={() => handleThemeChange("light")}
                className="flex-1 gap-2"
              >
                <Sun className="h-4 w-4" />
                {t("settings.light")}
              </Button>
              <Button
                variant={theme === "dark" ? "default" : "outline"}
                onClick={() => handleThemeChange("dark")}
                className="flex-1 gap-2"
              >
                <Moon className="h-4 w-4" />
                {t("settings.dark")}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Language Section */}
        <Card>
          <CardHeader>
            <CardTitle>{t("settings.language")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Label>{t("settings.languageDescription")}</Label>
            <div className="flex gap-4">
              <Button
                variant={i18n.language === "en" ? "default" : "outline"}
                onClick={() => handleLanguageChange("en")}
                className="flex-1"
              >
                English
              </Button>
              <Button
                variant={i18n.language === "zh" ? "default" : "outline"}
                onClick={() => handleLanguageChange("zh")}
                className="flex-1"
              >
                简体中文
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Notification Section (Placeholder) */}
        <Card>
          <CardHeader>
            <CardTitle>{t("settings.notifications")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              {t("settings.notificationsComingSoon")}
            </p>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
