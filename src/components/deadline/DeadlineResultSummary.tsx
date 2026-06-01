import type { ReactNode } from "react";
import type { DeadlineCalculationResult } from "@/types/deadline";
import {
  formatJalaliSlash,
  toPersianDigits,
} from "@/lib/deadline/jalaliDisplay";
import { StatusBadge } from "@/components/ui/Badge";
import {
  calculatorSummaryCardClassName,
  calculatorSummarySectionClassName,
} from "./calculatorStyles";

type DeadlineResultSummaryProps = {
  ruleTitle: string;
  result: DeadlineCalculationResult;
  startDateLabel?: string;
};

function SummaryCard({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className={calculatorSummaryCardClassName}>
      <p className="text-xs font-medium text-lawwin-muted-on-navy">{label}</p>
      <div className="mt-1.5 text-sm font-semibold text-lawwin-on-navy">
        {children}
      </div>
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
    <div className={calculatorSummarySectionClassName}>
      <h3 className="text-sm font-semibold text-lawwin-gold">خلاصه محاسبه</h3>
      <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <SummaryCard label="نوع مهلت">
          <span className="line-clamp-2 text-pretty leading-snug">
            {ruleTitle || "—"}
          </span>
        </SummaryCard>
        <SummaryCard label="مدت مهلت">
          {result.durationLabel ?? "—"}
        </SummaryCard>
        <SummaryCard label={startDateLabel}>
          <span className="font-mono tabular-nums text-lawwin-gold" dir="ltr">
            {notificationDisplay}
          </span>
        </SummaryCard>
        <SummaryCard label="وضعیت">
          {result.status ? (
            <StatusBadge status={result.status} />
          ) : (
            "—"
          )}
        </SummaryCard>
      </dl>
    </div>
  );
}
