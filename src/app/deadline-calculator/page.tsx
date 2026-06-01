import type { Metadata } from "next";
import { DeadlineCalculatorTrustSection } from "@/components/deadline/DeadlineCalculatorTrustSection";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DeadlineFormClient } from "./DeadlineFormClient";

export const metadata: Metadata = {
  title: "محاسبه موعد قانونی",
  description:
    "محاسبهٔ مهلت بر اساس تاریخ شروع، نوع موعد و تعطیلات رسمی (نسخه آزمایشی/راهنما).",
};

const faqs = [
  {
    q: "مهلت تجدیدنظر چند روز است؟",
    a: "مهلت تجدیدنظرخواهی بسته به نوع رأی و مرجع رسیدگی متفاوت است. در این نسخه، عددها به‌صورت نمونه و آموزشی ثبت شده‌اند و باید با متن دقیق رأی/ابلاغیه و نظر وکیل بررسی شوند.",
  },
  {
    q: "اگر روز آخر مهلت تعطیل باشد چه می‌شود؟",
    a: "در آیین دادرسی مدنی، اگر روز آخر اقدام تعطیل رسمی، پنجشنبه یا جمعه باشد، به اولین روز کاری بعد منتقل می‌شود. تعطیلات در میانهٔ مهلت عادی شمرده می‌شوند.",
  },
  {
    q: "آیا این محاسبه قطعی است؟",
    a: "خیر. این محاسبه راهنماست و ممکن است به‌دلیل جزئیات پرونده، نوع ابلاغ، تغییرات قانونی یا نقص لیست تعطیلات دقیق نباشد. همیشه قبل از اقدام، با وکیل مشورت کنید.",
  },
  {
    q: "تاریخ ابلاغ از چه روزی محاسبه می‌شود؟",
    a: "در دستهٔ آیین دادرسی مدنی، روز ابلاغ شمرده نمی‌شود و شمارش از روز تقویمی بعد آغاز می‌شود. تاریخ ابلاغ را خودتان وارد می‌کنید.",
  },
] as const;

export default function DeadlineCalculatorPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
      <header className="border-b border-zinc-200/80 pb-10">
        <p className="inline-flex items-center rounded-full border border-lawwin-gold/35 bg-lawwin-gold/10 px-3.5 py-1 text-xs font-semibold text-lawwin-navy-deepest">
          محاسبه‌گر مواعد
        </p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-lawwin-navy-deepest sm:text-4xl">
          محاسبه موعد قانونی
        </h1>
        <p className="mt-4 max-w-3xl text-pretty text-base leading-relaxed text-zinc-600 sm:text-lg">
          دستهٔ قانون (مثلاً آیین دادرسی مدنی)، تاریخ ابلاغ و نوع مهلت را انتخاب
          کنید. خروجی شامل مدت، اولین روز مهلت، آخرین مهلت و روند محاسبه است.
          این نسخه برای تست عمومی است و صرفاً راهنماست.
        </p>
        <div
          className="mt-6 rounded-xl border border-lawwin-gold/35 bg-gradient-to-l from-lawwin-navy-deepest/[0.06] to-lawwin-gold/[0.08] px-4 py-4 text-sm leading-7 text-zinc-800 sm:px-5"
          role="note"
        >
          <span className="font-semibold text-lawwin-navy-deepest">
            سلب مسئولیت:
          </span>{" "}
          نتیجهٔ این ابزار ممکن است به‌دلیل جزئیات پرونده، نوع ابلاغ، تغییرات
          قانونی یا کامل نبودن لیست تعطیلات دقیق نباشد. قبل از اقدام حتماً با
          وکیل مشورت کنید.
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <ButtonLink href="/articles" variant="secondary">
            مقالات و نکات
          </ButtonLink>
          <span className="text-xs text-zinc-500">
            این پروژه در حال توسعه است و محتوا فعلاً نمونه است.
          </span>
        </div>
      </header>

      <DeadlineFormClient />

      <DeadlineCalculatorTrustSection />

      <section
        id="faq"
        className="mx-auto mt-12 max-w-3xl scroll-mt-24 rounded-2xl border border-zinc-200/90 bg-white p-6 shadow-sm shadow-zinc-900/5 sm:p-8 lg:max-w-none"
      >
        <SectionHeading>سوالات پرتکرار</SectionHeading>
        <div className="mt-6 space-y-3">
          {faqs.map((item) => (
            <details
              key={item.q}
              className="group rounded-xl border border-zinc-200/90 bg-zinc-50/50 px-4 py-3.5 transition-colors open:border-lawwin-gold/30 open:bg-white open:shadow-sm"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold text-zinc-900 [&::-webkit-details-marker]:hidden">
                <span>{item.q}</span>
                <span
                  className="flex size-7 shrink-0 items-center justify-center rounded-lg border border-zinc-200 bg-white text-lawwin-gold transition-transform group-open:rotate-45"
                  aria-hidden
                >
                  +
                </span>
              </summary>
              <p className="mt-3 border-t border-zinc-100 pt-3 text-sm leading-relaxed text-zinc-600">
                {item.a}
              </p>
            </details>
          ))}
        </div>
        <p className="mt-6 text-xs leading-relaxed text-zinc-500">
          یادآوری: این ابزار جایگزین مشاورهٔ حقوقی نیست و ممکن است با توجه به شرایط
          پرونده و جزئیات ابلاغ، نتیجه متفاوت باشد.
        </p>
      </section>
    </div>
  );
}
