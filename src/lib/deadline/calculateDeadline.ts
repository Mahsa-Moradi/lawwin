import type {
  DeadlineCalculationResult,
  DeadlineCalculationStatus,
  DeadlineRule,
  Holiday,
} from "@/types/deadline";
import {
  addDaysToJalali,
  diffJalaliCalendarDays,
  isValidJalaliDateString,
} from "./dateUtils";
import { moveToNextNonHoliday } from "./holidayUtils";

export type CalculateDeadlineParams = {
  startDateJalali: string;
  rule: DeadlineRule;
  holidays: readonly Holiday[];
  includeHolidays: boolean;
  /**
   * تاریخ مرجع شمسی (مثلاً «امروز») برای محاسبهٔ remainingDays و status.
   * اگر نباشد، آن دو فیلد در خروجی حذف می‌شوند.
   */
  referenceDateJalali?: string;
};

function statusFromRemainingDays(days: number): DeadlineCalculationStatus {
  if (days < 0) return "expired";
  if (days <= 3) return "danger";
  if (days <= 14) return "warning";
  return "safe";
}

function uniqueHolidayIdsInOrder(skipped: readonly Holiday[]): string[] {
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
 * محاسبهٔ موعد بر اساس **تقویم شمسی** (قرارداد داده: `YYYY-MM-DD` با ارقام لاتین).
 * ۱) تاریخ شروع + rule.days
 * ۲) اگر includeHolidays و روز آخر تعطیل است، تا اولین روز غیرتعطیل جلو می‌رود.
 *
 * خالص؛ بدون localStorage و بدون وابستگی به مرورگر.
 */
export function calculateDeadline(
  params: CalculateDeadlineParams,
): DeadlineCalculationResult {
  const {
    startDateJalali,
    rule,
    holidays,
    includeHolidays,
    referenceDateJalali,
  } = params;

  if (!Number.isFinite(rule.days) || !Number.isInteger(rule.days) || rule.days < 0) {
    throw new Error("تعداد روز قانون موعد باید عدد صحیح نامنفی باشد.");
  }

  if (!isValidJalaliDateString(startDateJalali)) {
    throw new Error(
      `تاریخ شروع نامعتبر است: "${startDateJalali}". قالب: YYYY-MM-DD با ارقام لاتین.`,
    );
  }

  if (
    referenceDateJalali !== undefined &&
    referenceDateJalali.length > 0 &&
    !isValidJalaliDateString(referenceDateJalali)
  ) {
    throw new Error(
      `تاریخ مرجع (امروز) نامعتبر است: "${referenceDateJalali}". قالب: YYYY-MM-DD با ارقام لاتین.`,
    );
  }

  const initialDeadlineJalali = addDaysToJalali(startDateJalali, rule.days);

  let finalDeadlineJalali = initialDeadlineJalali;
  let affectedHolidayIds: string[] = [];

  if (includeHolidays) {
    const { date, skippedHolidays } = moveToNextNonHoliday(
      initialDeadlineJalali,
      holidays,
      (d) => addDaysToJalali(d, 1),
    );
    finalDeadlineJalali = date;
    affectedHolidayIds = uniqueHolidayIdsInOrder(skippedHolidays);
  }

  const lines: string[] = [];
  lines.push(
    `تاریخ شروع (ابلاغ/شروع مهلت): ${startDateJalali}`,
  );
  lines.push(`نوع موعد: ${rule.title} (${rule.days} روز)`);
  lines.push(`مهلت اولیه پس از افزودن روزها: ${initialDeadlineJalali}`);
  if (includeHolidays) {
    if (affectedHolidayIds.length > 0) {
      lines.push(
        `روز آخر مهلت با تعطیل رسمی هم‌زمان بود؛ به نزدیک‌ترین روز غیرتعطیل منتقل شد: ${finalDeadlineJalali}`,
      );
    } else {
      lines.push(
        `روز آخر مهلت تعطیل رسمی نبود؛ تاریخ نهایی همان مهلت اولیه است: ${finalDeadlineJalali}`,
      );
    }
  } else {
    lines.push(
      "گزینهٔ لحاظ تعطیلات رسمی خاموش است؛ تعطیلات در جابه‌جایی روز آخر اعمال نشد.",
    );
  }

  const base: DeadlineCalculationResult = {
    ruleId: rule.id,
    startDateJalali,
    includeHolidays,
    initialDeadlineJalali,
    finalDeadlineJalali,
    explanation: lines.join("\n"),
    affectedHolidayIds,
  };

  if (referenceDateJalali !== undefined && referenceDateJalali.length > 0) {
    const remainingDays = diffJalaliCalendarDays(
      referenceDateJalali,
      finalDeadlineJalali,
    );
    return {
      ...base,
      remainingDays,
      status: statusFromRemainingDays(remainingDays),
    };
  }

  return base;
}
