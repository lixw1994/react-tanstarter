import { createFileRoute, Link, redirect, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Check, Github, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AuthDivider, SocialLoginButtons } from "~/components/auth/SocialLogin";
import { ThemeLangSwitcher } from "~/components/common/ThemeLangSwitcher";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { clientEnv } from "~/config/client-env";
import authClient from "~/lib/auth/auth-client";

export const Route = createFileRoute("/(public)/")({
  beforeLoad: async ({ context }) => {
    if (context.user) {
      throw redirect({ to: "/page-a" });
    }
  },
  component: LandingPage,
});

function LandingPage() {
  const { t } = useTranslation();

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <header className="border-b">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <img src="/login_logo.svg" alt="Logo" className="h-8" />
            <span>{clientEnv.VITE_APP_NAME}</span>
          </Link>
          <nav className="flex items-center gap-4">
            <a
              href="https://github.com/lixw1994/react-tanstarter"
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-foreground text-sm"
            >
              GitHub
            </a>
            <ThemeLangSwitcher />
            <Link to="/login">
              <Button variant="ghost" size="sm">
                {t("common.login")}
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-12 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left: Hero */}
          <HeroSection />

          {/* Right: Auth Card */}
          <div className="flex items-start justify-center lg:justify-end">
            <div className="bg-card w-full max-w-md rounded-2xl border p-8 shadow-lg">
              <AuthForm />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-center px-6">
          <p className="text-muted-foreground text-sm">{t("landing.footer")}</p>
        </div>
      </footer>
    </div>
  );
}

function HeroSection() {
  const { t } = useTranslation();

  const features = [
    t("landing.features.tanstack"),
    t("landing.features.auth"),
    t("landing.features.drizzle"),
    t("landing.features.tailwind"),
    t("landing.features.typescript"),
    t("landing.features.cloudflare"),
  ];

  return (
    <div className="flex flex-col justify-center py-8 lg:py-0">
      {/* Badge */}
      <div className="mb-8">
        <span className="bg-muted/50 text-muted-foreground inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium">
          <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
          {t("landing.openSource")}
        </span>
      </div>

      {/* Title */}
      <h1 className="text-foreground mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
        {t("landing.buildYourNext")}
        <br />
        <span className="text-primary">{t("landing.aiApplication")}</span>
      </h1>

      {/* Subtitle */}
      <p className="text-muted-foreground mb-10 max-w-lg text-lg">
        {t("landing.subtitle")}
      </p>

      {/* Feature List */}
      <ul className="mb-10 space-y-3">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm">
            <Check className="text-primary mt-0.5 h-4 w-4 shrink-0" />
            <span className="text-muted-foreground">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div className="flex items-center gap-4">
        <a
          href="https://github.com/lixw1994/react-tanstarter"
          target="_blank"
          rel="noreferrer"
        >
          <Button variant="outline" className="gap-2">
            <Github className="h-4 w-4" />
            {t("landing.viewOnGithub")}
            <ArrowRight className="h-3 w-3" />
          </Button>
        </a>
      </div>
    </div>
  );
}

function AuthForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { queryClient } = Route.useRouteContext();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    if (!email || !password) return;

    setIsLoading(true);
    setErrorMessage("");

    authClient.signIn.email(
      { email, password, callbackURL: "/page-a" },
      {
        onError: (ctx) => {
          setErrorMessage(ctx.error.message);
          setIsLoading(false);
        },
        onSuccess: async () => {
          await queryClient.invalidateQueries({ queryKey: ["authInfo"] });
          navigate({ to: "/page-a" });
        },
      },
    );
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-xl font-semibold tracking-tight">{t("auth.getStarted")}</h2>
        <p className="text-muted-foreground mt-1 text-sm">{t("auth.signInToContinue")}</p>
      </div>

      {/* Email/Password Form */}
      {clientEnv.VITE_ALLOW_PASSWORD_AUTH && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">{t("common.email")}</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              readOnly={isLoading}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">{t("common.password")}</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              readOnly={isLoading}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? t("auth.signingIn") : t("common.login")}
          </Button>
        </form>
      )}

      {/* Error */}
      {errorMessage && (
        <p className="text-destructive text-center text-sm">{errorMessage}</p>
      )}

      {/* Divider */}
      <AuthDivider />

      {/* Social Login */}
      <SocialLoginButtons
        callbackURL="/page-a"
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        setErrorMessage={setErrorMessage}
      />

      {/* Sign up link */}
      {clientEnv.VITE_ALLOW_SIGNUP && (
        <p className="text-muted-foreground text-center text-sm">
          {t("auth.dontHaveAccount")}{" "}
          <Link
            to="/signup"
            className="text-foreground font-medium underline-offset-4 hover:underline"
          >
            {t("common.signup")}
          </Link>
        </p>
      )}
    </div>
  );
}
