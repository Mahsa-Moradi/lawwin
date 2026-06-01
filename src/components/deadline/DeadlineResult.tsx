import type { DeadlineCalculationResult, Holiday } from "@/types/deadline";
import {
  formatJalaliLong,
} from "@/lib/deadline/jalaliDisplay";
import { DeadlineCalculationTimeline } from "./DeadlineCalculationTimeline";
import { DeadlineResultActions } from "./DeadlineResultActions";
import { DeadlineResultHero } from "./DeadlineResultHero";
import { DeadlineResultSummary } from "./DeadlineResultSummary";

export const RESULT_PRINT_ID = "deadline-result-print";

type DeadlineResultProps = {
  result: DeadlineCalculationResult;
  holidays: readonly Holiday[];
  ruleTitle: string;
  startDateLabel?: string;
  onRecalculate: () => void;
};

function buildCopyText(
  result: DeadlineCalculationResult,
  holidays: readonly Holiday[],
  ruleTitle: string,
): string {
  const holidayMap = new Map(holidays.map((h) => [h.id, h]));
  const affectedLines = result.affectedHolidayIds.map((id) => {
    const h = holidayMap.get(id);
    return h ? `${h.jalaliDate} - ${h.title}` : id;
  });

  const finalJalali =
    result.finalActionDateJalali ?? result.finalDeadlineJalali;

  const lines = [
    "نتیجه محاسبه موعد",
    `نوع مهلت: ${ruleTitle}`,
    `آخرین مهلت اقدام: ${finalJalali}`,
  ];

  if (result.durationLabel) {
    lines.push(`مدت: ${result.durationLabel}`);
  }
  if (result.firstCountedDayJalali) {
    lines.push(
      `اولین روز مهلت: ${formatJalaliLong(result.firstCountedDayJalali, { persianDigits: true })}`,
    );
  }
  if (result.initialDeadlineJalali) {
    lines.push(`پایان مهلت اولیه: ${result.initialDeadlineJalali}`);
  }
  if (result.finalDayReason) {
    lines.push(`دلیل جابه‌جایی: ${result.finalDayReason}`);
  }
  if (result.remainingDays !== undefined) {
    lines.push(`روز باقی‌مانده: ${result.remainingDays}`);
  }

  if (result.calculationSteps && result.calculationSteps.length > 0) {
    lines.push("", "روند محاسبه:");
    for (const step of result.calculationSteps) {
      lines.push(`• ${step}`);
    }
  } else {
    lines.push("", "توضیح:", result.explanation);
  }

  if (affectedLines.length > 0) {
    lines.push("", "تعطیلات مؤثر:", ...affectedLines);
  }

  return lines.join("\n");
}

function AffectedHolidays({
  result,
  holidays,
}: {
  result: DeadlineCalculationResult;
  holidays: readonly Holiday[];
}) {
  if (!result.includeHolidays || result.affectedHolidayIds.length === 0) {
    return null;
  }

  const holidayMap = new Map(holidays.map((h) => [h.id, h]));

  return (
    <div className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-700">
      <p className="font-medium text-zinc-800">تعطیلات رسمی در مسیر جابه‌جایی</p>
      <ul className="mt-2 list-inside list-disc space-y-1">
        {result.affectedHolidayIds.map((id) => {
          const h = holidayMap.get(id);
          return (
            <li key={id}>
              {h?.title ?? id}
              {h ? (
                <span className="font-mono tabular-nums" dir="ltr">
                  {" "}
                  ({h.jalaliDate})
                </span>
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function DeadlineResult({
  result,
  holidays,
  ruleTitle,
  startDateLabel,
  onRecalculate,
}: DeadlineResultProps) {
  const copyText = buildCopyText(result, holidays, ruleTitle);

  return (
    <section
      id={RESULT_PRINT_ID}
      className="space-y-6 print:shadow-none"
      aria-labelledby="deadline-result-heading"
    >
      <h2
        id="deadline-result-heading"
        className="sr-only"
      >
        نتیجهٔ محاسبه
      </h2>

      <DeadlineResultHero result={result} />

      <div className="flex flex-col gap-6 lg:grid lg:grid-cols-12 lg:items-start">
        <div className="order-1 lg:order-2 lg:col-span-5">
          <DeadlineResultActions
            copyText={copyText}
            printTargetId={RESULT_PRINT_ID}
            onRecalculate={onRecalculate}
          />
        </div>

        <div className="order-2 space-y-4 lg:order-1 lg:col-span-7">
          <DeadlineCalculationTimeline result={result} />

          {result.movedBecauseOfHolidayOrWeekend && result.finalDayReason ? (
            <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-relaxed text-amber-900">
              تاریخ نهایی به دلیل {result.finalDayReason} به اولین روز کاری
              بعد منتقل شد.
            </p>
          ) : null}

          <AffectedHolidays result={result} holidays={holidays} />
        </div>
      </div>

      <DeadlineResultSummary
        ruleTitle={ruleTitle}
        result={result}
        startDateLabel={startDateLabel}
      />
    </section>
  );
}
