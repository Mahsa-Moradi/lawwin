import type { Holiday } from "@/types/deadline";

/**
 * نمونهٔ تعطیلات رسمی (شمسی) — برای توسعه و تست UI/منطق بعدی.
 * فهرست واقعی سال را می‌توان بعداً از فایل بزرگ‌تر، API یا دیتابیس بارگذاری کرد.
 */
export const holidays: readonly Holiday[] = [
  {
    id: "1404-nowruz-1",
    jalaliDate: "1404-01-01",
    title: "عید نوروز",
    note: "روز اول سال شمسی (نمونه)",
  },
  {
    id: "1404-nowruz-2",
    jalaliDate: "1404-01-02",
    title: "عید نوروز",
    note: "روز دوم تعطیلات نوروزی (نمونه)",
  },
  {
    id: "1404-islamic-republic",
    jalaliDate: "1404-01-12",
    title: "روز جمهوری اسلامی ایران",
  },
  {
    id: "1404-nature-day",
    jalaliDate: "1404-01-13",
    title: "سیزده‌به‌در",
  },
  {
    id: "1404-death-imam",
    jalaliDate: "1404-02-14",
    title: "رحلت حضرت امام خمینی (ره)",
  },
];

/** فیلتر ساده بر اساس تاریخ شمسی — برای لایهٔ محاسبهٔ بعدی. */
export function getHolidayByJalaliDate(
  jalaliDate: string,
): Holiday | undefined {
  return holidays.find((h) => h.jalaliDate === jalaliDate);
}
