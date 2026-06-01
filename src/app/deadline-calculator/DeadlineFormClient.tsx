"use client";

import dynamic from "next/dynamic";

const DeadlineForm = dynamic(
  () =>
    import("@/components/deadline/DeadlineForm").then((m) => m.DeadlineForm),
  {
    ssr: false,
    loading: () => (
      <div className="mt-5 rounded-xl border border-white/10 bg-lawwin-navy p-4 shadow-lg shadow-black/25">
        <p className="text-sm text-lawwin-muted-on-navy">در حال بارگذاری فرم…</p>
      </div>
    ),
  },
);

export function DeadlineFormClient() {
  return <DeadlineForm />;
}

