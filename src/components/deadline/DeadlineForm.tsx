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
import { getHolidaysForCalculation } from "@/data/holidays";
import { calculateDeadline } from "@/lib/deadline/calculateDeadline";
import {
  isValidJalaliDateString,
  jalaliTodayFromLocalDate,
} from "@/lib/deadline/dateUtils";
import type { DeadlineCalculationResult } from "@/types/deadline";
import { Button } from "@/components/ui/Button";
import { JalaliDatePickerInput } from "@/components/ui/JalaliDatePickerInput";
import {
  calculatorAlertErrorClassName,
  calculatorCheckboxBoxClassName,
  calculatorDashboardPaddingClassName,
  calculatorDashboardShellClassName,
  calculatorFieldHintClassName,
  calculatorFieldLabelClassName,
  calculatorFormCardClassName,
  calculatorFormCardCompactClassName,
  calculatorInfoCalloutClassName,
  calculatorInputClassName,
  calculatorLegalReviewClassName,
  calculatorMutedBoxClassName,
} from "./calculatorStyles";
import { DeadlineResult } from "./DeadlineResult";
import { SearchableDeadlineSelect } from "./SearchableDeadlineSelect";

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

function DashboardGlow() {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(212,175,55,0.12),transparent)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -end-20 top-0 size-56 rounded-full bg-lawwin-gold/10 blur-3xl"
        aria-hidden
      />
    </>
  );
}

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
        const holidaysForRun = getHolidaysForCalculation({
          startDateJalali: trimmedStart,
        });
        const out = calculateDeadline({
          startDateJalali: trimmedStart,
          rule,
          holidays: holidaysForRun,
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

  const handleRecalculateFocus = useCallback(() => {
    const el = document.getElementById("deadline-calculator-form");
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
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

  const hasResult = result !== null;
  const formClassName = hasResult
    ? calculatorFormCardCompactClassName
    : calculatorFormCardClassName;

  const formFields = (
    <>
      {hasResult ? (
        <p className="text-xs font-semibold text-lawwin-gold">
          ویرایش ورودی‌ها و محاسبهٔ دوباره
        </p>
      ) : (
        <h2 className="text-base font-semibold text-lawwin-on-navy">
          ورودی‌های محاسبه
        </h2>
      )}
      <div
        className={`${calculatorInfoCalloutClassName}${hasResult ? " text-xs leading-relaxed" : ""}`}
      >
        {isCivilCategory ? (
          <>
            در آیین دادرسی مدنی، <strong className="text-lawwin-gold">روز ابلاغ شمرده نمی‌شود</strong> و
            شمارش از روز بعد آغاز می‌شود. تعطیلات در میانهٔ مهلت عادی محسوب
            می‌شوند؛ فقط اگر <strong className="text-lawwin-gold">روز آخر اقدام</strong> تعطیل رسمی،
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

      <div
        className={`${calculatorMutedBoxClassName}${hasResult ? " hidden sm:block" : ""}`}
      >
        تاریخ امروز (شمسی):{" "}
        <span className="font-mono font-semibold tabular-nums text-lawwin-gold" dir="ltr">
          {todayJalali || "-"}
        </span>
      </div>

      <div className="space-y-5">
        <div>
          <label htmlFor="category-id" className={calculatorFieldLabelClassName}>
            دسته‌بندی
          </label>
          <select
            id="category-id"
            name="categoryId"
            value={categoryId}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className={`${calculatorInputClassName} mt-2`}
          >
            {categoriesList.map((c) => (
              <option key={c.id} value={c.id} className="bg-lawwin-navy-deepest">
                {c.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="start-date" className={calculatorFieldLabelClassName}>
            {isCivilCategory ? "تاریخ ابلاغ (شمسی)" : "تاریخ شروع مهلت (شمسی)"}
          </label>
          <p className={calculatorFieldHintClassName}>
            فرمت: YYYY-MM-DD با ارقام لاتین، مثلاً 1405-03-04
          </p>
          <JalaliDatePickerInput
            id="start-date"
            name="startDate"
            value={startDate}
            onChange={setStartDate}
            placeholder="1405-03-04"
            className="mt-2"
            inputClassName={`${calculatorInputClassName} px-10 font-mono tabular-nums`}
          />
        </div>

        <div>
          <label htmlFor="rule-id" className={calculatorFieldLabelClassName}>
            نوع مهلت
          </label>
          <p className={calculatorFieldHintClassName}>
            در کادر زیر تایپ کنید تا از میان مهلت‌های همین دسته جستجو شود.
          </p>
          <SearchableDeadlineSelect
            id="rule-id"
            name="ruleId"
            rules={rulesForCategory}
            value={ruleId}
            onChange={setRuleId}
          />
          {selectedRule?.needsLegalReview ? (
            <p className={calculatorLegalReviewClassName}>
              این قانون برای بازبینی حقوقی علامت‌گذاری شده است؛ قبل از اقدام
              حتماً با متن قانون و وکیل تطبیق دهید.
            </p>
          ) : null}
        </div>
      </div>

      <div className={calculatorCheckboxBoxClassName}>
        <input
          id="include-holidays"
          name="includeHolidays"
          type="checkbox"
          checked={includeHolidays}
          onChange={(e) => setIncludeHolidays(e.target.checked)}
          className="mt-1 size-4 rounded border-white/30 bg-lawwin-navy-deepest text-lawwin-gold focus:ring-lawwin-gold"
        />
        <label htmlFor="include-holidays" className="text-sm text-lawwin-on-navy/90">
          {isCivilCategory
            ? "اگر روز آخر اقدام تعطیل رسمی، پنجشنبه یا جمعه باشد، به اولین روز کاری بعد منتقل شود"
            : "لحاظ تعطیلات رسمی در روز آخر مهلت (در صورت تعطیل بودن، به اولین روز غیرتعطیل منتقل می‌شود)"}
        </label>
      </div>

      {errors.length > 0 ? (
        <div role="alert" className={calculatorAlertErrorClassName}>
          <ul className="list-inside list-disc space-y-1">
            {errors.map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="flex flex-wrap items-center gap-2 border-t border-white/10 pt-5">
        <Button type="submit" variant="brand" className="min-w-[8rem]">
          محاسبه موعد
        </Button>
        {!hasResult ? (
          <Button type="button" variant="brandOutline" onClick={handleReset}>
            پاک کردن
          </Button>
        ) : null}
        <Button type="button" variant="brandOutline" onClick={handleSample}>
          نمونه تستی
        </Button>
      </div>
    </>
  );

  return (
    <div className="mt-8">
      <div className={calculatorDashboardShellClassName}>
        <DashboardGlow />
        <div className={calculatorDashboardPaddingClassName}>
          {hasResult ? (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start lg:gap-8">
              <div className="order-1 lg:col-span-8">
                <DeadlineResult
                  result={result}
                  ruleTitle={selectedRule?.title ?? ""}
                  startDateLabel={
                    isCivilCategory ? "تاریخ ابلاغ" : "تاریخ شروع"
                  }
                  onRecalculate={handleRecalculateFocus}
                  holidays={getHolidaysForCalculation({
                    startDateJalali: result.startDateJalali,
                  })}
                />
              </div>
              <form
                id="deadline-calculator-form"
                onSubmit={handleSubmit}
                className={`${formClassName} order-2 lg:col-span-4`}
                noValidate
              >
                {formFields}
              </form>
            </div>
          ) : (
            <form
              id="deadline-calculator-form"
              onSubmit={handleSubmit}
              className={formClassName}
              noValidate
            >
              {formFields}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
