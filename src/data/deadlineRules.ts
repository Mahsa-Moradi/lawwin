import type { DeadlineRule } from "@/types/deadline";

/**
 * فهرست نمونهٔ انواع موعد — برای MVP و توسعهٔ بعدی.
 * بعداً می‌توان همین آرایه را از API جایگزین کرد؛ شکل داده ثابت بماند.
 */
export const deadlineRules: readonly DeadlineRule[] = [
  {
    id: "tajdid-nazar-khahi",
    title: "تجدیدنظرخواهی",
    days: 20,
    description:
      "مهلت تجدیدنظرخواهی از احکام دادگاه‌های عمومی و انقلاب معمولاً بیست روز از تاریخ ابلاغ حکم محسوب می‌شود. این عدد در اینجا نمونه است؛ همیشه با متن دقیق حکم و مشاورهٔ وکیل کنترل کنید.",
  },
  {
    id: "vakhabi",
    title: "واخواهی",
    days: 10,
    description:
      "واخواهی نسبت به آرایای غیرقطعی در مهلت مشخص قانونی مطرح می‌شود. مدت اینجا صرفاً برای نمونهٔ داده در اپلیکیشن است و بسته به نوع دعوا و مرجع متفاوت است.",
  },
  {
    id: "farjam-khahi",
    title: "فرجام‌خواهی",
    days: 20,
    description:
      "فرجام‌خواهی در دیوان عالی کشور مشمول مهلت‌های قانونی مشخص است. مقدار روزها در این فایل آموزشی است و جایگزین تحقیق حقوقی نیست.",
  },
];

/** جستجوی سریع بر اساس id — برای استفادهٔ بعدی در فرم/سرویس. */
export function getDeadlineRuleById(
  id: string,
): DeadlineRule | undefined {
  return deadlineRules.find((r) => r.id === id);
}
