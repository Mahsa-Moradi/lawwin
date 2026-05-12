import type { Metadata } from "next";
import Link from "next/link";
import { DeadlineForm } from "@/components/deadline/DeadlineForm";

export const metadata: Metadata = {
  title: "محاسبه موعد قانونی",
  description:
    "محاسبهٔ مهلت بر اساس تاریخ شروع، نوع موعد و تعطیلات رسمی (نسخهٔ راهنما).",
};

const faqs = [
  {
    q: "مهلت تجدیدنظر چند روز است؟",
    a: "مهلت تجدیدنظرخواهی بسته به نوع رأی و مرجع رسیدگی متفاوت است. در این نسخه، عددها به‌صورت نمونه و آموزشی ثبت شده‌اند و باید با متن دقیق رأی/ابلاغیه و نظر وکیل بررسی شوند.",
  },
  {
    q: "اگر روز آخر مهلت تعطیل باشد چه می‌شود؟",
    a: "در بسیاری از موارد، اگر روز آخر مهلت با تعطیل رسمی مصادف شود، آخرین روز اقدام به اولین روز کاری بعد منتقل می‌شود. این ابزار در حالت «لحاظ تعطیلات رسمی» همین منطق را روی لیست تعطیلات ثبت‌شده اعمال می‌کند.",
  },
  {
    q: "آیا این محاسبه قطعی است؟",
    a: "خیر. این محاسبه راهنماست و ممکن است به‌دلیل جزئیات پرونده، نوع ابلاغ، تغییرات قانونی یا نقص لیست تعطیلات دقیق نباشد. همیشه قبل از اقدام، با وکیل مشورت کنید.",
  },
  {
    q: "تاریخ ابلاغ از چه روزی محاسبه می‌شود؟",
    a: "این موضوع به نوع ابلاغ و مقررات مربوط بستگی دارد. در این نسخه، شما «تاریخ شروع مهلت» را خودتان وارد می‌کنید و سیستم بر اساس همان تاریخ محاسبه می‌کند.",
  },
] as const;

export default function DeadlineCalculatorPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <header className="border-b border-zinc-200 pb-8">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
          محاسبه موعد قانونی
        </h1>
        <p className="mt-3 max-w-2xl text-pretty text-zinc-600 leading-relaxed">
          تاریخ شروع مهلت را به شمسی وارد کنید، نوع موعد را انتخاب کنید و در صورت
          نیاز تعطیلات رسمی را در نظر بگیرید. خروجی شامل مهلت اولیه، مهلت نهایی و
          توضیح متنی است. این ابزار صرفاً راهنماست و جایگزین مشاورهٔ حقوقی نیست.
        </p>
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

      <DeadlineForm />

      <section className="mt-10 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
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
