"use client";

import type { FormEvent } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  DEADLINE_CATEGORY_CIVIL_PROCEDURE,
  deadlineCategories,
} from "@/data/deadlineCategories";
import {
  getDeadlineRuleById,
  getDeadlineRulesByCategory,
} from "@/data/deadlineRules";
import { holidays } from "@/data/holidays";
import { calculateDeadline } from "@/lib/deadline/calculateDeadline";
import {
  isValidJalaliDateString,
  jalaliTodayFromLocalDate,
} from "@/lib/deadline/dateUtils";
import type { DeadlineCalculationResult } from "@/types/deadline";
import { DeadlineResult } from "./DeadlineResult";

const STORAGE_KEY = "lawwin:deadline:lastCalculation:v2";

type StoredCalculation = {
  startDate: string;
  categoryId: string;
  ruleId: string;
  includeHolidays: boolean;
  result: DeadlineCalculationResult | null;
};

function loadStoredCalculation(): StoredCalculation | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredCalculation;
    if (
      typeof parsed.startDate !== "string" ||
      typeof parsed.categoryId !== "string" ||
      typeof parsed.ruleId !== "string" ||
      typeof parsed.includeHolidays !== "boolean"
    ) {
      return null;
    }
    return {
      startDate: parsed.startDate,
      categoryId: parsed.categoryId,
      ruleId: parsed.ruleId,
      includeHolidays: parsed.includeHolidays,
      result: parsed.result ?? null,
    };
  } catch {
    return null;
  }
}

const SAMPLE_INPUT = {
  startDate: "1405-03-04",
  categoryId: DEADLINE_CATEGORY_CIVIL_PROCEDURE,
  ruleId: "cpp-05",
  includeHolidays: true,
} as const;

