import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Lang = "en" | "ar";

type I18nValue = {
  lang: Lang;
  dir: "ltr" | "rtl";
  isAr: boolean;
  setLang: (l: Lang) => void;
  /** Pick the right string: t("English", "عربي") */
  t: (en: string, ar: string) => string;
};

const I18nContext = createContext<I18nValue | null>(null);

const STORAGE_KEY = "bco-lang";

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
    if (stored === "ar" || stored === "en") setLangState(stored);
  }, []);

  useEffect(() => {
    const dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("dir", dir);
    if (typeof window !== "undefined") window.localStorage.setItem(STORAGE_KEY, lang);
  }, [lang]);

  const setLang = useCallback((l: Lang) => setLangState(l), []);

  const value = useMemo<I18nValue>(
    () => ({
      lang,
      dir: lang === "ar" ? "rtl" : "ltr",
      isAr: lang === "ar",
      setLang,
      t: (en: string, ar: string) => (lang === "ar" ? ar : en),
    }),
    [lang, setLang],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    return { lang: "en", dir: "ltr", isAr: false, setLang: () => {}, t: (en) => en };
  }
  return ctx;
}
