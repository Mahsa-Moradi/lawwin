import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-zinc-200/80 bg-zinc-50/80">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-md space-y-2 text-sm leading-relaxed text-zinc-600">
            <p className="font-medium text-zinc-800">سلب مسئولیت</p>
            <p>
              این وب‌سایت صرفاً ابزار راهنما است و جایگزین مشاورهٔ تخصصی حقوقی
              نیست. برای تصمیم‌گیری نهایی با وکیل مشورت کنید.
            </p>
          </div>
          <div className="text-sm text-zinc-600">
            <p className="font-medium text-zinc-800">لینک‌های مفید</p>
            <ul className="mt-2 space-y-1">
              <li>
                <Link
                  href="/deadline-calculator"
                  className="text-zinc-700 underline-offset-2 hover:text-zinc-900 hover:underline"
                >
                  محاسبه موعد
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-8 border-t border-zinc-200 pt-6 text-center text-xs text-zinc-500">
          © {year} لاوین. تمامی حقوق محفوظ است.
        </p>
      </div>
    </footer>
  );
}
