import { toGregorian } from "jalaali-js";
import { parseJalaliDate } from "./dateUtils";

const WEEKDAY_FA = [
  "یکشنبه",
  "دوشنبه",
  "سه‌شنبه",
  "چهارشنبه",
  "پنجشنبه",
  "جمعه",
  "شنبه",
] as const;

const PERSIAN_DIGITS = "۰۱۲۳۴۵۶۷۸۹";

export function toPersianDigits(value: string | number): string {
  return String(value).replace(/\d/g, (d) => PERSIAN_DIGITS[Number(d)]!);
}

/** تاریخ شمسی با جداکنندهٔ اسلش برای نمایش: 1405/03/10 */
export function formatJalaliSlash(jalaliDate: string): string {
  const p = parseJalaliDate(jalaliDate);
  if (!p) return jalaliDate;
  const y = String(p.year).padStart(4, "0");
  const m = String(p.month).padStart(2, "0");
  const d = String(p.day).padStart(2, "0");
  return `${y}/${m}/${d}`;
}

export function getJalaliWeekdayName(jalaliDate: string): string {
  const p = parseJalaliDate(jalaliDate);
  if (!p) return "";
  const { gy, gm, gd } = toGregorian(p.year, p.month, p.day);
  const date = new Date(gy, gm - 1, gd);
  return WEEKDAY_FA[date.getDay()] ?? "";
}

export function formatJalaliLong(
  jalaliDate: string,
  options?: { persianDigits?: boolean },
): string {
  const slash = formatJalaliSlash(jalaliDate);
  const weekday = getJalaliWeekdayName(jalaliDate);
  const datePart = options?.persianDigits ? toPersianDigits(slash) : slash;
  return weekday ? `${weekday} ${datePart}` : datePart;
}

export function formatDeadlineDayBeginning(jalaliDate: string): string {
  return `ابتدای روز ${formatJalaliLong(jalaliDate, { persianDigits: true })}`;
}

export function formatDeadlineDayEnd(jalaliDate: string): string {
  return `پایان روز ${formatJalaliLong(jalaliDate, { persianDigits: true })}`;
}