export function DeadlineForm() {
  const initialStored = useMemo(() => loadStoredCalculation(), []);

  const [startDate, setStartDate] = useState(
    () => initialStored?.startDate ?? "",
  );
  const [categoryId, setCategoryId] = useState(
    () =>
      initialStored?.categoryId ?? DEADLINE_CATEGORY_CIVIL_PROCEDURE,
  );
  const [ruleId, setRuleId] = useState(() => initialStored?.ruleId ?? "");
  const [includeHolidays, setIncludeHolidays] = useState(
    () => initialStored?.includeHolidays ?? true,
  );
  const [errors, setErrors] = useState<string[]>([]);
  const [result, setResult] = useState<DeadlineCalculationResult | null>(
    () => initialStored?.result ?? null,
  );

  const categoriesList = useMemo(() => [...deadlineCategories], []);
  const todayJalali = useMemo(() => jalaliTodayFromLocalDate(), []);

  const rulesForCategory = useMemo(
    () => getDeadlineRulesByCategory(categoryId),
    [categoryId],
  );

  const selectedRule = useMemo(
    () => (ruleId ? getDeadlineRuleById(ruleId) : undefined),
    [ruleId],
  );

  const isCivilCategory =
    categoryId === DEADLINE_CATEGORY_CIVIL_PROCEDURE;

  useEffect(() => {
    if (ruleId && !rulesForCategory.some((r) => r.id === ruleId)) {
      setRuleId(rulesForCategory[0]?.id ?? "");
      setResult(null);
    }
  }, [categoryId, ruleId, rulesForCategory]);

  useEffect(() => {
    const payload: StoredCalculation = {
      startDate,
      categoryId,
      ruleId,
      includeHolidays,
      result,
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [startDate, categoryId, ruleId, includeHolidays, result]);

  const runCalculation = useCallback(
    (
      inputStartDate: string,
      inputRuleId: string,
      inputIncludeHolidays: boolean,
    ) => {
      const nextErrors: string[] = [];
      const trimmedStart = inputStartDate.trim();

      if (!trimmedStart) {
        nextErrors.push(
          isCivilCategory
            ? "تاریخ ابلاغ را وارد کنید."
            : "تاریخ شروع را وارد کنید.",
        );
      } else if (!isValidJalaliDateString(trimmedStart)) {
        nextErrors.push(
          "تاریخ نامعتبر است. قالب: YYYY-MM-DD با ارقام لاتین (مثلاً 1405-03-04).",
        );
      }

      if (!inputRuleId) {
        nextErrors.push("نوع مهلت را انتخاب کنید.");
      }

      setErrors(nextErrors);
      if (nextErrors.length > 0) {
        setResult(null);
        return;
      }

      const rule = getDeadlineRuleById(inputRuleId);
      if (!rule) {
        setErrors(["نوع مهلت یافت نشد."]);
        setResult(null);
        return;
      }

      try {
        const out = calculateDeadline({
          startDateJalali: trimmedStart,
          rule,
          holidays,
          includeHolidays: inputIncludeHolidays,
          referenceDateJalali: jalaliTodayFromLocalDate(),
        });
        setErrors([]);
        setResult(out);
      } catch (err) {
        setResult(null);
        const msg =
          err instanceof Error ? err.message : "خطا در محاسبهٔ موعد.";
        setErrors([msg]);
      }
    },
    [isCivilCategory],
  );

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      runCalculation(startDate, ruleId, includeHolidays);
    },
    [startDate, ruleId, includeHolidays, runCalculation],
  );

  const handleReset = useCallback(() => {
    setStartDate("");
    setCategoryId(DEADLINE_CATEGORY_CIVIL_PROCEDURE);
    setRuleId("");
    setIncludeHolidays(true);
    setErrors([]);
    setResult(null);
  }, []);

  const handleSample = useCallback(() => {
    setStartDate(SAMPLE_INPUT.startDate);
    setCategoryId(SAMPLE_INPUT.categoryId);
    setRuleId(SAMPLE_INPUT.ruleId);
    setIncludeHolidays(SAMPLE_INPUT.includeHolidays);
    runCalculation(
      SAMPLE_INPUT.startDate,
      SAMPLE_INPUT.ruleId,
      SAMPLE_INPUT.includeHolidays,
    );
  }, [runCalculation]);

  const handleCategoryChange = useCallback(
    (nextCategoryId: string) => {
      setCategoryId(nextCategoryId);
      const nextRules = getDeadlineRulesByCategory(nextCategoryId);
      setRuleId(nextRules[0]?.id ?? "");
      setResult(null);
    },
    [],
  );

  return (
    <div className="mt-8">
      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
        noValidate
      >
        <div className="rounded-lg border border-sky-200 bg-sky-50 px-4 py-3 text-sm leading-relaxed text-sky-950">
          {isCivilCategory ? (
            <>
              در آیین دادرسی مدنی، <strong>روز ابلاغ شمرده نمی‌شود</strong> و
              شمارش از روز بعد آغاز می‌شود. تعطیلات در میانهٔ مهلت عادی محسوب
              می‌شوند؛ فقط اگر <strong>روز آخر اقدام</strong> تعطیل رسمی،
              پنجشنبه یا جمعه باشد، به اولین روز کاری بعد منتقل می‌شود.
            </>
          ) : (
            <>
              حالت نمونهٔ عمومی: تاریخ شروع به‌علاوهٔ تعداد روز (منطق سادهٔ
              قبلی). برای قواعد آیین دادرسی، دستهٔ «آیین دادرسی مدنی» را
              انتخاب کنید.
            </>
          )}
        </div>

        <div className="rounded-lg bg-zinc-50 px-4 py-3 text-sm text-zinc-700">
          تاریخ امروز (شمسی):{" "}
          <span className="font-mono tabular-nums" dir="ltr">
            {todayJalali || "-"}
          </span>
        </div>

        <div>
          <label
            htmlFor="category-id"
            className="block text-sm font-medium text-zinc-800"
          >
            دسته‌بندی
          </label>
          <select
            id="category-id"
            name="categoryId"
            value={categoryId}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="mt-2 w-full max-w-md rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10"
          >
            {categoriesList.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="start-date"
            className="block text-sm font-medium text-zinc-800"
          >
            {isCivilCategory ? "تاریخ ابلاغ (شمسی)" : "تاریخ شروع مهلت (شمسی)"}
          </label>
          <p className="mt-1 text-xs text-zinc-500">
            فرمت: YYYY-MM-DD با ارقام لاتین، مثلاً 1405-03-04
          </p>
          <input
            id="start-date"
            name="startDate"
            type="text"
            inputMode="numeric"
            autoComplete="off"
            placeholder="1405-03-04"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="mt-2 w-full max-w-md rounded-lg border border-zinc-300 bg-white px-3 py-2 font-mono text-sm text-zinc-900 tabular-nums outline-none ring-zinc-900 focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10"
            dir="ltr"
          />
        </div>

        <div>
          <label htmlFor="rule-id" className="block text-sm font-medium text-zinc-800">
            نوع مهلت
          </label>
          <select
            id="rule-id"
            name="ruleId"
            value={ruleId}
            onChange={(e) => setRuleId(e.target.value)}
            className="mt-2 w-full max-w-md rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10"
          >
            <option value="">انتخاب کنید…</option>
            {rulesForCategory.map((r) => (
              <option key={r.id} value={r.id}>
                {r.title} ({r.durationLabel})
              </option>
            ))}
          </select>
          {selectedRule?.needsLegalReview ? (
            <p className="mt-2 text-xs text-amber-800">
              این قانون برای بازبینی حقوقی علامت‌گذاری شده است؛ قبل از اقدام
              حتماً با متن قانون و وکیل تطبیق دهید.
            </p>
          ) : null}
        </div>

        <div className="flex items-start gap-3">
          <input
            id="include-holidays"
            name="includeHolidays"
            type="checkbox"
            checked={includeHolidays}
            onChange={(e) => setIncludeHolidays(e.target.checked)}
            className="mt-1 size-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900"
          />
          <label htmlFor="include-holidays" className="text-sm text-zinc-800">
            {isCivilCategory
              ? "اگر روز آخر اقدام تعطیل رسمی، پنجشنبه یا جمعه باشد، به اولین روز کاری بعد منتقل شود"
              : "لحاظ تعطیلات رسمی در روز آخر مهلت (در صورت تعطیل بودن، به اولین روز غیرتعطیل منتقل می‌شود)"}
          </label>
        </div>

        {errors.length > 0 ? (
          <div
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
          >
            <ul className="list-inside list-disc space-y-1">
              {errors.map((err) => (
                <li key={err}>{err}</li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="submit"
            className="rounded-xl bg-zinc-900 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
          >
            محاسبه
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="rounded-xl border border-zinc-300 bg-white px-6 py-2.5 text-sm font-semibold text-zinc-800 transition-colors hover:bg-zinc-100"
          >
            محاسبه مجدد
          </button>
          <button
            type="button"
            onClick={handleSample}
            className="rounded-xl border border-zinc-300 bg-white px-6 py-2.5 text-sm font-semibold text-zinc-800 transition-colors hover:bg-zinc-100"
          >
            نمونه تستی
          </button>
        </div>
      </form>

      {result ? <DeadlineResult result={result} holidays={holidays} /> : null}
    </div>
  );
}
