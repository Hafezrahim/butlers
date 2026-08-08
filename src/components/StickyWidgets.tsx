import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { useI18n } from "@/i18n";

export function StickyWidgets() {
  const { t, isAr } = useI18n();
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className={`fixed bottom-6 ${isAr ? "left-6" : "right-6"} z-50 flex flex-col gap-3 items-end`}>
      {/* Chat Window */}
      {chatOpen && (
        <div className={`absolute bottom-[calc(100%+1rem)] ${isAr ? "left-0 origin-bottom-left" : "right-0 origin-bottom-right"} z-50 flex w-[300px] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl animate-in fade-in zoom-in-95 duration-200`}>
          <div className="flex items-center justify-between bg-gold p-4 text-primary-foreground">
            <div className="flex items-center gap-2">
              <MessageCircle className="size-5" />
              <h3 className="font-semibold text-sm">Butlers Support</h3>
            </div>
            <button onClick={() => setChatOpen(false)} className="rounded-full hover:bg-black/10 p-1.5 transition-colors">
              <X className="size-4" />
            </button>
          </div>
          <div className="flex flex-col gap-3 p-4 bg-muted/30 min-h-[220px]">
            <div className={`rounded-xl ${isAr ? "rounded-tr-sm" : "rounded-tl-sm"} bg-card p-3.5 text-[0.8rem] text-foreground border border-border leading-relaxed shadow-sm`}>
              {isAr ? (
                <>
                  أهلاً بك ضيفنا العزيز، نظام الدردشة المباشرة سيكون متاحاً قريباً جداً، للحصول على معلومات فورية يرجى التواصل معنا عبر{" "}
                  <a href="https://wa.me/201007419344" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#25D366] hover:underline">
                    واتساب
                  </a>
                  .
                </>
              ) : (
                <>
                  Welcome dear guest, our live chatting system will be live very soon. For instant info contact us via{" "}
                  <a href="https://wa.me/201007419344" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#25D366] hover:underline">
                    WhatsApp
                  </a>
                  .
                </>
              )}
            </div>
          </div>
          <div className="border-t border-border bg-card p-3">
            <input
              type="text"
              disabled
              placeholder={t("Type a message...", "اكتب رسالة...")}
              className="w-full rounded-xl border border-border bg-muted/50 px-4 py-2.5 text-sm outline-none opacity-60 cursor-not-allowed"
            />
          </div>
        </div>
      )}

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/201007419344"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="group relative flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-transform hover:-translate-y-1 hover:shadow-xl"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          fill="currentColor"
          className="size-7"
        >
          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157.1zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
        </svg>
        <span className={`absolute ${isAr ? "left-full ml-3" : "right-full mr-3"} top-1/2 -translate-y-1/2 scale-95 whitespace-nowrap rounded-lg bg-card px-3 py-1.5 text-xs font-semibold text-foreground opacity-0 shadow-md transition-all group-hover:scale-100 group-hover:opacity-100 pointer-events-none border border-border`}>
          {t("Chat on WhatsApp", "تحدث عبر واتساب")}
        </span>
      </a>

      {/* Chatbot Button */}
      <button
        onClick={() => setChatOpen(!chatOpen)}
        aria-label="Chat Support"
        className="group relative flex size-14 items-center justify-center rounded-full bg-gold text-white shadow-lg shadow-black/20 transition-transform hover:-translate-y-1 hover:shadow-xl"
      >
        {chatOpen ? <X className="size-7" /> : <MessageCircle className="size-7" />}
        <span className={`absolute ${isAr ? "left-full ml-3" : "right-full mr-3"} top-1/2 -translate-y-1/2 scale-95 whitespace-nowrap rounded-lg bg-card px-3 py-1.5 text-xs font-semibold text-foreground opacity-0 shadow-md transition-all ${chatOpen ? "" : "group-hover:scale-100 group-hover:opacity-100"} pointer-events-none border border-border`}>
          {t("Open Chat Support", "فتح دعم الدردشة")}
        </span>
      </button>
    </div>
  );
}
