/**
 * ابزارهای تاریخ شمسی (جلالی) — **Jalali-first**
 *
 * - ورودی/خروجی عمومی: رشتهٔ `YYYY-MM-DD` با **ارقام لاتین** (قرارداد داخلی پروژه).
 * - تمام عملیات روی تقویم شمسی تعریف شده‌اند؛ برای جمع/تفریق روز از شمارهٔ روز ژولیانی
 *   داخل کتابخانهٔ `jalaali-js` استفاده می‌شود (بدون exposed کردن میلادی به لایهٔ اپ).
 *
 * محدودیت‌ها:
 * - فقط «روز تقویمی»؛ ساعت و منطقهٔ زمانی در اختلاف روز لحاظ نمی‌شود.
 * - محدودهٔ سال مطابق `jalaali-js` / تقویم رسمی (حدود -۶۱ تا ۳۱۷۷ شمسی).
 */

import {
  d2j,
  isValidJalaaliDate,
  j2d,
  jalaaliMonthLength,
  toJalaali,
} from "jalaali-js";

const JALALI_DATE_REGEX = /^(\d{4})-(\d{2})-(\d{2})$/;

export type ParsedJalaliDate = { year: number; month: number; day: number };

export function parseJalaliDate(jalaliDate: string): ParsedJalaliDate | null {
  const m = jalaliDate.trim().match(JALALI_DATE_REGEX);
  if (!m) return null;
  const year = Number(m[1]);
  const month = Number(m[2]);
  const day = Number(m[3]);
  if (
    !Number.isInteger(year) ||
    !Number.isInteger(month) ||
    !Number.isInteger(day)
  ) {
    return null;
  }
  return { year, month, day };
}

export function formatJalaliDate(
  year: number,
  month: number,
  day: number,
): string {
  const mm = String(month).padStart(2, "0");
  const dd = String(day).padStart(2, "0");
  return `${year}-${mm}-${dd}`;
}

export function isValidJalaliDateString(jalaliDate: string): boolean {
  const p = parseJalaliDate(jalaliDate);
  if (!p) return false;
  return isValidJalaaliDate(p.year, p.month, p.day);
}

/** طول ماه شمسی (برای اعتبارسنجی دستی یا UI بعدی). */
export function getJalaliMonthLength(
  year: number,
  month: number,
): number {
  return jalaaliMonthLength(year, month);
}

export function compareJalaliDates(a: string, b: string): number {
  const pa = parseJalaliDate(a);
  const pb = parseJalaliDate(b);
  if (!pa || !pb || !isValidJalaliDateString(a) || !isValidJalaliDateString(b)) {
    throw new Error("تاریخ شمسی نامعتبر برای مقایسه.");
  }
  return j2d(pa.year, pa.month, pa.day) - j2d(pb.year, pb.month, pb.day);
}

export function diffJalaliCalendarDays(
  fromJalali: string,
  toJalali: string,
): number {
  const pf = parseJalaliDate(fromJalali);
  const pt = parseJalaliDate(toJalali);
  if (
    !pf ||
    !pt ||
    !isValidJalaliDateString(fromJalali) ||
    !isValidJalaliDateString(toJalali)
  ) {
    throw new Error("تاریخ شمسی نامعتبر برای محاسبهٔ اختلاف روز.");
  }
  return j2d(pt.year, pt.month, pt.day) - j2d(pf.year, pf.month, pf.day);
}

/**
 * تاریخ شمسی «امروز» بر اساس زمان محلی مرورگر/زمان‌سرور (برای remainingDays در UI).
 * محاسبهٔ موعد همچنان فقط با رشتهٔ شمسی کار می‌کند.
 */
export function jalaliTodayFromLocalDate(date: Date = new Date()): string {
  const gy = date.getFullYear();
  const gm = date.getMonth() + 1;
  const gd = date.getDate();
  const { jy, jm, jd } = toJalaali(gy, gm, gd);
  return formatJalaliDate(jy, jm, jd);
}

export function addDaysToJalali(jalaliDate: string, days: number): string {
  if (!Number.isFinite(days) || !Number.isInteger(days)) {
    throw new Error("تعداد روز باید عدد صحیح متناهی باشد.");
  }
  const p = parseJalaliDate(jalaliDate);
  if (!p || !isValidJalaliDateString(jalaliDate)) {
    throw new Error(
      `تاریخ شمسی نامعتبر یا خارج از محدوده: "${jalaliDate}". قالب مورد انتظار YYYY-MM-DD با ارقام لاتین است.`,
    );
  }
  const jdn = j2d(p.year, p.month, p.day) + days;
  const { jy, jm, jd } = d2j(jdn);
  return formatJalaliDate(jy, jm, jd);
}
