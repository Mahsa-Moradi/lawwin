import type { FinalDayMoveReason, Holiday } from "@/types/deadline";
import { getGregorianWeekdayIndex } from "./gregorianWeekday";
import { getHolidaysOnJalaliDate, isJalaliHoliday } from "./holidayUtils";

export function isThursday(jalaliDate: string): boolean {
  return getGregorianWeekdayIndex(jalaliDate) === 4;
}

export function isFriday(jalaliDate: string): boolean {
  return getGregorianWeekdayIndex(jalaliDate) === 5;
}

export function getNonWorkingDayReason(
  jalaliDate: string,
  holidays: readonly Holiday[],
): FinalDayMoveReason | null {
  if (isJalaliHoliday(jalaliDate, holidays)) return "تعطیل رسمی";
  if (isThursday(jalaliDate)) return "پنجشنبه";
  if (isFriday(jalaliDate)) return "جمعه";
  return null;
}

export function isWorkingDay(
  jalaliDate: string,
  holidays: readonly Holiday[],
): boolean {
  return getNonWorkingDayReason(jalaliDate, holidays) === null;
}

export type MoveToWorkingDayResult = {
  date: string;
  skippedHolidays: Holiday[];
  finalDayReason?: FinalDayMoveReason;
};

/**
 * اگر روز غیرکاری باشد (تعطیل رسمی، پنجشنبه، جمعه)، به روز بعد می‌رود
 * تا اولین روز کاری برسد.
 */
export function moveToNextWorkingDay(
  jalaliDate: string,
  holidays: readonly Holiday[],
  addOneDay: (d: string) => string,
  maxSteps = 366,
): MoveToWorkingDayResult {
  const skippedHolidays: Holiday[] = [];
  let current = jalaliDate;
  let steps = 0;
  let finalDayReason: FinalDayMoveReason | undefined;

  const firstReason = getNonWorkingDayReason(current, holidays);
  if (firstReason) {
    finalDayReason = firstReason;
  }

  while (!isWorkingDay(current, holidays) && steps < maxSteps) {
    const onDay = getHolidaysOnJalaliDate(current, holidays);
    for (const h of onDay) {
      skippedHolidays.push(h);
    }
    current = addOneDay(current);
    steps++;
  }

  if (!isWorkingDay(current, holidays)) {
    throw new Error(
      "پس از حداکثر گام مجاز، روز کاری پیدا نشد؛ فهرست تعطیلات یا پارامتر maxSteps را بررسی کنید.",
    );
  }

  return { date: current, skippedHolidays, finalDayReason };
}
