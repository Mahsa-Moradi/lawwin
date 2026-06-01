const dataSources = [
  "آیین دادرسی مدنی",
  "مواعد قانونی وارد شده در سیستم",
  "تعطیلات رسمی ثبت‌شده",
] as const;

const limitations = [
  "ممکن است قوانین تغییر کنند",
  "برخی مواعد نیازمند تفسیر حقوقی باشند",
  "شرایط خاص پرونده ممکن است نتیجه را تغییر دهد",
  "ابزار جایگزین مشاوره حقوقی نیست",
] as const;

const trustBadges = [
  "محاسبه بر اساس قواعد ثبت‌شده",
  "پشتیبانی از تقویم شمسی",
  "لحاظ تعطیلات رسمی",
] as const;

function CheckIcon() {
  return (
    <span
      className="flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-800"
      aria-hidden
    >
      ✓
    </span>
  );
}

export function DeadlineCalculatorTrustSection() {
  return (
    <section
      className="mt-10 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8"
      aria-labelledby="trust-sources-heading"
    >
      <h2
        id="trust-sources-heading"
        className="text-lg font-semibold text-zinc-900"
      >
        منابع و اعتبار محاسبه
      </h2>

      <div className="mt-6 space-y-8">
        <div>
          <h3 className="text-sm font-semibold text-zinc-800">
            این محاسبه‌گر بر چه اساسی است؟
          </h3>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-zinc-700">
            {dataSources.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span
                  className="mt-2 size-1.5 shrink-0 rounded-full bg-zinc-400"
                  aria-hidden
                />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-zinc-800">دامنهٔ ابزار</h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-700">
            این ابزار برای کمک به محاسبه مواعد قانونی طراحی شده است.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-zinc-800">محدودیت‌ها</h3>
          <ul className="mt-3 list-inside list-disc space-y-1.5 text-sm leading-relaxed text-zinc-700">
            {limitations.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-sky-200 bg-sky-50 px-4 py-4 sm:px-5">
          <p className="text-xs font-medium text-sky-900/80">
            آخرین بروزرسانی داده‌ها
          </p>
          <p className="mt-1 text-base font-semibold text-sky-950">
            سال ۱۴۰۵
          </p>
        </div>

        <div>
          <p className="sr-only">نشان‌های اعتماد</p>
          <ul className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            {trustBadges.map((badge) => (
              <li key={badge}>
                <span className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-2 text-xs font-medium text-zinc-800">
                  <CheckIcon />
                  {badge}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
