import type { DeadlineCalculationResult, Holiday } from "@/types/deadline";

type DeadlineResultProps = {
  result: DeadlineCalculationResult;
  holidays: readonly Holiday[];
};

function statusLabelFa(
  status: NonNullable<DeadlineCalculationResult["status"]>,
): string {
  switch (status) {
    case "safe":
      return "فرصت کافی";
    case "warning":
      return "موعد نزدیک است";
    case "danger":
      return "خیلی نزدیک به موعد";
    case "expired":
      return "موعد گذشته است";
    default:
      return status;
  }
}

export function DeadlineResult({ result, holidays }: DeadlineResultProps) {
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
              <span>{statusLabelFa(result.status)}</span>
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
            لحاظ تعطیلات در این محاسبه خاموش بود؛ فهرست تعطیلات مؤثر نمایش داده
            نمی‌شود.
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
                      {h ? (
                        <>
                          {" "}
                          — {h.title}
                        </>
                      ) : (
                        <span className="text-zinc-500"> ({id})</span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </dd>
          </div>
        ) : (
          <p className="text-sm text-zinc-500">
            روز آخر مهلت با تعطیل رسمی هم‌زمان نبود؛ تعطیلی برای انتقال اعمال نشد.
          </p>
        )}
      </dl>
    </section>
  );
}
