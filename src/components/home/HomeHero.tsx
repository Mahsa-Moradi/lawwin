import Link from "next/link";
import {
  brandOutlineButtonClassName,
  brandPrimaryButtonClassName,
} from "@/components/ui/brandButtonStyles";
import { cn } from "@/components/ui/cn";
import { HomeHeroIllustration } from "./HomeHeroIllustration";
import { PageContainer } from "./homeLayout";

export function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-lawwin-navy-deepest text-lawwin-on-navy">
      {/* لایه‌های پس‌زمینه */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(212,175,55,0.18),transparent)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_100%_50%,rgba(20,33,61,0.9),transparent)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(248,249,250,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(248,249,250,0.8) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -start-24 top-8 size-80 rounded-full bg-lawwin-gold/15 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -end-16 bottom-0 size-64 rounded-full bg-lawwin-gold/10 blur-3xl"
        aria-hidden
      />

      <PageContainer className="relative py-16 sm:py-20 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="text-center lg:text-start">
            <p className="inline-flex items-center rounded-full border border-lawwin-gold/30 bg-lawwin-gold/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-lawwin-gold sm:text-sm">
              محاسبه‌گر مواعد حقوقی
            </p>
            <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
              محاسبه دقیق مواعد قانونی{" "}
              <span className="text-lawwin-gold">بر اساس آیین دادرسی مدنی</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-lawwin-muted-on-navy sm:text-lg lg:mx-0">
              با تقویم شمسی، لحاظ تعطیلات رسمی و نمایش روند محاسبه — ابزاری
              راهنما برای وکلا و عموم؛ جایگزین مشاورهٔ تخصصی نیست.
            </p>

            <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <Link
                href="/deadline-calculator"
                className={cn(
                  brandPrimaryButtonClassName,
                  "px-8 shadow-lg shadow-lawwin-gold/20",
                )}
              >
                شروع محاسبه
              </Link>
              <Link
                href="/articles"
                className={cn(brandOutlineButtonClassName, "px-8")}
              >
                مشاهده مقالات
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            <div
              className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-lawwin-gold/20 blur-2xl"
              aria-hidden
            />
            <div className="relative rounded-[1.75rem] bg-gradient-to-b from-white/10 to-white/5 p-1 shadow-2xl shadow-black/40 ring-1 ring-white/15">
              <div className="overflow-hidden rounded-[1.5rem] bg-lawwin-navy/80 ring-1 ring-lawwin-gold/25">
                <HomeHeroIllustration />
              </div>
            </div>
          </div>
        </div>
      </PageContainer>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-lawwin-gold/40 to-transparent"
        aria-hidden
      />
    </section>
  );
}
