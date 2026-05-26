import type { DeadlineCategory } from "@/types/deadline";

export const DEADLINE_CATEGORY_GENERAL_SAMPLE = "general-sample";
export const DEADLINE_CATEGORY_CIVIL_PROCEDURE = "civil-procedure";

export const deadlineCategories: readonly DeadlineCategory[] = [
  {
    id: DEADLINE_CATEGORY_CIVIL_PROCEDURE,
    label: "آیین دادرسی مدنی",
  },
  {
    id: DEADLINE_CATEGORY_GENERAL_SAMPLE,
    label: "نمونه عمومی",
  },
];

export function getDeadlineCategoryById(
  id: string,
): DeadlineCategory | undefined {
  return deadlineCategories.find((c) => c.id === id);
}
