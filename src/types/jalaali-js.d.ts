/** اعلان‌های سبک برای jalaali-js (پکیج تایپ رسمی ندارد). */
declare module "jalaali-js" {
  export function toJalaali(
    gy: number,
    gm: number,
    gd: number,
  ): { jy: number; jm: number; jd: number };
  export function j2d(jy: number, jm: number, jd: number): number;
  export function d2j(jdn: number): { jy: number; jm: number; jd: number };
  export function isValidJalaaliDate(
    jy: number,
    jm: number,
    jd: number,
  ): boolean;
  export function jalaaliMonthLength(jy: number, jm: number): number;
}
