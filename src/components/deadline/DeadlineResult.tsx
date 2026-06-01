import type { DeadlineCalculationResult, Holiday } from "@/types/deadline";
import {
  formatDeadlineDayBeginning,
  formatJalaliLong,
} from "@/lib/deadline/jalaliDisplay";
import { CopyResultButton } from "./CopyResultButton";
import { DeadlineResultHero } from "./DeadlineResultHero";
import { DeadlineStatusBadge } from "./DeadlineStatusBadge";
import { PrintResultButton } from "./PrintResultButton";

export const RESULT_PRINT_ID = "deadline-result-print";

type DeadlineResultProps = {
  result: DeadlineCalculationResult;
  holidays: readonly Holiday[];
};

function buildCopyText(
  result: DeadlineCalculationResult,
  holidays: readonly Holiday[],
): string {
  const holidayMap = new Map(holidays.map((h) => [h.id, h]));
  const affectedLines = result.affectedHolidayIds.map((id) => {
    const h = holidayMap.get(id);
    return h ? `${h.jalaliDate} - ${h.title}` : id;
  });

  const finalJalali =
    result.finalActionDateJalali ?? result.finalDeadlineJalali;

  const lines = ["نتیجه محاسبه موعد", `آخرین مهلت اقدام: ${finalJalali}`];

  if (result.durationLabel) {
    lines.push(`مدت: ${result.durationLabel}`);
  }
  if (result.firstCountedDayJalali) {
    lines.push(
      `اولین روز مهلت: ${formatJalaliLong(result.firstCountedDayJalali, { persianDigits: true })}`,
    );
  }
  if (result.initialDeadlineJalali) {
    lines.push(`پایان دوره شمارش: ${result.initialDeadlineJalali}`);
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

function DetailChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 sm:px-4 sm:py-3">
      <dt className="text-xs font-medium text-zinc-500">{label}</dt>
      <dd className="mt-1 text-sm font-semibold text-zinc-900">{value}</dd>
    </div>
  );
}

function CalculationDetails({
  result,
  isCivil,
}: {
  result: DeadlineCalculationResult;
  isCivil: boolean;
}) {
  const firstDay = result.firstCountedDayJalali
    ? formatDeadlineDayBeginning(result.firstCountedDayJalali)
    : null;

  return (
    <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {result.durationLabel ? (
        <DetailChip label="مدت" value={result.durationLabel} />
      ) : null}
      {isCivil && firstDay ? (
        <DetailChip label="اولین روز مهلت" value={firstDay} />
      ) : null}
      {!isCivil && result.initialDeadlineJalali ? (
        <DetailChip
          label="مهلت اولیه"
          value={result.initialDeadlineJalali}
        />
      ) : null}
      {result.remainingDays !== undefined && result.status !== undefined ? (
        <div className="rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 sm:col-span-2 sm:px-4 sm:py-3">
          <dt className="text-xs font-medium text-zinc-500">وضعیت</dt>
          <dd className="mt-2">
            <DeadlineStatusBadge status={result.status} />
          </dd>
        </div>
      ) : null}
    </dl>
  );
}

function CalculationSteps({
  result,
}: {
  result: DeadlineCalculationResult;
}) {
  if (result.calculationSteps && result.calculationSteps.length > 0) {
    return (
      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white">
        <div className="border-b border-zinc-200 bg-zinc-50 px-4 py-3 text-sm font-semibold text-zinc-800">
          روند محاسبه
        </div>
        <ul className="space-y-0 divide-y divide-zinc-100">
          {result.calculationSteps.map((step, i) => (
            <li
              key={`${i}-${step.slice(0, 24)}`}
              className="px-4 py-3 text-sm leading-relaxed text-zinc-800"
            >
              {step}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white">
      <div className="border-b border-zinc-200 bg-zinc-50 px-4 py-3 text-sm font-semibold text-zinc-800">
        توضیح محاسبه
      </div>
      <p className="whitespace-pre-line px-4 py-4 text-sm leading-relaxed text-zinc-800">
        {result.explanation}
      </p>
    </div>
  );
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

export function DeadlineResult({ result, holidays }: DeadlineResultProps) {
  const copyText = buildCopyText(result, holidays);
  const isCivil = result.firstCountedDayJalali !== undefined;

  return (
    <section
      id={RESULT_PRINT_ID}
      className="mt-10 space-y-6 print:shadow-none"
      aria-labelledby="deadline-result-heading"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2
          id="deadline-result-heading"
          className="text-lg font-semibold text-zinc-900"
        >
          نتیجهٔ محاسبه
        </h2>
        <div className="flex flex-wrap gap-2 print:hidden">
          <CopyResultButton textToCopy={copyText} label="کپی" />
          <PrintResultButton targetId={RESULT_PRINT_ID} />
        </div>
      </div>

      <DeadlineResultHero result={result} />

      <CalculationDetails result={result} isCivil={isCivil} />

      {result.movedBecauseOfHolidayOrWeekend && result.finalDayReason ? (
        <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-relaxed text-amber-900">
          تاریخ نهایی به دلیل {result.finalDayReason} به اولین روز کاری بعد
          منتقل شد.
        </p>
      ) : null}

      <CalculationSteps result={result} />

      <AffectedHolidays result={result} holidays={holidays} />
    </section>
  );
}
