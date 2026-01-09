import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { clientEnv } from "~/client-env";
import { AuthDivider, SocialLoginButtons } from "~/components/auth/SocialLogin";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import authClient from "~/lib/auth/auth-client";

export const Route = createFileRoute("/(auth)/signup")({
  component: SignupForm,
});

function SignupForm() {
  const { t } = useTranslation();
  const { redirectUrl, queryClient } = Route.useRouteContext();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirm_password") as string;

    if (!name || !email || !password || !confirmPassword) return;

    if (password !== confirmPassword) {
      setErrorMessage(t("auth.passwordsDoNotMatch"));
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    authClient.signUp.email(
      {
        name,
        email,
        password,
        callbackURL: redirectUrl,
      },
      {
        onError: (ctx) => {
          setErrorMessage(ctx.error.message);
          setIsLoading(false);
        },
        onSuccess: async () => {
          await queryClient.invalidateQueries({ queryKey: ["user"] });
          navigate({ to: redirectUrl });
        },
      },
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <div className="flex flex-col items-center gap-4">
              <img src="/logo.svg" alt="Logo" className="mb-4 h-12" />
              <h1 className="text-2xl font-semibold tracking-tight">
                {t("auth.connectTo", { appName: clientEnv.VITE_APP_NAME })}
              </h1>
            </div>
          </div>

          {clientEnv.VITE_ALLOW_PASSWORD_AUTH && (
            <div className="flex flex-col gap-5">
              <div className="grid gap-2">
                <Label htmlFor="name">{t("common.name")}</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  readOnly={isLoading}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">{t("common.email")}</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="hello@example.com"
                  readOnly={isLoading}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">{t("common.password")}</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder={t("common.password")}
                  readOnly={isLoading}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirm_password">{t("common.confirmPassword")}</Label>
                <Input
                  id="confirm_password"
                  name="confirm_password"
                  type="password"
                  placeholder={t("common.confirmPassword")}
                  readOnly={isLoading}
                  required
                />
              </div>
              <Button
                type="submit"
                className="mt-2 w-full"
                size="lg"
                disabled={isLoading}
              >
                {isLoading && <LoaderCircle className="animate-spin" />}
                {isLoading ? t("auth.signingUp") : t("common.signup")}
              </Button>
            </div>
          )}

          {errorMessage && (
            <span className="text-destructive text-center text-sm">{errorMessage}</span>
          )}

          <AuthDivider />

          <SocialLoginButtons
            callbackURL={redirectUrl}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            setErrorMessage={setErrorMessage}
          />
        </div>
      </form>

      <div className="text-center text-sm">
        {t("auth.alreadyHaveAccount")}{" "}
        <Link to="/login" className="underline underline-offset-4">
          {t("common.login")}
        </Link>
      </div>
    </div>
  );
}
