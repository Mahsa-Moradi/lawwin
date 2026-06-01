import type { DeadlineCalculationResult } from "@/types/deadline";

export type CalculationTimelineTone =
  | "neutral"
  | "amber"
  | "success"
  | "move";

export type CalculationTimelineStep = {
  id: string;
  title: string;
  dateJalali: string;
  description: string;
  tone: CalculationTimelineTone;
  isFinal?: boolean;
};

/**
 * مراحل نمایشی تایم‌لاین — فقط از خروجی محاسبهٔ موجود ساخته می‌شود.
 */
export function buildCalculationTimeline(
  result: DeadlineCalculationResult,
): CalculationTimelineStep[] {
  const steps: CalculationTimelineStep[] = [];
  const isCivil = result.firstCountedDayJalali !== undefined;
  const finalDate =
    result.finalActionDateJalali ?? result.finalDeadlineJalali;
  const initialDate = result.initialDeadlineJalali;
  const movedByDate =
    initialDate !== undefined && initialDate !== finalDate;

  steps.push({
    id: "notification",
    title: isCivil ? "تاریخ ابلاغ" : "تاریخ شروع",
    dateJalali: result.startDateJalali,
    description: isCivil
      ? "روز مبدأ؛ در شمارش مهلت لحاظ نمی‌شود."
      : "تاریخ شروع محاسبهٔ مهلت.",
    tone: "neutral",
  });

  if (result.firstCountedDayJalali) {
    steps.push({
      id: "first-counted",
      title: "اولین روز مهلت",
      dateJalali: result.firstCountedDayJalali,
      description: "روز بعد از ابلاغ؛ آغاز شمارش روزهای مهلت.",
      tone: "neutral",
    });
  }

  if (initialDate) {
    steps.push({
      id: "initial-deadline",
      title: "پایان مهلت اولیه",
      dateJalali: initialDate,
      description: result.durationLabel
        ? `بر اساس ${result.durationLabel} و قواعد شمارش.`
        : "پایان دورهٔ شمارش قبل از تنظیم روز آخر.",
      tone: "amber",
    });
  }

  if (movedByDate && initialDate) {
    steps.push({
      id: "working-day-move",
      title: "انتقال به روز کاری",
      dateJalali: finalDate,
      description: result.finalDayReason
        ? `روز ${initialDate} به‌دلیل ${result.finalDayReason} روز اقدام نبود؛ به اولین روز کاری بعد منتقل شد.`
        : "روز پایان دوره غیرکاری بود؛ به اولین روز کاری بعد منتقل شد.",
      tone: "move",
    });
  }

  steps.push({
    id: "final",
    title: "نتیجه نهایی",
    dateJalali: finalDate,
    description: "آخرین مهلت اقدام شما.",
    tone: "success",
    isFinal: true,
  });

  return steps;
}
