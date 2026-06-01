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
};

export function DeadlineResultHero({ result }: DeadlineResultHeroProps) {
  const finalJalali =
    result.finalActionDateJalali ?? result.finalDeadlineJalali;
  const dateDisplay = toPersianDigits(formatJalaliSlash(finalJalali));
  const weekday = getJalaliWeekdayName(finalJalali);
  const remainingMessage = formatRemainingDaysMessage(
    result.remainingDays,
    result.status,
  );
  const pillClass = remainingDaysPillClassName(result.status);

  return (
    <div
      className="relative overflow-hidden rounded-xl border border-lawwin-gold/20 bg-lawwin-navy-deepest px-4 py-4 shadow-md shadow-black/30 ring-1 ring-lawwin-gold/15 sm:px-5 sm:py-4 print:border-zinc-300 print:bg-white print:text-zinc-900 print:shadow-none"
      aria-labelledby="deadline-hero-label"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(212,175,55,0.14),transparent_55%)] print:hidden"
        aria-hidden
      />

      <div className="relative text-center">
        <p
          id="deadline-hero-label"
          className="text-xs font-semibold tracking-wide text-lawwin-gold sm:text-sm"
        >
          آخرین مهلت اقدام
        </p>

        <p
          className="mt-1.5 text-3xl font-extrabold leading-none tracking-tight text-lawwin-gold tabular-nums sm:text-[2rem] print:text-zinc-900"
          dir="ltr"
          aria-label={`تاریخ ${dateDisplay}`}
        >
          {dateDisplay}
        </p>

        {weekday ? (
          <p className="mt-1.5 text-base font-semibold text-lawwin-on-navy sm:text-lg print:text-zinc-700">
            {weekday}
          </p>
        ) : null}

        {remainingMessage ? (
          <p
            className={`mx-auto mt-3 inline-flex max-w-full items-center justify-center rounded-lg border border-emerald-400/25 px-3.5 py-1.5 text-xs font-semibold sm:text-sm ${pillClass} print:rounded-full print:border-emerald-200 print:bg-emerald-50 print:text-emerald-900`}
          >
            {remainingMessage}
          </p>
        ) : null}
      </div>
    </div>
  );
}
