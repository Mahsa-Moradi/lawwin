"use client";

import dynamic from "next/dynamic";

const DeadlineForm = dynamic(
  () =>
    import("@/components/deadline/DeadlineForm").then((m) => m.DeadlineForm),
  {
    ssr: false,
    loading: () => (
      <div className="mt-8 rounded-2xl border border-white/10 bg-lawwin-navy p-6 shadow-xl shadow-black/30">
        <p className="text-sm text-lawwin-muted-on-navy">در حال بارگذاری فرم…</p>
      </div>
    ),
  },
);

export function DeadlineFormClient() {
  return <DeadlineForm />;
}

