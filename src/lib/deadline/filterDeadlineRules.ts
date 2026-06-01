import type { DeadlineRule } from "@/types/deadline";

/** نرمال‌سازی ساده برای جستجوی فارسی (حذف فاصلهٔ اضافه و نیم‌فاصله). */
export function normalizeSearchText(text: string): string {
  return text.trim().replace(/\u200c/g, "").replace(/\s+/g, " ");
}

/** فیلتر قوانین بر اساس عنوان و برچسب مدت. */
export function filterDeadlineRules(
  rules: readonly DeadlineRule[],
  query: string,
): readonly DeadlineRule[] {
  const normalizedQuery = normalizeSearchText(query);
  if (!normalizedQuery) return rules;

  return rules.filter((rule) => {
    const haystack = normalizeSearchText(`${rule.title} ${rule.durationLabel}`);
    return haystack.includes(normalizedQuery);
  });
}
