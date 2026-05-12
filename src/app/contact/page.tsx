import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "تماس با ما",
  description:
    "راه‌های ارتباطی و فرم تماس (در حال حاضر فقط رابط کاربری و بدون ارسال).",
};

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">
      <header className="border-b border-zinc-200 pb-8">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
          تماس با ما
        </h1>
        <p className="mt-3 max-w-3xl text-pretty text-zinc-600 leading-7">
          برای مشاوره و پیگیری، می‌توانید از راه‌های زیر اقدام کنید. فرم تماس در
          این نسخه صرفاً برای نمایش است و ارسال پیام هنوز فعال نشده است.
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <Link
            href="/deadline-calculator"
            className="inline-flex items-center justify-center rounded-xl bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white no-underline transition-colors hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
          >
            رفتن به محاسبه‌گر موعد
          </Link>
          <Link
            href="/about"
            className="rounded-xl border border-zinc-300 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-800 no-underline transition-colors hover:bg-zinc-100"
          >
            درباره لاوین
          </Link>
        </div>
      </header>

      <section className="mx-auto mt-8 grid max-w-3xl gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-base font-semibold text-zinc-900">تلفن</h2>
          <p className="mt-2 text-sm text-zinc-600">
            برای تماس مستقیم:
            <span className="mx-2 text-zinc-300">|</span>
            <a
              href={`tel:${siteConfig.phoneTel}`}
              className="font-medium text-zinc-900 underline-offset-2 hover:underline"
            >
              {siteConfig.phoneDisplay}
            </a>
          </p>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-base font-semibold text-zinc-900">ایمیل</h2>
          <p className="mt-2 text-sm text-zinc-600">
            آدرس ایمیل (نمونه):{" "}
            <span className="font-mono text-zinc-900" dir="ltr">
              example@lawwin.ir
            </span>
          </p>
        </div>
      </section>

      <section className="mx-auto mt-8 max-w-3xl rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="text-base font-semibold text-zinc-900">فرم تماس</h2>
        <p className="mt-2 text-sm text-zinc-600">
          ارسال فرم در این نسخه فعال نیست. این بخش فقط برای تکمیل ساختار MVP است.
        </p>

        <form className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-800" htmlFor="name">
              نام و نام خانوادگی
            </label>
            <input
              id="name"
              type="text"
              placeholder="مثلاً: علی رضایی"
              className="mt-2 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-800" htmlFor="phone">
              شماره تماس
            </label>
            <input
              id="phone"
              type="text"
              placeholder="مثلاً: 0912xxxxxxx"
              className="mt-2 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10"
              dir="ltr"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-800" htmlFor="message">
              پیام
            </label>
            <textarea
              id="message"
              rows={5}
              placeholder="متن پیام شما…"
              className="mt-2 w-full resize-y rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10"
            />
          </div>
          <button
            type="button"
            className="cursor-not-allowed rounded-xl bg-zinc-300 px-6 py-2.5 text-sm font-semibold text-zinc-600"
            aria-disabled
            title="در این نسخه فعال نیست"
          >
            ارسال پیام (غیرفعال)
          </button>
        </form>
      </section>

      <section className="mx-auto mt-8 max-w-3xl rounded-2xl border border-zinc-200 bg-zinc-50 p-6">
        <h2 className="text-base font-semibold text-zinc-900">سلب مسئولیت</h2>
        <p className="mt-2 text-sm leading-7 text-zinc-700">
          اطلاعات و ابزارهای این وب‌سایت صرفاً راهنما هستند و جایگزین مشاورهٔ حقوقی
          تخصصی نیستند. مسئولیت استفاده از نتایج بر عهدهٔ کاربر است.
        </p>
      </section>
    </div>
  );
}

