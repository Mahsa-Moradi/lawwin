import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "محاسبه مواعد قانونی",
  description:
    "لاوین — محاسبه‌گر فارسی مواعد حقوقی با تقویم شمسی، آیین دادرسی مدنی، تعطیلات رسمی و نمایش روند محاسبه.",
};

export default function Home() {
  const steps = [
    "انتخاب نوع مهلت",
    "انتخاب تاریخ ابلاغ",
    "دریافت آخرین مهلت و روند محاسبه",
  ] as const;

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      <section className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-medium text-zinc-500">{siteConfig.siteName}</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
          محاسبه‌گر مواعد حقوقی
        </h1>
        <p className="mt-4 text-pretty text-base leading-7 text-zinc-600 sm:text-lg">
          ابزار فارسی برای محاسبهٔ مهلت‌های قانونی با{" "}
          <strong className="font-semibold text-zinc-800">تقویم شمسی</strong>،
          پشتیبانی از{" "}
          <strong className="font-semibold text-zinc-800">
            مواعد آیین دادرسی مدنی
          </strong>
          ، لحاظ{" "}
          <strong className="font-semibold text-zinc-800">تعطیلات رسمی</strong>{" "}
          و انتقال روز آخر اقدام در صورت تعطیل رسمی، پنج‌شنبه یا جمعه. نتیجه
          شامل{" "}
          <strong className="font-semibold text-zinc-800">روند محاسبه</strong>{" "}
          به‌صورت مرحله‌به‌مرحله است.
        </p>

        <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-7 text-amber-900">
          این ابزار دستیار محاسبهٔ حقوقی است و جایگزین مشاورهٔ تخصصی حقوقی
          نمی‌شود.
        </div>

        <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:justify-center">
          <Link
            href="/deadline-calculator"
            className="inline-flex items-center justify-center rounded-xl bg-zinc-900 px-6 py-3 text-base font-semibold text-white no-underline transition-colors hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
          >
            شروع محاسبه موعد
          </Link>
          <Link
            href="/articles"
            className="inline-flex items-center justify-center rounded-xl border border-zinc-300 bg-white px-6 py-3 text-base font-semibold text-zinc-800 no-underline transition-colors hover:bg-zinc-100"
          >
            مطالعه مقالات
          </Link>
        </div>
      </section>

      <section
        className="mx-auto mt-14 max-w-3xl"
        aria-labelledby="how-it-works-heading"
      >
        <h2
          id="how-it-works-heading"
          className="text-center text-lg font-semibold text-zinc-900"
        >
          چطور کار می‌کند؟
        </h2>
        <ol className="mt-6 space-y-4">
          {steps.map((step, index) => (
            <li
              key={step}
              className="flex items-start gap-4 rounded-xl border border-zinc-200 bg-white px-4 py-4 shadow-sm"
            >
              <span
                className="flex size-8 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-sm font-semibold text-white"
                aria-hidden
              >
                {index + 1}
              </span>
              <span className="pt-1 text-sm font-medium leading-relaxed text-zinc-800 sm:text-base">
                {step}
              </span>
            </li>
          ))}
        </ol>
      </section>

      <section
        className="mx-auto mt-14 max-w-3xl rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
        aria-labelledby="support-heading"
      >
        <h2
          id="support-heading"
          className="text-base font-semibold text-zinc-900"
        >
          پشتیبانی و مشاوره
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-600">
          برای پرسش یا هماهنگی مشاوره می‌توانید از راه‌های زیر استفاده کنید.
        </p>
        <ul className="mt-4 space-y-3 text-sm">
          <li className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <span className="font-medium text-zinc-800">تماس تلفنی</span>
            <a
              href={`tel:${siteConfig.phoneTel}`}
              className="font-medium text-zinc-900 underline-offset-2 hover:underline"
              dir="ltr"
            >
              {siteConfig.phoneDisplay}
            </a>
          </li>
          <li className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <span className="font-medium text-zinc-800">واتساپ</span>
            <a
              href={siteConfig.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-700 underline-offset-2 hover:text-zinc-900 hover:underline"
            >
              ارسال پیام در واتساپ
            </a>
          </li>
          <li className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <span className="font-medium text-zinc-800">تلگرام</span>
            <a
              href={siteConfig.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-700 underline-offset-2 hover:text-zinc-900 hover:underline"
            >
              ارسال پیام در تلگرام
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
}
