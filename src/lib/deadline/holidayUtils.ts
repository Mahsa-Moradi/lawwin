import type { Holiday } from "@/types/deadline";

/** تمام تعطیلاتی که در یک تاریخ شمسی ثبت شده‌اند. */
export function getHolidaysOnJalaliDate(
  jalaliDate: string,
  holidays: readonly Holiday[],
): readonly Holiday[] {
  return holidays.filter((h) => h.jalaliDate === jalaliDate);
}

export function isJalaliHoliday(
  jalaliDate: string,
  holidays: readonly Holiday[],
): boolean {
  return holidays.some((h) => h.jalaliDate === jalaliDate);
}

export type MovePastHolidaysResult = {
  /** تاریخ نهایی پس از رد کردن روزهای تعطیل */
  date: string;
  /** تعطیلاتی که باعث جابه‌جایی شدند (به ترتیب زمانی) */
  skippedHolidays: Holiday[];
};

/**
 * اگر `jalaliDate` تعطیل باشد، یکی‌یکی به روز بعد می‌رود تا به اولین روز غیرتعطیل برسد.
 * حلقهٔ ایمن: حداکثر `maxSteps` گام (پیش‌فرض ۳۶۶) تا از حلقهٔ بی‌نهایت جلوگیری شود.
 */
export function moveToNextNonHoliday(
  jalaliDate: string,
  holidays: readonly Holiday[],
  addOneDay: (d: string) => string,
  maxSteps = 366,
): MovePastHolidaysResult {
  const skippedHolidays: Holiday[] = [];
  let current = jalaliDate;
  let steps = 0;

  while (isJalaliHoliday(current, holidays) && steps < maxSteps) {
    const onDay = getHolidaysOnJalaliDate(current, holidays);
    for (const h of onDay) {
      skippedHolidays.push(h);
    }
    current = addOneDay(current);
    steps++;
  }

  if (isJalaliHoliday(current, holidays)) {
    throw new Error(
      "پس از حداکثر گام مجاز، روز غیرتعطیل پیدا نشد؛ فهرست تعطیلات یا پارامتر maxSteps را بررسی کنید.",
    );
  }

  return { date: current, skippedHolidays };
}
