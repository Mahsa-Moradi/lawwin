import type { DeadlineCalculationResult, Holiday } from "@/types/deadline";
import {
  formatDeadlineDayBeginning,
  formatDeadlineDayEnd,
  formatJalaliLong,
} from "@/lib/deadline/jalaliDisplay";
import { CopyResultButton } from "./CopyResultButton";
import { DeadlineStatusBadge } from "./DeadlineStatusBadge";
import { PrintResultButton } from "./PrintResultButton";

const RESULT_PRINT_ID = "deadline-result-print";

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

  const lines = ["نتیجه محاسبه موعد"];

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
  lines.push(
    `آخرین مهلت: ${result.finalActionDateJalali ?? result.finalDeadlineJalali}`,
  );
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

function ResultField({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200">
      <div className="border-b border-zinc-200 bg-zinc-50 px-4 py-2 text-sm font-medium text-zinc-600">
        {label}
      </div>
      <div className="px-4 py-3 text-sm leading-relaxed text-zinc-900">{value}</div>
    </div>
  );
}

function CivilProcedureResult({
  result,
  holidays,
  copyText,
}: {
  result: DeadlineCalculationResult;
  holidays: readonly Holiday[];
  copyText: string;
}) {
  const holidayMap = new Map(holidays.map((h) => [h.id, h]));
  const firstDay = result.firstCountedDayJalali
    ? formatDeadlineDayBeginning(result.firstCountedDayJalali)
    : "—";
  const lastDay = result.finalActionDateJalali
    ? formatDeadlineDayEnd(result.finalActionDateJalali)
    : formatDeadlineDayEnd(result.finalDeadlineJalali);

  return (
    <section
      id={RESULT_PRINT_ID}
      className="mt-10 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm print:shadow-none"
      aria-labelledby="deadline-result-heading"
    >
      <h2
        id="deadline-result-heading"
        className="text-lg font-semibold text-zinc-900"
      >
        نتیجهٔ محاسبه
      </h2>

      <div className="mt-4 flex flex-wrap gap-2 print:hidden">
        <CopyResultButton textToCopy={copyText} label="کپی" />
        <PrintResultButton targetId={RESULT_PRINT_ID} />
      </div>

      <div className="mt-6 space-y-4">
        <ResultField label="مدت" value={result.durationLabel ?? "—"} />
        <ResultField label="اولین روز مهلت" value={firstDay} />
        <ResultField label="آخرین مهلت" value={lastDay} />

        {result.calculationSteps && result.calculationSteps.length > 0 ? (
          <div className="overflow-hidden rounded-xl border border-zinc-200">
            <div className="border-b border-zinc-200 bg-zinc-50 px-4 py-2 text-sm font-medium text-zinc-600">
              روند محاسبه
            </div>
            <ul className="list-inside list-disc space-y-2 px-4 py-3 text-sm leading-relaxed text-zinc-800">
              {result.calculationSteps.map((step, i) => (
                <li key={`${i}-${step.slice(0, 24)}`}>{step}</li>
              ))}
            </ul>
          </div>
        ) : null}

        {result.movedBecauseOfHolidayOrWeekend && result.finalDayReason ? (
          <p className="text-sm text-amber-900">
            تاریخ نهایی به دلیل {result.finalDayReason} به روز کاری بعد منتقل شد.
          </p>
        ) : null}

        {result.remainingDays !== undefined && result.status !== undefined ? (
          <div className="flex flex-wrap items-center gap-2 text-sm text-zinc-700">
            <span>
              روزهای باقی‌مانده تا آخرین مهلت:{" "}
              <span className="font-mono tabular-nums" dir="ltr">
                {result.remainingDays}
              </span>
            </span>
            <DeadlineStatusBadge status={result.status} />
          </div>
        ) : null}

        {result.includeHolidays && result.affectedHolidayIds.length > 0 ? (
          <div className="text-sm text-zinc-600">
            <p className="font-medium">تعطیلات رسمی در مسیر جابه‌جایی:</p>
            <ul className="mt-1 list-inside list-disc">
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
        ) : null}
      </div>
    </section>
  );
}

