import Link from "next/link";
import { brandPrimaryButtonClassName } from "@/components/ui/brandButtonStyles";
import { cn } from "@/components/ui/cn";
import { PageContainer } from "./aboutLayout";
import { CalculatorCtaIcon } from "./aboutIcons";

export function AboutCta() {
  return (
    <section className="relative overflow-hidden bg-lawwin-navy-deepest py-14 text-lawwin-on-navy sm:py-16">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_100%,rgba(212,175,55,0.15),transparent)]"
        aria-hidden
      />
      <PageContainer className="relative">
        <div className="flex flex-col items-center gap-8 rounded-2xl border border-white/10 bg-lawwin-navy/60 p-6 shadow-2xl shadow-black/40 sm:flex-row sm:justify-between sm:p-8 lg:p-10">
          <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:text-start">
            <span className="flex size-16 shrink-0 items-center justify-center rounded-2xl border border-lawwin-gold/35 bg-lawwin-gold/10 text-lawwin-gold shadow-lg shadow-lawwin-gold/10">
              <CalculatorCtaIcon className="size-9" />
            </span>
            <div>
              <h2 className="text-xl font-bold text-lawwin-on-navy sm:text-2xl">
                همین حالا موعد قانونی خود را محاسبه کنید
              </h2>
              <p className="mt-2 text-sm text-lawwin-muted-on-navy sm:text-base">
                تاریخ ابلاغ و نوع مهلت را وارد کنید و نتیجه را در چند ثانیه ببینید.
              </p>
            </div>
          </div>
          <Link
            href="/deadline-calculator"
            className={cn(
              brandPrimaryButtonClassName,
              "shrink-0 px-8 shadow-lg shadow-lawwin-gold/20",
            )}
          >
            شروع محاسبه
          </Link>
        </div>
      </PageContainer>
    </section>
  );
}
