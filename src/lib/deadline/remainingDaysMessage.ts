import type { DeadlineCalculationStatus } from "@/types/deadline";
import { toPersianDigits } from "./jalaliDisplay";

/** متن وضعیت روزهای باقی‌مانده برای کارت نتیجه (سطح ۴). */
export function formatRemainingDaysMessage(
  remainingDays: number | undefined,
  status?: DeadlineCalculationStatus,
): string {
  if (remainingDays === undefined) {
    return status === "expired" ? "موعد گذشته است" : "";
  }

  if (remainingDays < 0) {
    const passed = Math.abs(remainingDays);
    if (passed === 1) return "۱ روز از موعد گذشته است";
    return `${toPersianDigits(passed)} روز از موعد گذشته است`;
  }

  if (remainingDays === 0) {
    return "امروز آخرین روز اقدام است";
  }

  if (remainingDays === 1) {
    return "هنوز ۱ روز فرصت دارید";
  }

  return `هنوز ${toPersianDigits(remainingDays)} روز فرصت دارید`;
}

export function remainingDaysPillClassName(
  status?: DeadlineCalculationStatus,
): string {
  switch (status) {
    case "expired":
      return "bg-rose-500/20 text-rose-100 ring-rose-400/40";
    case "danger":
      return "bg-orange-500/20 text-orange-100 ring-orange-400/40";
    case "warning":
      return "bg-amber-500/20 text-amber-100 ring-amber-400/40";
    case "safe":
    default:
      return "bg-emerald-500/20 text-emerald-100 ring-emerald-400/40";
  }
}
