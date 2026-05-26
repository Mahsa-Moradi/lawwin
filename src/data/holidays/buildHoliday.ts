import type { Holiday } from "@/types/deadline";

/** ساخت رکورد تعطیل با سال ثابت برای فایل‌های سالانه. */
export function buildHoliday(
  year: number,
  id: string,
  jalaliDate: string,
  title: string,
  note?: string,
): Holiday {
  return { id, jalaliDate, title, note, year };
}
