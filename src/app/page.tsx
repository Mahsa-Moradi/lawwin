import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      <section className="mx-auto max-w-3xl text-center">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
          ابزار محاسبه مواعد حقوقی
        </h1>
        <p className="mt-4 text-pretty text-base leading-7 text-zinc-600 sm:text-lg">
          تاریخ ابلاغ یا شروع مهلت را وارد کنید، نوع موعد را انتخاب کنید و با در نظر
          گرفتن تعطیلات رسمی، تاریخ نهایی اقدام را ببینید. این نسخهٔ اولیهٔ رابط
          کاربری است؛ منطق محاسبه به‌زودی اضافه می‌شود.
        </p>
        <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:justify-center">
          <Link
            href="/deadline-calculator"
            className="inline-flex items-center justify-center rounded-xl bg-zinc-900 px-6 py-3 text-base font-semibold text-white no-underline transition-colors hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
          >
            رفتن به محاسبه‌گر موعد
          </Link>
          <Link
            href="/articles"
            className="inline-flex items-center justify-center rounded-xl border border-zinc-300 bg-white px-6 py-3 text-base font-semibold text-zinc-800 no-underline transition-colors hover:bg-zinc-100"
          >
            مقالات و نکات
          </Link>
        </div>
      </section>
    </div>
  );
}
