import { toGregorian } from "jalaali-js";
import { parseJalaliDate } from "./dateUtils";

/** ۰=یکشنبه … ۶=شنبه (مطابق Date.getDay در زمان محلی). */
export function getGregorianWeekdayIndex(jalaliDate: string): number {
  const p = parseJalaliDate(jalaliDate);
  if (!p) {
    throw new Error(`تاریخ شمسی نامعتبر: "${jalaliDate}"`);
  }
  const { gy, gm, gd } = toGregorian(p.year, p.month, p.day);
  const date = new Date(gy, gm - 1, gd);
  return date.getDay();
}
