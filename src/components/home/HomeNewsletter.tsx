"use client";

import { brandPrimaryButtonClassName } from "@/components/ui/brandButtonStyles";
import { cn } from "@/components/ui/cn";
import { ScalesFeatureIcon } from "./homeIcons";
import { SectionDark } from "./homeLayout";

export function HomeNewsletter() {
  return (
    <SectionDark className="relative overflow-hidden">
      <ScalesFeatureIcon
        className="pointer-events-none absolute -start-8 top-1/2 size-48 -translate-y-1/2 text-lawwin-gold/10"
        aria-hidden
      />
      <div className="relative mx-auto max-w-xl text-center">
        <h2 className="text-lg font-semibold text-lawwin-on-navy sm:text-xl">
          از به‌روزرسانی‌ها باخبر شوید
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-lawwin-muted-on-navy">
          ایمیل خود را وارد کنید تا از مقالات و به‌روزرسانی‌های آینده مطلع
          شوید. (فعلاً فقط نمایشی — بدون ارسال)
        </p>
        <form
          className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-stretch"
          onSubmit={(e) => e.preventDefault()}
          noValidate
        >
          <label htmlFor="home-newsletter-email" className="sr-only">
            ایمیل
          </label>
          <input
            id="home-newsletter-email"
            type="email"
            name="email"
            placeholder="example@email.com"
            dir="ltr"
            autoComplete="email"
            className="min-h-11 flex-1 rounded-xl border border-white/20 bg-white px-4 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-lawwin-gold focus:ring-2 focus:ring-lawwin-gold/30"
          />
          <button
            type="button"
            className={cn(brandPrimaryButtonClassName, "shrink-0 px-6")}
            title="عضویت در این نسخه فعال نیست"
          >
            عضویت
          </button>
        </form>
        <p className="mt-3 text-xs text-lawwin-muted-on-navy">
          ارسال ایمیل در این نسخه پیاده‌سازی نشده است.
        </p>
      </div>
    </SectionDark>
  );
}
