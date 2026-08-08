import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useI18n } from "@/i18n";
import { useAuth } from "@/store/auth-store";
import { PageHero } from "@/components/site/PageHero";
import { images } from "@/data/site";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/login")({
  component: Login,
});

function Login() {
  const { t, isAr } = useI18n();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login();
    if (email.toLowerCase().includes("admin")) {
      navigate({ to: "/admin" });
    } else {
      navigate({ to: "/account" });
    }
  };

  const fillDemoAdmin = () => {
    setEmail("admin@butlers.com");
    setPassword("admin123");
  };

  const fillDemoClient = () => {
    setEmail("client@butlers.com");
    setPassword("client123");
  };

  return (
    <>
      <PageHero
        eyebrow={t("Account", "الحساب")}
        title={t("Sign In", "تسجيل الدخول")}
        description={t("Access your reservations and preferences.", "الوصول إلى حجوزاتك وتفضيلاتك.")}
        image={images.hero}
      />
      <section className="container-site max-w-md py-24">
        <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-border bg-card p-7 shadow-xl">
          <div className="space-y-2">
            <Label htmlFor="email">{t("Email", "البريد الإلكتروني")}</Label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">{t("Password", "كلمة المرور")}</Label>
              <Link to="/login" className="text-xs text-muted-foreground hover:text-foreground">
                {t("Forgot password?", "نسيت كلمة المرور؟")}
              </Link>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="pe-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 end-0 flex items-center pe-3 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>
          <button type="submit" className="w-full mt-2 rounded-xl bg-gold py-3 font-button text-sm font-semibold uppercase tracking-wide text-foreground transition-colors hover:bg-gold-soft">
            {t("Sign In", "تسجيل الدخول")}
          </button>
          
          <div className="mt-2 flex flex-col gap-2 rounded-xl bg-muted/50 p-4 border border-border/50">
            <p className="text-center text-xs font-medium text-muted-foreground">{t("Demo Accounts", "حسابات تجريبية")}</p>
            <div className="flex gap-2">
              <button type="button" onClick={fillDemoAdmin} className="flex-1 rounded-lg border border-border bg-background py-2 text-xs font-medium hover:bg-muted transition-colors text-foreground">
                {t("Admin", "مدير")}
              </button>
              <button type="button" onClick={fillDemoClient} className="flex-1 rounded-lg border border-border bg-background py-2 text-xs font-medium hover:bg-muted transition-colors text-foreground">
                {t("Client", "عميل")}
              </button>
            </div>
          </div>

          <p className="mt-2 text-center text-sm text-muted-foreground">
            {t("Don't have an account?", "ليس لديك حساب؟")}{" "}
            <Link to="/register" className="text-gold hover:underline">
              {t("Sign Up", "إنشاء حساب")}
            </Link>
          </p>
        </form>
      </section>
    </>
  );
}
