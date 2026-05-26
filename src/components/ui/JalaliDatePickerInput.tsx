"use client";

import { useMemo, useRef, useState } from "react";
import DatePicker, { type DateObject as DateObjectType } from "react-multi-date-picker";
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { isValidJalaliDateString, parseJalaliDate } from "@/lib/deadline/dateUtils";

function toLatinDigits(input: string): string {
  const map: Record<string, string> = {
    "۰": "0",
    "۱": "1",
    "۲": "2",
    "۳": "3",
    "۴": "4",
    "۵": "5",
    "۶": "6",
    "۷": "7",
    "۸": "8",
    "۹": "9",
    "٠": "0",
    "١": "1",
    "٢": "2",
    "٣": "3",
    "٤": "4",
    "٥": "5",
    "٦": "6",
    "٧": "7",
    "٨": "8",
    "٩": "9",
  };
  return input.replace(/[۰-۹٠-٩]/g, (d) => map[d] ?? d);
}

function jalaliStringToDateObject(value: string): DateObjectType | null {
  if (!value) return null;
  const latin = toLatinDigits(value.trim());
  if (!isValidJalaliDateString(latin)) return null;
  const p = parseJalaliDate(latin);
  if (!p) return null;
  return new DateObject({
    calendar: persian,
    locale: persian_fa,
    year: p.year,
    month: p.month,
    day: p.day,
  });
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M8 3v2M16 3v2M4.5 8.5h15M6 6h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export type JalaliDatePickerInputProps = {
  id: string;
  name: string;
  value: string;
  onChange: (nextValue: string) => void;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  disabled?: boolean;
};

/**
 * ورودی تاریخ شمسی با DatePicker.
 * - مقدار داخلی: `YYYY-MM-DD` با ارقام لاتین
 * - نمایش/تقویم: جلالی/فارسی (RTL)
 */
export function JalaliDatePickerInput({
  id,
  name,
  value,
  onChange,
  placeholder,
  className,
  inputClassName,
  disabled,
}: JalaliDatePickerInputProps) {
  const pickerRef = useRef<{ openCalendar: () => void } | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const dateValue = useMemo(() => jalaliStringToDateObject(value), [value]);

  return (
    <div className={className}>
      <div className="relative w-full max-w-md">
        <button
          type="button"
          onClick={() => pickerRef.current?.openCalendar()}
          disabled={disabled}
          className="absolute inset-y-0 left-0 flex items-center justify-center px-3 text-zinc-500 hover:text-zinc-700 disabled:opacity-50"
          aria-label="باز کردن تقویم"
        >
          <CalendarIcon className="size-5" />
        </button>

        <DatePicker
          ref={pickerRef as never}
          calendar={persian}
          locale={persian_fa}
          format="YYYY-MM-DD"
          value={dateValue ?? ""}
          onOpen={() => setIsOpen(true)}
          onClose={() => setIsOpen(false)}
          onChange={(date) => {
            const d = date as DateObjectType | null;
            if (!d) {
              onChange("");
              return;
            }
            const next = toLatinDigits(d.format?.("YYYY-MM-DD") ?? "");
            onChange(next);
          }}
          editable
          inputMode="numeric"
          portal
          mobileLabels={{
            OK: "تأیید",
            CANCEL: "انصراف",
          }}
          render={(
            inputValue,
            openCalendar,
          ) => (
            <input
              id={id}
              name={name}
              type="text"
              autoComplete="off"
              placeholder={placeholder}
              value={value}
              disabled={disabled}
              onFocus={() => openCalendar()}
              onClick={() => openCalendar()}
              onChange={(e) => {
                const next = toLatinDigits(e.target.value);
                onChange(next);
              }}
              className={
                inputClassName ??
                "mt-2 w-full rounded-lg border border-zinc-300 bg-white px-10 py-2 font-mono text-sm text-zinc-900 tabular-nums outline-none ring-zinc-900 focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10"
              }
              dir="ltr"
              aria-expanded={isOpen}
            />
          )}
        />
      </div>
    </div>
  );
}

