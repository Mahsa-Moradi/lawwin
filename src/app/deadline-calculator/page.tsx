import type { Metadata } from "next";
import Link from "next/link";
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
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <header className="border-b border-zinc-200 pb-8">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
          محاسبه موعد قانونی
        </h1>
        <p className="mt-3 max-w-3xl text-pretty text-zinc-600 leading-7">
          دستهٔ قانون (مثلاً آیین دادرسی مدنی)، تاریخ ابلاغ و نوع مهلت را انتخاب
          کنید. خروجی شامل مدت، اولین روز مهلت، آخرین مهلت و روند محاسبه است.
          این نسخه برای تست عمومی است و صرفاً راهنماست.
        </p>
        <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-7 text-amber-900">
          <span className="font-semibold">سلب مسئولیت:</span> نتیجهٔ این ابزار ممکن
          است به‌دلیل جزئیات پرونده، نوع ابلاغ، تغییرات قانونی یا کامل نبودن لیست
          تعطیلات دقیق نباشد. قبل از اقدام حتماً با وکیل مشورت کنید.
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <Link
            href="/articles"
            className="rounded-xl border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-zinc-800 no-underline transition-colors hover:bg-zinc-100"
          >
            مقالات و نکات
          </Link>
          <span className="text-xs text-zinc-500">
            این پروژه در حال توسعه است و محتوا فعلاً نمونه است.
          </span>
        </div>
      </header>

      <DeadlineFormClient />

      <section className="mx-auto mt-10 max-w-3xl rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm lg:max-w-none">
        <h2 className="text-lg font-semibold text-zinc-900">
          سوالات پرتکرار
        </h2>
        <div className="mt-5 space-y-4">
          {faqs.map((item) => (
            <details
              key={item.q}
              className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3"
            >
              <summary className="cursor-pointer select-none text-sm font-semibold text-zinc-900">
                {item.q}
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-zinc-700">
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
