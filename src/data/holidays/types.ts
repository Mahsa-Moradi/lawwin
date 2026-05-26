import type { Holiday } from "@/types/deadline";

/**
 * یک فایل تعطیلات سالانه — دادهٔ دست‌نویس و بازبینی‌شده (بدون sync زنده).
 */
export type HolidayYearDataset = {
  /** سال شمسی (باید با پیشوند jalaliDate در رکوردها هم‌خوان باشد). */
  year: number;
  /** منبع داده؛ فقط «curated» برای فایل‌های محلی پروژه. */
  source: "curated";
  /** یادداشت برای ویرایشگر انسانی (مثلاً «نمونه — تکمیل شود»). */
  editorialNote?: string;
  holidays: readonly Holiday[];
};
