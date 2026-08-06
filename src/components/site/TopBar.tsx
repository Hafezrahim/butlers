import { useState } from "react";
import { Instagram, Facebook, Mail, Phone, LogIn, UserPlus } from "lucide-react";
import { toast } from "sonner";

export function TopBar() {
  const [lang, setLang] = useState<"EN" | "AR">("EN");

  const authSoon = () =>
    toast("Accounts coming soon", {
      description: "Sign in and sign up need a backend — enable Lovable Cloud to activate them.",
    });

  return (
    <div className="ink-panel hidden border-b border-white/10 md:block">
      <div className="container-site flex h-10 items-center justify-between gap-6 text-[0.72rem] text-white/65">
        <div className="flex min-w-0 items-center gap-5">
          <a href="tel:+201007419344" className="flex items-center gap-1.5 transition-colors hover:text-gold">
            <Phone className="size-3.5 shrink-0 text-gold" />
            <span className="truncate">+20 100 741 9344</span>
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
            {(["EN", "AR"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                className={`px-2.5 py-1 transition-colors ${
                  lang === l ? "bg-gold text-foreground" : "text-white/70 hover:text-gold"
                }`}
              >
                {l === "EN" ? "En" : "Ar"}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 font-button text-[0.65rem] font-semibold uppercase tracking-[0.1em]">
            <button onClick={authSoon} className="flex items-center gap-1.5 transition-colors hover:text-gold">
              <LogIn className="size-3.5" /> Sign In
            </button>
            <button onClick={authSoon} className="flex items-center gap-1.5 text-gold transition-colors hover:text-gold-soft">
              <UserPlus className="size-3.5" /> Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
