import { Instagram, Facebook, Mail, Phone, LogIn, ShieldCheck } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useI18n } from "@/i18n";
import { useAuth } from "@/store/auth-store";

export function TopBar() {
  const { lang, setLang, t } = useI18n();
  const { isAuthenticated, login } = useAuth();

  return (
    <div className="ink-panel hidden border-b border-white/10 md:block">
      <div className="container-site flex h-10 items-center justify-between gap-6 text-[0.72rem] text-white/65">
        <div className="flex min-w-0 items-center gap-5">
          <a href="tel:+201007419344" className="flex items-center gap-1.5 transition-colors hover:text-gold">
            <Phone className="size-3.5 shrink-0 text-gold" />
            <span dir="ltr" className="truncate">+20 100 741 9344</span>
          </a>
          <a href="mailto:hello@butlersandco.com" className="flex items-center gap-1.5 transition-colors hover:text-gold">
            <Mail className="size-3.5 shrink-0 text-gold" />
            <span className="truncate">hello@butlersandco.com</span>
          </a>
        </div>

        <div className="flex shrink-0 items-center gap-4">
          <div className="flex items-center gap-2">
            <a href="#" aria-label="Instagram" className="transition-colors hover:text-gold">
              <Instagram className="size-3.5" />
            </a>
            <a href="#" aria-label="Facebook" className="transition-colors hover:text-gold">
              <Facebook className="size-3.5" />
            </a>
          </div>

          <div className="flex items-center overflow-hidden rounded-xl border border-white/15 font-button text-[0.65rem] font-semibold uppercase tracking-[0.1em]">
            {(["en", "ar"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                className={`px-2.5 py-1 transition-colors ${
                  lang === l ? "bg-gold text-foreground" : "text-white/70 hover:text-gold"
                }`}
              >
                {l === "en" ? "En" : "ع"}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 font-button text-[0.65rem] font-semibold uppercase tracking-[0.1em]">
            {isAuthenticated ? (
              <>
                <Link to="/account" className="flex items-center gap-1.5 transition-colors hover:text-gold">
                  <LogIn className="size-3.5" /> {t("My Account", "حسابي")}
                </Link>
                <Link to="/admin" className="flex items-center gap-1.5 text-gold transition-colors hover:text-gold-soft">
                  <ShieldCheck className="size-3.5" /> {t("Admin", "الإدارة")}
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" className="flex items-center gap-1.5 transition-colors hover:text-gold">
                  <LogIn className="size-3.5" /> {t("Sign In", "تسجيل الدخول")}
                </Link>
                <Link to="/register" className="flex items-center gap-1.5 text-gold transition-colors hover:text-gold-soft">
                  <ShieldCheck className="size-3.5" /> {t("Sign Up", "إنشاء حساب")}
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
