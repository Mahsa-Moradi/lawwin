"use client";

import type { FormEvent } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { deadlineRules, getDeadlineRuleById } from "@/data/deadlineRules";
import { holidays } from "@/data/holidays";
import { calculateDeadline } from "@/lib/deadline/calculateDeadline";
import {
  isValidJalaliDateString,
  jalaliTodayFromLocalDate,
} from "@/lib/deadline/dateUtils";
import type { DeadlineCalculationResult } from "@/types/deadline";
import { DeadlineResult } from "./DeadlineResult";

const STORAGE_KEY = "lawwin:deadline:lastCalculation:v1";

type StoredCalculation = {
  startDate: string;
  ruleId: string;
  includeHolidays: boolean;
  result: DeadlineCalculationResult | null;
};

const SAMPLE_INPUT = {
  startDate: "1404-01-10",
  ruleId: "tajdid-nazar-khahi",
  includeHolidays: true,
} as const;

export function DeadlineForm() {
  const [startDate, setStartDate] = useState("");
  const [ruleId, setRuleId] = useState("");
  const [includeHolidays, setIncludeHolidays] = useState(true);
  const [errors, setErrors] = useState<string[]>([]);
  const [result, setResult] = useState<DeadlineCalculationResult | null>(null);
  const [todayJalali, setTodayJalali] = useState<string>("");
  const [isHydrated, setIsHydrated] = useState(false);

  const rulesList = useMemo(() => [...deadlineRules], []);

  useEffect(() => {
    const today = jalaliTodayFromLocalDate();
    setTodayJalali(today);

    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        setIsHydrated(true);
        return;
      }
      const parsed = JSON.parse(raw) as StoredCalculation;
      if (typeof parsed.startDate === "string") setStartDate(parsed.startDate);
      if (typeof parsed.ruleId === "string") setRuleId(parsed.ruleId);
      if (typeof parsed.includeHolidays === "boolean") {
        setIncludeHolidays(parsed.includeHolidays);
      }
      if (parsed.result) setResult(parsed.result);
    } catch {
      // نادیده گرفتن خطاهای localStorage یا JSON
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    const payload: StoredCalculation = {
      startDate,
      ruleId,
      includeHolidays,
      result,
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [startDate, ruleId, includeHolidays, result, isHydrated]);

  const runCalculation = useCallback(
    (inputStartDate: string, inputRuleId: string, inputIncludeHolidays: boolean) => {
      const nextErrors: string[] = [];
      const trimmedStart = inputStartDate.trim();

      if (!trimmedStart) {
        nextErrors.push("تاریخ شروع را وارد کنید.");
      } else if (!isValidJalaliDateString(trimmedStart)) {
        nextErrors.push(
          "تاریخ شروع نامعتبر است. قالب: YYYY-MM-DD با ارقام لاتین (مثلاً 1404-01-15).",
        );
      }

      if (!inputRuleId) {
        nextErrors.push("نوع موعد را انتخاب کنید.");
      }

      setErrors(nextErrors);
      if (nextErrors.length > 0) {
        setResult(null);
        return;
      }

      const rule = getDeadlineRuleById(inputRuleId);
      if (!rule) {
        setErrors(["نوع موعد یافت نشد."]);
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
    [],
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
    setRuleId("");
    setIncludeHolidays(true);
    setErrors([]);
    setResult(null);
  }, []);

  const handleSample = useCallback(() => {
    setStartDate(SAMPLE_INPUT.startDate);
    setRuleId(SAMPLE_INPUT.ruleId);
    setIncludeHolidays(SAMPLE_INPUT.includeHolidays);
    runCalculation(
      SAMPLE_INPUT.startDate,
      SAMPLE_INPUT.ruleId,
      SAMPLE_INPUT.includeHolidays,
    );
  }, [runCalculation]);

  return (
    <div className="mt-8">
      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
        noValidate
      >
        <div className="rounded-lg bg-zinc-50 px-4 py-3 text-sm text-zinc-700">
          تاریخ امروز (شمسی):{" "}
          <span className="font-mono tabular-nums" dir="ltr">
            {todayJalali || "-"}
          </span>
        </div>

        <div>
          <label htmlFor="start-date" className="block text-sm font-medium text-zinc-800">
            تاریخ شروع مهلت (شمسی)
          </label>
          <p className="mt-1 text-xs text-zinc-500">
            فرمت: YYYY-MM-DD با ارقام لاتین، مثلاً 1404-06-10
          </p>
          <input
            id="start-date"
            name="startDate"
            type="text"
            inputMode="numeric"
            autoComplete="off"
            placeholder="1404-01-01"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="mt-2 w-full max-w-md rounded-lg border border-zinc-300 bg-white px-3 py-2 font-mono text-sm text-zinc-900 tabular-nums outline-none ring-zinc-900 focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10"
            dir="ltr"
          />
        </div>

        <div>
          <label htmlFor="rule-id" className="block text-sm font-medium text-zinc-800">
            نوع موعد
          </label>
          <select
            id="rule-id"
            name="ruleId"
            value={ruleId}
            onChange={(e) => setRuleId(e.target.value)}
            className="mt-2 w-full max-w-md rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10"
          >
            <option value="">انتخاب کنید…</option>
            {rulesList.map((r) => (
              <option key={r.id} value={r.id}>
                {r.title} ({r.days} روز)
              </option>
            ))}
          </select>
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
            لحاظ تعطیلات رسمی در روز آخر مهلت (در صورت تعطیل بودن، به اولین روز غیرتعطیل منتقل می‌شود)
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
