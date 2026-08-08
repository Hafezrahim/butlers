import { useEffect, useState } from "react";
import { useI18n } from "@/i18n";

export function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useI18n();

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsVisible(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  if (!isVisible) return null;

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setDeferredPrompt(null);
      setIsVisible(false);
    }
  };

  return (
    <div className="fixed bottom-4 left-4 z-[999] flex max-w-[320px] items-center gap-3 rounded-2xl border border-border bg-card p-3 shadow-2xl">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gold/10">
        <img src="/web-app-manifest-192x192.png" alt="Butlers Logo" className="size-6 object-contain" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-display text-sm font-semibold leading-tight text-foreground truncate">
          {t("Install App", "تثبيت التطبيق")}
        </p>
        <p className="text-[0.65rem] text-muted-foreground truncate">
          {t("Add to home screen", "أضف للشاشة الرئيسية")}
        </p>
      </div>
      <div className="flex items-center gap-1.5 shrink-0">
        <button
          onClick={handleInstall}
          className="rounded-lg bg-gold px-2.5 py-1.5 text-[0.65rem] font-semibold uppercase tracking-wider text-foreground transition-colors hover:bg-gold-soft"
        >
          {t("Install", "تثبيت")}
        </button>
        <button
          onClick={() => setIsVisible(false)}
          className="rounded-lg border border-border bg-background px-2 py-1.5 text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:bg-muted"
        >
          {t("Skip", "تخطي")}
        </button>
      </div>
    </div>
  );
}
