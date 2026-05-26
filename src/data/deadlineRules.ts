import type { DeadlineRule } from "@/types/deadline";
import { DEADLINE_CATEGORY_GENERAL_SAMPLE } from "@/data/deadlineCategories";
import { civilProcedureRules } from "@/data/civilProcedureRules";
import { buildDurationLabel } from "@/lib/deadline/durationLabel";

function sampleRule(
  id: string,
  title: string,
  days: number,
  description: string,
): DeadlineRule {
  return {
    id,
    categoryId: DEADLINE_CATEGORY_GENERAL_SAMPLE,
    title,
    durations: [days],
    durationLabel: buildDurationLabel([days]),
    days,
    description,
    needsLegalReview: true,
    calculationMode: "simple",
  };
}

/** قوانین نمونهٔ عمومی (منطق سادهٔ قبلی). */
const generalSampleRules: readonly DeadlineRule[] = [
  sampleRule(
    "tajdid-nazar-khahi",
    "تجدیدنظرخواهی",
    20,
    "مهلت تجدیدنظرخواهی از احکام دادگاه‌های عمومی و انقلاب معمولاً بیست روز از تاریخ ابلاغ حکم محسوب می‌شود. این عدد در اینجا نمونه است؛ همیشه با متن دقیق حکم و مشاورهٔ وکیل کنترل کنید.",
  ),
  sampleRule(
    "vakhabi",
    "واخواهی",
    10,
    "واخواهی نسبت به آرایای غیرقطعی در مهلت مشخص قانونی مطرح می‌شود. مدت اینجا صرفاً برای نمونهٔ داده در اپلیکیشن است.",
  ),
  sampleRule(
    "farjam-khahi",
    "فرجام‌خواهی",
    20,
    "فرجام‌خواهی در دیوان عالی کشور مشمول مهلت‌های قانونی مشخص است. مقدار روزها در این فایل آموزشی است.",
  ),
];

export const deadlineRules: readonly DeadlineRule[] = [
  ...civilProcedureRules,
  ...generalSampleRules,
];

export function getDeadlineRulesByCategory(
  categoryId: string,
): readonly DeadlineRule[] {
  return deadlineRules.filter((r) => r.categoryId === categoryId);
}

export function getDeadlineRuleById(
  id: string,
): DeadlineRule | undefined {
  return deadlineRules.find((r) => r.id === id);
}
