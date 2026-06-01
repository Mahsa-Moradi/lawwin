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
      <p className="text-[0.65rem] font-medium uppercase tracking-wide text-lawwin-muted-on-navy sm:text-xs">
        {label}
      </p>
      <div className="mt-0.5 text-xs font-semibold leading-snug text-lawwin-on-navy sm:text-sm">
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
      <h3 className="text-xs font-semibold text-lawwin-gold sm:text-sm">
        خلاصه محاسبه
      </h3>
      <dl className="mt-2.5 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-2.5">
        <SummaryCard label="نوع مهلت">
          <span className="line-clamp-2 text-pretty">{ruleTitle || "—"}</span>
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
