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
      className="relative overflow-hidden rounded-2xl bg-lawwin-navy-deepest p-6 text-lawwin-on-navy shadow-xl shadow-lawwin-navy-deepest/30 ring-1 ring-lawwin-gold/25 sm:p-10 print:bg-white print:text-zinc-900 print:shadow-none print:ring-zinc-300"
      aria-labelledby="deadline-hero-label"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_0%,rgba(212,175,55,0.22),transparent_65%)] print:hidden"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -start-20 -top-20 size-56 rounded-full bg-lawwin-gold/15 blur-3xl print:hidden"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-24 -end-12 size-64 rounded-full bg-lawwin-gold/10 blur-3xl print:hidden"
        aria-hidden
      />

      <div className="relative text-center">
        <p
          id="deadline-hero-label"
          className="text-sm font-semibold tracking-wide text-lawwin-gold sm:text-base print:text-amber-800"
        >
          آخرین مهلت اقدام
        </p>

        <p
          className="mt-3 text-4xl font-extrabold leading-none tracking-tight text-lawwin-gold tabular-nums sm:mt-4 sm:text-5xl md:text-[3.5rem] print:text-zinc-900"
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
            className={`mx-auto mt-5 inline-flex max-w-full items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold ring-1 ring-inset backdrop-blur-sm sm:text-base ${pillClass} print:rounded-full print:bg-emerald-50 print:text-emerald-900 print:ring-emerald-200`}
          >
            {remainingMessage}
          </p>
        ) : null}
      </div>
    </div>
  );
}
