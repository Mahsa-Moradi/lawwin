"use client";

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
      className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm print:hidden"
      aria-labelledby="deadline-actions-heading"
    >
      <div className="border-b border-zinc-200 bg-zinc-50 px-4 py-3 sm:px-5">
        <h3
          id="deadline-actions-heading"
          className="text-sm font-semibold text-zinc-900"
        >
          عملیات
        </h3>
      </div>

      <div className="flex flex-col gap-2 p-4 sm:p-5">
        <CopyResultButton
          textToCopy={copyText}
          label="کپی نتیجه"
          className="w-full justify-center rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm font-semibold text-zinc-800 hover:bg-zinc-100"
        />
        <PrintResultButton
          targetId={printTargetId}
          className="w-full justify-center rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-900 hover:bg-amber-100"
        />
        <button
          type="button"
          onClick={onRecalculate}
          className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm font-semibold text-zinc-800 transition-colors hover:bg-zinc-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
        >
          محاسبه مجدد
        </button>
      </div>
    </aside>
  );
}
