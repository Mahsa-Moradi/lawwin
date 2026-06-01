import { SectionHeading } from "@/components/ui/SectionHeading";
import { TrustBadge } from "@/components/ui/Badge";
import { calculatorPremiumPanelClassName } from "./calculatorStyles";

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

export function DeadlineCalculatorTrustSection() {
  return (
    <section
      className={`mt-10 p-6 sm:p-8 ${calculatorPremiumPanelClassName}`}
      aria-labelledby="trust-sources-heading"
    >
      <SectionHeading id="trust-sources-heading" className="text-lawwin-on-navy">
        منابع و اعتبار محاسبه
      </SectionHeading>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="space-y-8">
          <div>
            <h3 className="text-sm font-semibold text-lawwin-gold">
              این محاسبه‌گر بر چه اساسی است؟
            </h3>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-lawwin-muted-on-navy">
              {dataSources.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-lawwin-gold"
                    aria-hidden
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-lawwin-gold">دامنهٔ ابزار</h3>
            <p className="mt-2 text-sm leading-relaxed text-lawwin-muted-on-navy">
              این ابزار برای کمک به محاسبه مواعد قانونی طراحی شده است.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-lawwin-gold">محدودیت‌ها</h3>
            <ul className="mt-3 list-inside list-disc space-y-1.5 text-sm leading-relaxed text-lawwin-muted-on-navy">
              {limitations.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="rounded-xl border border-lawwin-gold/35 bg-lawwin-gold/10 px-4 py-4 sm:px-5">
            <p className="text-xs font-medium text-lawwin-gold/80">
              آخرین بروزرسانی داده‌ها
            </p>
            <p className="mt-1 text-base font-semibold text-lawwin-on-navy">
              سال ۱۴۰۵
            </p>
          </div>

          <div>
            <p className="sr-only">نشان‌های اعتماد</p>
            <ul className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              {trustBadges.map((badge) => (
                <li key={badge}>
                  <TrustBadge>{badge}</TrustBadge>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
