import type { DeadlineCalculationStatus } from "@/types/deadline";

/** برچسب کوتاه وضعیت برای کارت خلاصه. */
export function statusSummaryLabel(
  status: DeadlineCalculationStatus | undefined,
): string {
  if (!status) return "—";
  if (status === "expired") return "منقضی";
  return "فعال";
}
