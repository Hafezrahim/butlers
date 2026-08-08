import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useI18n } from "@/i18n";
import { useAuth } from "@/store/auth-store";
import { PageHero } from "@/components/site/PageHero";
import { images } from "@/data/site";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/register")({
  component: Register,
});

function Register() {
  const { t, isAr } = useI18n();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login();
    navigate({ to: "/account" });
  };

  return (
    <>
      <PageHero
        eyebrow={t("Account", "الحساب")}
        title={t("Sign Up", "إنشاء حساب")}
        description={t("Join us to manage your bookings and enjoy exclusive perks.", "انضم إلينا لإدارة حجوزاتك والاستمتاع بمزايا حصرية.")}
        image={images.hero}
      />
      <section className="container-site max-w-md py-24">
        <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-border bg-card p-7 shadow-xl">
          <div className="space-y-2">
            <Label htmlFor="name">{t("Full Name", "الاسم الكامل")}</Label>
            <Input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Hafez Rahim"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">{t("Phone Number", "رقم الهاتف")}</Label>
            <Input
              id="phone"
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+201007419344"
            />
          </div>
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
            <Label htmlFor="password">{t("Password", "كلمة المرور")}</Label>
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
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">{t("Confirm Password", "تأكيد كلمة المرور")}</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="pe-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 end-0 flex items-center pe-3 text-muted-foreground hover:text-foreground"
              >
                {showConfirmPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>
          <button type="submit" className="w-full mt-2 rounded-xl bg-gold py-3 font-button text-sm font-semibold uppercase tracking-wide text-foreground transition-colors hover:bg-gold-soft">
            {t("Create Account", "إنشاء الحساب")}
          </button>
          
          <p className="mt-4 text-center text-sm text-muted-foreground">
            {t("Already have an account?", "لديك حساب بالفعل؟")}{" "}
            <Link to="/login" className="text-gold hover:underline">
              {t("Sign In", "تسجيل الدخول")}
            </Link>
          </p>
        </form>
      </section>
    </>
  );
}
