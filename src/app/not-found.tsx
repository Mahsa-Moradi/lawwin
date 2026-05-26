import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-3xl rounded-2xl border border-zinc-200 bg-white p-8 text-center shadow-sm">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
          صفحه پیدا نشد
        </h1>
        <p className="mt-4 text-pretty text-sm leading-7 text-zinc-600 sm:text-base">
          آدرس واردشده وجود ندارد یا ممکن است به‌زودی اضافه شود.
        </p>
        <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl border border-zinc-300 bg-white px-6 py-3 text-base font-semibold text-zinc-800 no-underline transition-colors hover:bg-zinc-100"
          >
            بازگشت به خانه
          </Link>
          <Link
            href="/deadline-calculator"
            className="inline-flex items-center justify-center rounded-xl bg-zinc-900 px-6 py-3 text-base font-semibold text-white no-underline transition-colors hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
          >
            رفتن به محاسبه‌گر موعد
          </Link>
        </div>
      </div>
    </div>
  );
}

