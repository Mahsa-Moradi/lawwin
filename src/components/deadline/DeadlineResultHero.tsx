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
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-800 p-6 text-white shadow-xl ring-1 ring-amber-500/25 sm:p-10 print:bg-white print:text-zinc-900 print:shadow-none print:ring-zinc-300"
      aria-labelledby="deadline-hero-label"
    >
      <div
        className="pointer-events-none absolute -start-16 -top-16 size-40 rounded-full bg-amber-500/10 blur-2xl print:hidden"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-20 -end-10 size-48 rounded-full bg-emerald-500/10 blur-3xl print:hidden"
        aria-hidden
      />

      <div className="relative text-center">
        <p
          id="deadline-hero-label"
          className="text-sm font-semibold tracking-wide text-amber-200/95 sm:text-base print:text-amber-800"
        >
          آخرین مهلت اقدام
        </p>

        <p
          className="mt-3 text-4xl font-extrabold leading-none tracking-tight tabular-nums sm:mt-4 sm:text-5xl md:text-[3.5rem] print:text-zinc-900"
          dir="ltr"
          aria-label={`تاریخ ${dateDisplay}`}
        >
          {dateDisplay}
        </p>

        {weekday ? (
          <p className="mt-3 text-xl font-semibold text-zinc-100 sm:text-2xl print:text-zinc-700">
            {weekday}
          </p>
        ) : null}

        {remainingMessage ? (
          <p
            className={`mx-auto mt-5 inline-flex max-w-full items-center justify-center rounded-full px-4 py-2 text-sm font-semibold ring-1 ring-inset sm:text-base ${pillClass} print:bg-emerald-50 print:text-emerald-900 print:ring-emerald-200`}
          >
            {remainingMessage}
          </p>
        ) : null}
      </div>
    </div>
  );
}
