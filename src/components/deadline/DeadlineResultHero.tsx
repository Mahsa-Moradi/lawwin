import type { ReactNode } from "react";
import type { DeadlineCalculationResult } from "@/types/deadline";
import {
  formatJalaliSlash,
  getJalaliWeekdayName,
  toPersianDigits,
} from "@/lib/deadline/jalaliDisplay";
import {
  formatRemainingDaysMessage,
  remainingDaysPillClassName,
} from "@/lib/deadline/remainingDaysMessage";

type DeadlineResultHeroProps = {
  result: DeadlineCalculationResult;
  ruleTitle?: string;
  startDateLabel?: string;
};

function HeroDetailRow({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 text-start">
      <span
        className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-lawwin-gold/30 bg-lawwin-gold/10 text-lawwin-gold"
        aria-hidden
      >
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-xs text-lawwin-muted-on-navy">{label}</p>
        <p className="mt-0.5 text-sm font-semibold text-lawwin-on-navy">{value}</p>
      </div>
    </div>
  );
}

export function DeadlineResultHero({
  result,
  ruleTitle,
  startDateLabel = "تاریخ ابلاغ",
}: DeadlineResultHeroProps) {
  const finalJalali =
    result.finalActionDateJalali ?? result.finalDeadlineJalali;
  const dateDisplay = toPersianDigits(formatJalaliSlash(finalJalali));
  const weekday = getJalaliWeekdayName(finalJalali);
  const remainingMessage = formatRemainingDaysMessage(
    result.remainingDays,
    result.status,
  );
  const pillClass = remainingDaysPillClassName(result.status);
  const startDisplay = toPersianDigits(
    formatJalaliSlash(result.startDateJalali),
  );

  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-lawwin-gold/25 bg-lawwin-navy-deepest p-6 shadow-2xl shadow-black/40 ring-1 ring-lawwin-gold/20 sm:p-8 print:border-zinc-300 print:bg-white print:text-zinc-900 print:shadow-none"
      aria-labelledby="deadline-hero-label"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_-10%,rgba(212,175,55,0.28),transparent_60%)] print:hidden"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -start-24 -top-24 size-72 rounded-full bg-lawwin-gold/20 blur-3xl print:hidden"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-28 -end-16 size-80 rounded-full bg-lawwin-gold/10 blur-3xl print:hidden"
        aria-hidden
      />

      <div className="relative">
        <div className="text-center">
          <p
            id="deadline-hero-label"
            className="text-sm font-semibold tracking-wide text-lawwin-gold sm:text-base"
          >
            آخرین مهلت اقدام
          </p>

          <p
            className="mt-3 text-4xl font-extrabold leading-none tracking-tight text-lawwin-gold tabular-nums sm:mt-4 sm:text-5xl md:text-[3.75rem] print:text-zinc-900"
            dir="ltr"
            aria-label={`تاریخ ${dateDisplay}`}
          >
            {dateDisplay}
          </p>

          {weekday ? (
            <p className="mt-3 text-xl font-semibold text-lawwin-on-navy sm:text-2xl print:text-zinc-700">
              {weekday}
            </p>
          ) : null}

          {remainingMessage ? (
            <p
              className={`mx-auto mt-5 inline-flex max-w-full items-center justify-center rounded-xl border border-emerald-400/30 px-5 py-2.5 text-sm font-semibold backdrop-blur-sm sm:text-base ${pillClass} print:rounded-full print:border-emerald-200 print:bg-emerald-50 print:text-emerald-900`}
            >
              {remainingMessage}
            </p>
          ) : null}
        </div>

        {ruleTitle || result.durationLabel ? (
          <dl className="mt-8 grid gap-4 border-t border-white/10 pt-6 sm:grid-cols-2 print:border-zinc-200">
            {ruleTitle ? (
              <HeroDetailRow
                icon={
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                }
                label="نوع مهلت"
                value={ruleTitle}
              />
            ) : null}
            {result.durationLabel ? (
              <HeroDetailRow
                icon={
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
                label="مدت مهلت"
                value={result.durationLabel}
              />
            ) : null}
            <HeroDetailRow
              icon={
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              }
              label={startDateLabel}
              value={startDisplay}
            />
          </dl>
        ) : null}
      </div>
    </div>
  );
}
