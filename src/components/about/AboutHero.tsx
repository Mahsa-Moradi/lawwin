import { HomeHeroIllustration } from "@/components/home/HomeHeroIllustration";
import { PageContainer } from "./aboutLayout";

export function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-lawwin-navy-deepest text-lawwin-on-navy">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(212,175,55,0.16),transparent)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -start-20 top-8 size-72 rounded-full bg-lawwin-gold/10 blur-3xl"
        aria-hidden
      />

      <PageContainer className="relative py-14 sm:py-16 lg:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="text-center lg:text-start">
            <p className="inline-flex items-center rounded-full border border-lawwin-gold/35 bg-lawwin-gold/10 px-3.5 py-1 text-xs font-semibold text-lawwin-gold">
              درباره لاوین
            </p>
            <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-[2.5rem]">
              درباره{" "}
              <span className="text-lawwin-gold">لاوین</span>
            </h1>
            <p className="mt-3 text-lg font-medium text-lawwin-on-navy/95 sm:text-xl">
              ابزار هوشمند محاسبه مواعد قانونی
            </p>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-sm leading-relaxed text-lawwin-muted-on-navy sm:text-base lg:mx-0">
              لاوین ابزاری فارسی و راهنما برای محاسبهٔ مواعد حقوقی بر اساس آیین
              دادرسی مدنی است؛ با تقویم شمسی، لحاظ تعطیلات رسمی و نمایش شفاف
              روند محاسبه — برای وکلا، کارآموزان و عموم کاربران.
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div
              className="pointer-events-none absolute -inset-3 rounded-[1.75rem] bg-lawwin-gold/15 blur-2xl"
              aria-hidden
            />
            <div className="relative rounded-[1.5rem] bg-gradient-to-b from-white/10 to-white/5 p-1 shadow-2xl shadow-black/40 ring-1 ring-white/15">
              <div className="overflow-hidden rounded-[1.25rem] bg-lawwin-navy/80 ring-1 ring-lawwin-gold/25">
                <HomeHeroIllustration />
              </div>
            </div>
          </div>
        </div>
      </PageContainer>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-lawwin-gold/35 to-transparent"
        aria-hidden
      />
    </section>
  );
}
