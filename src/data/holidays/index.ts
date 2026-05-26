import type { Holiday } from "@/types/deadline";
import { parseJalaliDate } from "@/lib/deadline/dateUtils";
import {
  getHolidayYearDataset,
  getRegisteredHolidayYears,
  holidayYearDatasets,
  mergeHolidayDatasets,
} from "./registry";

export type { HolidayYearDataset } from "./types";
export { iran1404 } from "./iran-1404";
export { iran1405 } from "./iran-1405";
export {
  getHolidayYearDataset,
  getRegisteredHolidayYears,
  holidayYearDatasets,
};

/**
 * همهٔ تعطیلات ثبت‌شده در فایل‌های سالانه (بدون fetch خارجی).
 * برای محاسبهٔ پایدار؛ هر سال فقط از فایل curated همان سال می‌آید.
 */
export const holidays: readonly Holiday[] = mergeHolidayDatasets(
  holidayYearDatasets,
);

/** تعطیلات یک سال شمسی مشخص. */
export function getHolidaysForYear(year: number): readonly Holiday[] {
  const dataset = getHolidayYearDataset(year);
  if (!dataset) return [];
  return mergeHolidayDatasets([dataset]);
}

/** تعطیلات چند سال (مثلاً وقتی مهلت از مرز سال عبور می‌کند). */
export function getHolidaysForYears(
  years: readonly number[],
): readonly Holiday[] {
  const datasets = years
    .map((y) => getHolidayYearDataset(y))
    .filter((d): d is NonNullable<typeof d> => d !== undefined);
  if (datasets.length === 0) return [];
  return mergeHolidayDatasets(datasets);
}

/**
 * تعطیلات مرتبط با یک بازهٔ محاسبه — سال شروع و سال بعد (عبور از نوروز).
 */
export function getHolidaysForCalculation(context: {
  startDateJalali: string;
}): readonly Holiday[] {
  const parsed = parseJalaliDate(context.startDateJalali.trim());
  if (!parsed) return holidays;

  const years = new Set<number>([parsed.year, parsed.year + 1]);
  const resolved = getHolidaysForYears([...years]);
  return resolved.length > 0 ? resolved : holidays;
}

export function getHolidayByJalaliDate(
  jalaliDate: string,
): Holiday | undefined {
  const parsed = parseJalaliDate(jalaliDate);
  if (parsed) {
    const yearList = getHolidaysForYear(parsed.year);
    const inYear = yearList.find((h) => h.jalaliDate === jalaliDate);
    if (inYear) return inYear;
  }
  return holidays.find((h) => h.jalaliDate === jalaliDate);
}
