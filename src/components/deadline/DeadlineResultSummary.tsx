import type { ReactNode } from "react";
import type { DeadlineCalculationResult } from "@/types/deadline";
import {
  formatJalaliSlash,
  toPersianDigits,
} from "@/lib/deadline/jalaliDisplay";
import { statusSummaryLabel } from "@/lib/deadline/statusSummaryLabel";
import { DeadlineStatusBadge } from "./DeadlineStatusBadge";

type DeadlineResultSummaryProps = {
  ruleTitle: string;
  result: DeadlineCalculationResult;
  startDateLabel?: string;
};

function SummaryCard({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white px-3 py-3 shadow-sm sm:px-4 sm:py-3.5">
      <p className="text-xs font-medium text-zinc-500">{label}</p>
      <div className="mt-1.5 text-sm font-semibold text-zinc-900">{children}</div>
    </div>
  );
}

export function DeadlineResultSummary({
  ruleTitle,
  result,
  startDateLabel = "تاریخ ابلاغ",
}: DeadlineResultSummaryProps) {
  const notificationDisplay = toPersianDigits(
    formatJalaliSlash(result.startDateJalali),
  );

  return (
    <div>
      <h3 className="mb-3 text-sm font-semibold text-zinc-800">جزئیات محاسبه</h3>
      <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <SummaryCard label="نوع مهلت">
          <span className="line-clamp-2 text-pretty leading-snug">
            {ruleTitle || "—"}
          </span>
        </SummaryCard>
        <SummaryCard label="مدت مهلت">
          {result.durationLabel ?? "—"}
        </SummaryCard>
        <SummaryCard label={startDateLabel}>
          <span className="font-mono tabular-nums" dir="ltr">
            {notificationDisplay}
          </span>
        </SummaryCard>
        <SummaryCard label="وضعیت">
          {result.status ? (
            <div className="flex flex-col items-start gap-1.5">
              <span className="text-emerald-700">
                {statusSummaryLabel(result.status)}
              </span>
              <DeadlineStatusBadge status={result.status} />
            </div>
          ) : (
            "—"
          )}
        </SummaryCard>
      </dl>
    </div>
  );
}
