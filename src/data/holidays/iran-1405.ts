import type { HolidayYearDataset } from "./types";
import { buildHoliday } from "./buildHoliday";

/**
 * تعطیلات رسمی ایران — سال ۱۴۰۵ (شمسی).
 * ساختار آماده؛ رکوردها را به‌تدریج و با بازبینی حقوقی اضافه کنید.
 */
export const iran1405: HolidayYearDataset = {
  year: 1405,
  source: "curated",
  editorialNote:
    "فهرست در حال تکمیل است. تا تکمیل، فقط روزهای ثبت‌شدهٔ زیر در محاسبه لحاظ می‌شوند.",
  holidays: [
    buildHoliday(1405, "1405-nowruz-1", "1405-01-01", "عید نوروز"),
    buildHoliday(1405, "1405-nowruz-2", "1405-01-02", "عید نوروز"),
    buildHoliday(1405, "1405-nowruz-3", "1405-01-03", "عید نوروز"),
    buildHoliday(1405, "1405-nowruz-4", "1405-01-04", "عید نوروز"),
    buildHoliday(
      1405,
      "1405-islamic-republic",
      "1405-01-12",
      "روز جمهوری اسلامی ایران",
    ),
    buildHoliday(1405, "1405-nature-day", "1405-01-13", "سیزده‌به‌در"),
    buildHoliday(
      1405,
      "1405-death-imam",
      "1405-02-14",
      "رحلت حضرت امام خمینی (ره)",
    ),
    buildHoliday(1405, "1405-uprising-khomeini", "1405-02-15", "قیام ۱۵ خرداد"),
  ],
};
