import type { HolidayYearDataset } from "./types";
import { buildHoliday } from "./buildHoliday";

/**
 * تعطیلات رسمی ایران — سال ۱۴۰۴ (شمسی).
 * دادهٔ نمونه/آموزشی؛ قبل از استفادهٔ عملی با تقویم رسمی بازبینی شود.
 */
export const iran1404: HolidayYearDataset = {
  year: 1404,
  source: "curated",
  editorialNote:
    "فهرست نمونه برای توسعه؛ برای اتکای حقوقی باید با منبع معتبر تکمیل و تأیید شود.",
  holidays: [
    buildHoliday(1404, "1404-nowruz-1", "1404-01-01", "عید نوروز", "روز اول سال"),
    buildHoliday(1404, "1404-nowruz-2", "1404-01-02", "عید نوروز", "روز دوم"),
    buildHoliday(1404, "1404-nowruz-3", "1404-01-03", "عید نوروز", "روز سوم"),
    buildHoliday(1404, "1404-nowruz-4", "1404-01-04", "عید نوروز", "روز چهارم"),
    buildHoliday(
      1404,
      "1404-islamic-republic",
      "1404-01-12",
      "روز جمهوری اسلامی ایران",
    ),
    buildHoliday(1404, "1404-nature-day", "1404-01-13", "سیزده‌به‌در"),
    buildHoliday(
      1404,
      "1404-death-imam",
      "1404-02-14",
      "رحلت حضرت امام خمینی (ره)",
    ),
    buildHoliday(
      1404,
      "1404-uprising-khomeini",
      "1404-02-15",
      "قیام ۱۵ خرداد",
    ),
  ],
};
