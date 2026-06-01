import type { DeadlineCalculationResult } from "@/types/deadline";
import { buildCalculationTimeline } from "@/lib/deadline/buildCalculationTimeline";
import {
  formatJalaliSlash,
  toPersianDigits,
} from "@/lib/deadline/jalaliDisplay";
import type { CalculationTimelineTone } from "@/lib/deadline/buildCalculationTimeline";
import {
  calculatorPanelHeaderClassName,
  calculatorPanelHeaderTitleClassName,
  calculatorPremiumPanelClassName,
} from "./calculatorStyles";

type DeadlineCalculationTimelineProps = {
  result: DeadlineCalculationResult;
};

function TimelineIcon({
  tone,
  isFinal,
}: {
  tone: CalculationTimelineTone;
  isFinal?: boolean;
}) {
  const base =
    "flex size-8 shrink-0 items-center justify-center rounded-full ring-2 ring-lawwin-navy shadow-sm";

  const toneClass: Record<CalculationTimelineTone, string> = {
    neutral: "bg-white/10 text-lawwin-muted-on-navy ring-white/10",
    amber: "bg-lawwin-gold/20 text-lawwin-gold ring-lawwin-gold/25",
    success: "bg-emerald-600/90 text-white ring-emerald-500/30",
    move: "bg-lawwin-gold/15 text-lawwin-gold ring-lawwin-gold/20",
  };

  if (isFinal) {
    return (
      <span
        className={`${base} bg-lawwin-gold text-lawwin-navy-deepest ring-lawwin-gold/30`}
        aria-hidden
      >
        <svg
          className="size-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </span>
    );
  }

  if (tone === "amber") {
    return (
      <span className={`${base} ${toneClass.amber}`} aria-hidden>
        <svg
          className="size-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v18M5 10h14"
          />
        </svg>
      </span>
    );
  }

  if (tone === "move") {
    return (
      <span className={`${base} ${toneClass.move}`} aria-hidden>
        <svg
          className="size-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 7l5 5m0 0l-5 5m5-5H6"
          />
        </svg>
      </span>
    );
  }

  return (
    <span className={`${base} ${toneClass[tone]}`} aria-hidden>
      <svg
        className="size-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    </span>
  );
}

function dateToneClass(tone: CalculationTimelineTone, isFinal?: boolean): string {
  if (isFinal) return "text-lawwin-gold";
  if (tone === "amber") return "text-lawwin-gold/90";
  if (tone === "move") return "text-lawwin-on-navy";
  return "text-lawwin-on-navy";
}

export function DeadlineCalculationTimeline({
  result,
}: DeadlineCalculationTimelineProps) {
  const steps = buildCalculationTimeline(result);

  return (
    <div className={calculatorPremiumPanelClassName}>
      <div className={calculatorPanelHeaderClassName}>
        <span
          className="flex size-8 items-center justify-center rounded-lg bg-lawwin-gold/15 text-lawwin-gold"
          aria-hidden
        >
          <svg
            className="size-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v18M5 10h14"
            />
          </svg>
        </span>
        <h3 className={calculatorPanelHeaderTitleClassName}>روند محاسبه</h3>
      </div>

      <ol className="relative px-3 py-3.5 sm:px-4">
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;
          const dateDisplay = toPersianDigits(
            formatJalaliSlash(step.dateJalali),
          );

          return (
            <li
              key={step.id}
              className="relative flex gap-3 pb-5 last:pb-0"
            >
              {!isLast ? (
                <span
                  className="absolute start-[1.125rem] top-9 bottom-0 w-px border-s border-dashed border-lawwin-gold/35"
                  aria-hidden
                />
              ) : null}

              <TimelineIcon tone={step.tone} isFinal={step.isFinal} />

              <div className="min-w-0 flex-1 pt-0.5">
                <p className="text-sm font-semibold text-lawwin-on-navy">
                  {step.title}
                </p>
                <p
                  className={`mt-1 font-mono text-base font-bold tabular-nums sm:text-lg ${dateToneClass(step.tone, step.isFinal)}`}
                  dir="ltr"
                >
                  {dateDisplay}
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-lawwin-muted-on-navy sm:text-sm">
                  {step.description}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
