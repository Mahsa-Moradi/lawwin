import type {
  DeadlineCalculationResult,
  DeadlineCalculationStatus,
  DeadlineRule,
  FinalDayMoveReason,
  Holiday,
} from "@/types/deadline";
import {
  addDaysToJalali,
  diffJalaliCalendarDays,
  isValidJalaliDateString,
} from "./dateUtils";
import { formatJalaliLong } from "./jalaliDisplay";
import { moveToNextWorkingDay } from "./workingDayUtils";

export type CalculateCivilProcedureParams = {
  notificationDateJalali: string;
  rule: DeadlineRule;
  holidays: readonly Holiday[];
  adjustFinalWorkingDay: boolean;
  referenceDateJalali?: string;
};

function statusFromRemainingDays(days: number): DeadlineCalculationStatus {
  if (days < 0) return "expired";
  if (days <= 3) return "danger";
  if (days <= 14) return "warning";
  return "safe";
}

function uniqueHolidayIds(skipped: readonly Holiday[]): string[] {
  const seen = new Set<string>();
  const ids: string[] = [];
  for (const h of skipped) {
    if (!seen.has(h.id)) {
      seen.add(h.id);
      ids.push(h.id);
    }
  }
  return ids;
}

/**
 * موتور آیین دادرسی مدنی:
 * - روز ابلاغ شمرده نمی‌شود؛ شمارش از روز تقویمی بعد.
 * - تعطیلات در میانهٔ مهلت عادی شمرده می‌شوند.
 * - فقط اگر روز پایان دورهٔ شمارش غیرکاری باشد، به روز کاری بعد منتقل می‌شود.
 */
export function calculateCivilProcedureDeadline(
  params: CalculateCivilProcedureParams,
): DeadlineCalculationResult {
  const {
    notificationDateJalali,
    rule,
    holidays,
    adjustFinalWorkingDay,
    referenceDateJalali,
  } = params;

  if (!isValidJalaliDateString(notificationDateJalali)) {
    throw new Error(
      `تاریخ ابلاغ نامعتبر است: "${notificationDateJalali}". قالب: YYYY-MM-DD با ارقام لاتین.`,
    );
  }

  if (
    referenceDateJalali !== undefined &&
    referenceDateJalali.length > 0 &&
    !isValidJalaliDateString(referenceDateJalali)
  ) {
    throw new Error(`تاریخ مرجع نامعتبر است: "${referenceDateJalali}".`);
  }

  const durations = [...rule.durations];
  if (
    durations.length === 0 ||
    durations.some((d) => !Number.isInteger(d) || d < 1)
  ) {
    throw new Error("مدت قانون باید حداقل یک عدد صحیح مثبت باشد.");
  }

  const steps: string[] = [];
  steps.push(
    `تاریخ مبدأ (ابلاغ): ${formatJalaliLong(notificationDateJalali, { persianDigits: true })}`,
  );
  steps.push("روز مبدأ در شمارش مهلت لحاظ نشد.");

  const firstCountedDayJalali = addDaysToJalali(notificationDateJalali, 1);
  steps.push(
    `اولین روز شمارش: ${formatJalaliLong(firstCountedDayJalali, { persianDigits: true })}`,
  );

  let segmentStart = firstCountedDayJalali;
  let initialDeadlineJalali = firstCountedDayJalali;

  durations.forEach((days, index) => {
    const stageLabel =
      durations.length > 1 ? `مرحله ${index + 1}: ` : "";
    const segmentEnd = addDaysToJalali(segmentStart, days - 1);
    initialDeadlineJalali = segmentEnd;

    steps.push(
      `${stageLabel}مهلت ${days} روزه از ${formatJalaliLong(segmentStart, { persianDigits: true })} آغاز شد و پس از ${days} روز شمارش، تاریخ ${formatJalaliLong(segmentEnd, { persianDigits: true })} بدست آمد.`,
    );

    if (index < durations.length - 1) {
      const nextStart = addDaysToJalali(segmentEnd, 1);
      steps.push(
        `${formatJalaliLong(segmentEnd, { persianDigits: true })} پایان مرحلهٔ ${index + 1} بود؛ شمارش مرحلهٔ بعد از ${formatJalaliLong(nextStart, { persianDigits: true })} آغاز می‌شود.`,
      );
      segmentStart = nextStart;
    }
  });

  let finalActionDateJalali = initialDeadlineJalali;
  let movedBecauseOfHolidayOrWeekend = false;
  let finalDayReason: FinalDayMoveReason | undefined;
  let affectedHolidayIds: string[] = [];

  if (adjustFinalWorkingDay) {
    const move = moveToNextWorkingDay(
      initialDeadlineJalali,
      holidays,
      (d) => addDaysToJalali(d, 1),
    );
    if (move.date !== initialDeadlineJalali) {
      movedBecauseOfHolidayOrWeekend = true;
      finalDayReason = move.finalDayReason;
      affectedHolidayIds = uniqueHolidayIds(move.skippedHolidays);
      steps.push(
        `${formatJalaliLong(initialDeadlineJalali, { persianDigits: true })} روز اقدام/پایان دوره بود و به عنوان آخرین مهلت قابل اقدام در نظر گرفته نشد (${move.finalDayReason ?? "غیرکاری"}).`,
      );
      steps.push(
        `روز بعد یعنی ${formatJalaliLong(move.date, { persianDigits: true })} به عنوان آخرین مهلت اقدام در نظر گرفته شد.`,
      );
      finalActionDateJalali = move.date;
    } else {
      steps.push(
        `روز ${formatJalaliLong(initialDeadlineJalali, { persianDigits: true })} روز کاری است و به عنوان آخرین مهلت اقدام در نظر گرفته شد.`,
      );
    }
  } else {
    steps.push(
      "تنظیم روز آخر به روز کاری غیرفعال است؛ تاریخ پایان دوره بدون جابه‌جایی باقی ماند.",
    );
  }

  const explanation = steps.join("\n");

  const base: DeadlineCalculationResult = {
    ruleId: rule.id,
    startDateJalali: notificationDateJalali,
    includeHolidays: adjustFinalWorkingDay,
    durationLabel: rule.durationLabel,
    firstCountedDayJalali,
    initialDeadlineJalali,
    finalActionDateJalali,
    finalDeadlineJalali: finalActionDateJalali,
    explanation,
    calculationSteps: steps,
    movedBecauseOfHolidayOrWeekend,
    finalDayReason,
    affectedHolidayIds,
  };

  if (referenceDateJalali !== undefined && referenceDateJalali.length > 0) {
    const remainingDays = diffJalaliCalendarDays(
      referenceDateJalali,
      finalActionDateJalali,
    );
    return {
      ...base,
      remainingDays,
      status: statusFromRemainingDays(remainingDays),
    };
  }

  return base;
}
