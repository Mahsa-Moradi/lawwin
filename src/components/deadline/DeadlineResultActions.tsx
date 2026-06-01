"use client";

import { Button } from "@/components/ui/Button";
import {
  calculatorActionButtonClassName,
  calculatorActionButtonGoldClassName,
  calculatorPanelHeaderClassName,
  calculatorPanelHeaderTitleClassName,
  calculatorPremiumPanelClassName,
} from "./calculatorStyles";
import { CopyResultButton } from "./CopyResultButton";
import { PrintResultButton } from "./PrintResultButton";

type DeadlineResultActionsProps = {
  copyText: string;
  printTargetId: string;
  onRecalculate: () => void;
};

export function DeadlineResultActions({
  copyText,
  printTargetId,
  onRecalculate,
}: DeadlineResultActionsProps) {
  return (
    <aside
      className={`${calculatorPremiumPanelClassName} print:hidden`}
      aria-labelledby="deadline-actions-heading"
    >
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
              d="M12 6v12m6-6H6"
            />
          </svg>
        </span>
        <h3
          id="deadline-actions-heading"
          className={calculatorPanelHeaderTitleClassName}
        >
          عملیات
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-2 p-4 sm:grid-cols-2 sm:p-5">
        <CopyResultButton
          textToCopy={copyText}
          label="کپی نتیجه"
          className={calculatorActionButtonClassName}
        />
        <PrintResultButton
          targetId={printTargetId}
          className={calculatorActionButtonGoldClassName}
        />
        <Button
          type="button"
          variant="brandOutline"
          onClick={onRecalculate}
          className="w-full sm:col-span-2"
        >
          محاسبه مجدد
        </Button>
      </div>
    </aside>
  );
}
