import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "درباره لاوین",
  description:
    "هدف لاوین، معرفی ابزار محاسبهٔ مواعد حقوقی و مسیر توسعهٔ آینده (نسخهٔ MVP).",
};

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">
      <header className="border-b border-zinc-200 pb-8">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
          درباره {siteConfig.siteName}
        </h1>
        <p className="mt-3 max-w-3xl text-pretty text-zinc-600 leading-7">
          {siteConfig.siteName} یک ابزار فارسی برای کمک به محاسبهٔ مواعد قانونی است
          تا کاربران (وکلا، کارآموزان و عموم افراد) بتوانند درک سریع‌تری از مهلت‌ها
          داشته باشند.
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <Link
            href="/deadline-calculator"
            className="inline-flex items-center justify-center rounded-xl bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white no-underline transition-colors hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
          >
            رفتن به محاسبه‌گر موعد
          </Link>
          <Link
            href="/contact"
            className="rounded-xl border border-zinc-300 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-800 no-underline transition-colors hover:bg-zinc-100"
          >
            تماس با ما
          </Link>
        </div>
      </header>

      <section className="mx-auto mt-8 max-w-3xl rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="text-base font-semibold text-zinc-900">
          محاسبه‌گر موعد چگونه کار می‌کند؟
        </h2>
        <p className="mt-3 text-sm leading-7 text-zinc-600">
          شما تاریخ شروع مهلت (مثلاً تاریخ ابلاغ) را به شمسی وارد می‌کنید و نوع
          موعد را انتخاب می‌کنید. سیستم بر اساس تعداد روز تعیین‌شده در قانون نمونه،
          تاریخ مهلت اولیه را محاسبه می‌کند و در صورت فعال بودن «لحاظ تعطیلات رسمی»،
          اگر روز آخر تعطیل باشد آن را به اولین روز غیرتعطیل منتقل می‌کند.
        </p>
      </section>

      <section className="mx-auto mt-6 max-w-3xl rounded-2xl border border-zinc-200 bg-zinc-50 p-6">
        <h2 className="text-base font-semibold text-zinc-900">سلب مسئولیت</h2>
        <p className="mt-3 text-sm leading-7 text-zinc-700">
          این ابزار صرفاً راهنماست و ممکن است به‌دلیل جزئیات پرونده، نوع ابلاغ،
          تغییرات قانونی یا کامل نبودن لیست تعطیلات، نتیجه دقیق نباشد. برای اقدام
          حقوقی، حتماً با وکیل یا مشاور حقوقی مشورت کنید.
        </p>
      </section>

      <section className="mx-auto mt-6 max-w-3xl rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="text-base font-semibold text-zinc-900">قابلیت‌های آینده</h2>
        <ul className="mt-3 list-inside list-disc space-y-2 text-sm leading-7 text-zinc-600">
          <li>افزودن انواع بیشتر موعد و قوانین دقیق‌تر</li>
          <li>تکمیل و به‌روزرسانی لیست تعطیلات به‌صورت سالانه</li>
          <li>صفحات محتوایی/مقالات بیشتر برای آموزش و اعتماد</li>
          <li>یادآور و مدیریت موعدها (در فازهای بعدی)</li>
        </ul>
      </section>
    </div>
  );
}

