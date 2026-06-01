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
      <div
        className="pointer-events-none absolute -start-20 top-0 size-72 rounded-full bg-lawwin-gold/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -end-10 bottom-0 size-56 rounded-full bg-lawwin-gold/5 blur-2xl"
        aria-hidden
      />

      <PageContainer className="relative py-14 sm:py-16 lg:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="text-center lg:text-start">
            <p className="text-sm font-medium text-lawwin-gold">
              محاسبه‌گر مواعد حقوقی
            </p>
            <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-[2.5rem]">
              محاسبه دقیق مواعد قانونی بر اساس آیین دادرسی مدنی
            </h1>
            <p className="mt-4 text-pretty text-base leading-relaxed text-lawwin-muted-on-navy sm:text-lg">
              با تقویم شمسی، لحاظ تعطیلات رسمی و نمایش روند محاسبه — ابزاری
              راهنما برای وکلا و عموم؛ جایگزین مشاورهٔ تخصصی نیست.
            </p>

            <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <Link
                href="/deadline-calculator"
                className={cn(brandPrimaryButtonClassName, "px-6")}
              >
                شروع محاسبه
              </Link>
              <Link
                href="/articles"
                className={cn(brandOutlineButtonClassName, "px-6")}
              >
                مشاهده مقالات
              </Link>
            </div>
          </div>

          <HomeHeroIllustration />
        </div>
      </PageContainer>
    </section>
  );
}
