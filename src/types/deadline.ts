/**
 * تایپ‌های مشترک موعد و تعطیلات.
 */

export type DeadlineCalculationMode = "simple" | "civil_procedure";

/** یک قانون/نوع موعد قابل انتخاب توسط کاربر. */
export type DeadlineRule = {
  id: string;
  categoryId: string;
  title: string;
  /** مدت به روز تقویمی؛ تک‌مرحله یا چندمرحله (مثلاً ۲۰ + ۲۰). */
  durations: readonly number[];
  /** برچسب نمایشی مدت، مثلاً «۲۰ روز» یا «۲۰ + ۲۰ روز». */
  durationLabel: string;
  /**
   * تعداد روز (سازگاری با منطق سادهٔ قدیمی).
   * برای قوانین جدید برابر `durations[0]` است.
   */
  days: number;
  description: string;
  sourceTitle?: string;
  sourceArticle?: string;
  /** توضیح مبدأ شمارش، مثلاً «از روز بعد از ابلاغ». */
  startsFrom?: string;
  needsLegalReview: boolean;
  calculationMode: DeadlineCalculationMode;
};

export type DeadlineCategory = {
  id: string;
  label: string;
};

/** تعطیل رسمی — `year` برای بارگذاری سالانهٔ بعدی آماده است. */
export type Holiday = {
  id: string;
  jalaliDate: string;
  title: string;
  note?: string;
  year?: number;
};

export type DeadlineCalculationInput = {
  startDateJalali: string;
  ruleId: string;
  includeHolidays: boolean;
};

export type DeadlineCalculationStatus =
  | "safe"
  | "warning"
  | "danger"
  | "expired";

export type FinalDayMoveReason =
  | "تعطیل رسمی"
  | "پنجشنبه"
  | "جمعه";

/** خروجی محاسبهٔ موعد. */
export type DeadlineCalculationResult = {
  ruleId: string;
  startDateJalali: string;
  includeHolidays: boolean;
  /** برچسب مدت از قانون انتخاب‌شده. */
  durationLabel?: string;
  /** اولین روز شمارش (روز بعد از ابلاغ در آیین دادرسی). */
  firstCountedDayJalali?: string;
  /** پایان دورهٔ شمارش قبل از جابه‌جایی روز آخر. */
  initialDeadlineJalali?: string;
  /** آخرین روز اقدام پس از اعمال قواعد روز کاری. */
  finalActionDateJalali?: string;
  /** همان `finalActionDateJalali` برای سازگاری با UI قدیمی. */
  finalDeadlineJalali: string;
  remainingDays?: number;
  status?: DeadlineCalculationStatus;
  explanation: string;
  /** مراحل توضیحی برای نمایش در «روند محاسبه». */
  calculationSteps?: readonly string[];
  movedBecauseOfHolidayOrWeekend?: boolean;
  finalDayReason?: FinalDayMoveReason;
  affectedHolidayIds: string[];
};
