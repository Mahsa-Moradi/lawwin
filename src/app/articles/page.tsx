import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "مقالات",
  description:
    "مقالات و نکات کاربردی دربارهٔ محاسبهٔ مواعد قانونی و اثر تعطیلات رسمی (نسخهٔ اولیه).",
};

const articles = [
  {
    id: "appeal-deadline",
    title: "مهلت تجدیدنظرخواهی چند روز است؟",
    excerpt:
      "آشنایی با مفهوم مهلت تجدیدنظرخواهی و نکات مهمی که باید قبل از اقدام در نظر بگیرید.",
  },
  {
    id: "how-to-calculate",
    title: "نحوه محاسبه مواعد قانونی",
    excerpt:
      "راهنمای ساده و مرحله‌به‌مرحله برای درک محاسبهٔ مهلت‌ها بر اساس تاریخ شروع و تعداد روز قانونی.",
  },
  {
    id: "holidays-effect",
    title: "اثر تعطیلات رسمی بر مهلت‌های قانونی",
    excerpt:
      "اگر روز آخر مهلت تعطیل باشد چه می‌شود؟ این مقاله به‌صورت کلی مفهوم انتقال به روز کاری را توضیح می‌دهد.",
  },
] as const;

export default function ArticlesPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">
      <header className="border-b border-zinc-200 pb-8">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
          مقالات
        </h1>
        <p className="mt-3 max-w-3xl text-pretty text-zinc-600 leading-7">
          این بخش فعلاً شامل کارت‌های نمونه برای ساختار محتواست. در نسخه‌های بعدی
          می‌توان برای هر مقاله صفحهٔ جداگانه ساخت.
        </p>
      </header>

      <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((a) => (
          <article
            key={a.id}
            className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
          >
            <h2 className="text-base font-semibold text-zinc-900">{a.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              {a.excerpt}
            </p>
            <div className="mt-4">
              <span className="inline-flex items-center rounded-lg bg-zinc-100 px-3 py-2 text-xs font-medium text-zinc-700">
                به‌زودی
              </span>
            </div>
          </article>
        ))}
      </section>

      <section className="mt-10 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="text-base font-semibold text-zinc-900">اعتماد و سلب مسئولیت</h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-600">
          مطالب این وب‌سایت برای اطلاع‌رسانی و راهنمایی عمومی است و جایگزین مشاورهٔ
          حقوقی تخصصی نیست. برای پرونده‌های واقعی، با وکیل یا مشاور حقوقی مشورت کنید.
        </p>
        <div className="mt-4">
          <Link
            href="/deadline-calculator"
            className="inline-flex items-center justify-center rounded-xl bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white no-underline transition-colors hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
          >
            رفتن به محاسبه‌گر موعد
          </Link>
        </div>
      </section>
    </div>
  );
}

