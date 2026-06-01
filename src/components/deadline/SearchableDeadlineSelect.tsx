"use client";

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { filterDeadlineRules } from "@/lib/deadline/filterDeadlineRules";
import type { DeadlineRule } from "@/types/deadline";

export type SearchableDeadlineSelectProps = {
  id: string;
  name: string;
  rules: readonly DeadlineRule[];
  value: string;
  onChange: (ruleId: string) => void;
};

export function SearchableDeadlineSelect({
  id,
  name,
  rules,
  value,
  onChange,
}: SearchableDeadlineSelectProps) {
  const listboxId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);

  const selectedRule = useMemo(
    () => rules.find((r) => r.id === value),
    [rules, value],
  );

  const filteredRules = useMemo(
    () => filterDeadlineRules(rules, query),
    [rules, query],
  );

  const displayValue =
    isOpen || query.length > 0
      ? query
      : selectedRule
        ? `${selectedRule.title} (${selectedRule.durationLabel})`
        : "";

  const closeList = useCallback(() => {
    setIsOpen(false);
    setQuery("");
    setActiveIndex(-1);
  }, []);

  const selectRule = useCallback(
    (rule: DeadlineRule) => {
      onChange(rule.id);
      closeList();
      inputRef.current?.blur();
    },
    [onChange, closeList],
  );

  useEffect(() => {
    if (!isOpen) return;

    const onPointerDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        closeList();
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [isOpen, closeList]);

  useEffect(() => {
    setActiveIndex(-1);
  }, [query, rules]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      closeList();
      return;
    }

    if (!isOpen && (e.key === "ArrowDown" || e.key === "Enter")) {
      setIsOpen(true);
      return;
    }

    if (!isOpen || filteredRules.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % filteredRules.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) =>
        i <= 0 ? filteredRules.length - 1 : i - 1,
      );
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      const rule = filteredRules[activeIndex];
      if (rule) selectRule(rule);
    }
  };

  return (
    <div ref={rootRef} className="relative mt-2 w-full max-w-md">
      <input type="hidden" name={name} value={value} />

      <input
        ref={inputRef}
        id={id}
        type="search"
        role="combobox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-autocomplete="list"
        autoComplete="off"
        value={displayValue}
        placeholder="جستجو… مثلاً تجدیدنظر، واخواهی، فرجام"
        onFocus={() => setIsOpen(true)}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(true);
        }}
        onKeyDown={handleKeyDown}
        className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10"
      />

      {isOpen ? (
        <ul
          id={listboxId}
          role="listbox"
          aria-label="فهرست انواع مهلت"
          className="absolute inset-x-0 top-full z-20 mt-1 max-h-60 overflow-y-auto rounded-xl border border-zinc-200 bg-white py-1 shadow-lg"
        >
          {filteredRules.length === 0 ? (
            <li className="px-4 py-3 text-sm leading-relaxed text-zinc-500">
              نتیجه‌ای یافت نشد. عبارت دیگری امتحان کنید یا دستهٔ دیگری را
              انتخاب کنید.
            </li>
          ) : (
            filteredRules.map((rule, index) => {
              const isSelected = rule.id === value;
              const isActive = index === activeIndex;
              return (
                <li key={rule.id} role="presentation">
                  <button
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => selectRule(rule)}
                    className={`w-full px-4 py-2.5 text-start text-sm transition-colors ${
                      isActive || isSelected
                        ? "bg-zinc-100 text-zinc-900"
                        : "text-zinc-800 hover:bg-zinc-50"
                    }`}
                  >
                    <span className="block font-medium">{rule.title}</span>
                    <span className="mt-0.5 block text-xs text-zinc-500">
                      {rule.durationLabel}
                    </span>
                  </button>
                </li>
              );
            })
          )}
        </ul>
      ) : null}
    </div>
  );
}