function LegacyResult({
  result,
  holidays,
  copyText,
}: {
  result: DeadlineCalculationResult;
  holidays: readonly Holiday[];
  copyText: string;
}) {
  const holidayMap = new Map(holidays.map((h) => [h.id, h]));

  return (
    <section
      className="mt-10 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
      aria-labelledby="deadline-result-heading"
    >
      <h2
        id="deadline-result-heading"
        className="text-lg font-semibold text-zinc-900"
      >
        نتیجهٔ محاسبه
      </h2>
      <div className="mt-3">
        <CopyResultButton textToCopy={copyText} />
      </div>

      <dl className="mt-6 space-y-4 text-sm">
        <div className="flex flex-col gap-1 border-b border-zinc-100 pb-4 sm:flex-row sm:justify-between">
          <dt className="font-medium text-zinc-600">مهلت اولیه (پس از افزودن روزها)</dt>
          <dd className="font-mono text-zinc-900 tabular-nums" dir="ltr">
            {result.initialDeadlineJalali ?? "—"}
          </dd>
        </div>
        <div className="flex flex-col gap-1 border-b border-zinc-100 pb-4 sm:flex-row sm:justify-between">
          <dt className="font-medium text-zinc-600">مهلت نهایی</dt>
          <dd className="font-mono font-semibold text-zinc-900 tabular-nums" dir="ltr">
            {result.finalDeadlineJalali}
          </dd>
        </div>

        {result.remainingDays !== undefined && result.status !== undefined ? (
          <div className="flex flex-col gap-1 border-b border-zinc-100 pb-4 sm:flex-row sm:justify-between">
            <dt className="font-medium text-zinc-600">روزهای باقی‌مانده / وضعیت</dt>
            <dd className="text-zinc-900">
              <span className="font-mono tabular-nums" dir="ltr">
                {result.remainingDays}
              </span>
              <span className="mx-2 text-zinc-400">·</span>
              <DeadlineStatusBadge status={result.status} />
            </dd>
          </div>
        ) : null}

        <div className="pt-2">
          <dt className="font-medium text-zinc-600">توضیح محاسبه</dt>
          <dd className="mt-2 whitespace-pre-line rounded-lg bg-zinc-50 p-4 text-zinc-800 leading-relaxed">
            {result.explanation}
          </dd>
        </div>

        {!result.includeHolidays ? (
          <p className="text-sm text-zinc-500">
            لحاظ تعطیلات در این محاسبه خاموش بود.
          </p>
        ) : result.affectedHolidayIds.length > 0 ? (
          <div>
            <dt className="font-medium text-zinc-600">تعطیلات مؤثر بر تاریخ نهایی</dt>
            <dd className="mt-2">
              <ul className="list-inside list-disc space-y-1 text-zinc-800">
                {result.affectedHolidayIds.map((id) => {
                  const h = holidayMap.get(id);
                  return (
                    <li key={id}>
                      <span className="font-mono tabular-nums" dir="ltr">
                        {h?.jalaliDate ?? "—"}
                      </span>
                      {h ? <> — {h.title}</> : <span className="text-zinc-500"> ({id})</span>}
                    </li>
                  );
                })}
              </ul>
            </dd>
          </div>
        ) : (
          <p className="text-sm text-zinc-500">
            روز آخر مهلت با تعطیل رسمی هم‌زمان نبود.
          </p>
        )}
      </dl>
    </section>
  );
}

export function DeadlineResult({ result, holidays }: DeadlineResultProps) {
  const copyText = buildCopyText(result, holidays);
  const isCivil = result.firstCountedDayJalali !== undefined;

  if (isCivil) {
    return (
      <CivilProcedureResult
        result={result}
        holidays={holidays}
        copyText={copyText}
      />
    );
  }

  return (
    <LegacyResult result={result} holidays={holidays} copyText={copyText} />
  );
}
