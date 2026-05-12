/**
 * تایپ‌های مشترک موعد و تعطیلات.
 * ورودی/خروجی محاسبهٔ بعدی این‌جا تعریف می‌شود؛ منطق محاسبه در فاز جداگانه است.
 */

/** یک قانون/نوع موعد قابل انتخاب توسط کاربر (قابل جایگزینی با API). */
export type DeadlineRule = {
  id: string;
  title: string;
  /** تعداد روز مهلت (طبق قانون انتخاب‌شده؛ نمونه‌ها آموزشی‌اند). */
  days: number;
  description: string;
};

/** تعطیل رسمی (قابل جایگزینی با API/دیتابیس). */
export type Holiday = {
  id: string;
  /**
   * تاریخ شمسی به شکل `YYYY-MM-DD` (ارقام لاتین برای یکنواختی در کد).
   * مثال: `1404-01-01` = فروردین ۱
   */
  jalaliDate: string;
  title: string;
  /** توضیح اختیاری برای ویرایش‌کنندهٔ انسانی */
  note?: string;
};

/** ورودی تابع محاسبهٔ موعد در فازهای بعدی. */
export type DeadlineCalculationInput = {
  /** تاریخ شروع مهلت (مثلاً ابلاغ) به شکل شمسی `YYYY-MM-DD`. */
  startDateJalali: string;
  /** باید با `DeadlineRule.id` در `deadlineRules` هم‌خوان باشد. */
  ruleId: string;
  /** آیا روزهای تعطیل رسمی در محاسبه لحاظ شوند. */
  includeHolidays: boolean;
};

/** وضعیت نمایشی موعد (در UI بعداً استفاده می‌شود). */
export type DeadlineCalculationStatus =
  | "safe"
  | "warning"
  | "danger"
  | "expired";

/** خروجی محاسبهٔ موعد؛ فعلاً فقط قرارداد داده است، محاسبه‌ای انجام نشده. */
export type DeadlineCalculationResult = {
  ruleId: string;
  startDateJalali: string;
  includeHolidays: boolean;
  /** مهلت اولیه قبل از جابه‌جایی به روز کاری (در فاز محاسبه پر می‌شود). */
  initialDeadlineJalali?: string;
  /** آخرین روز اقدام پس از اعمال قواعد تعطیل و ... */
  finalDeadlineJalali: string;
  /** تعداد روز باقی‌مانده تا `finalDeadlineJalali` (نسبت به «امروز» در لایهٔ بالاتر). */
  remainingDays?: number;
  status?: DeadlineCalculationStatus;
  /** توضیح خط‌به‌خط برای کاربر (فارسی، قابل ویرایش در لایهٔ داده/سرویس). */
  explanation: string;
  /** شناسهٔ تعطیلاتی که در نتیجه اثر گذاشته‌اند (ارجاع به `Holiday.id`). */
  affectedHolidayIds: string[];
};
