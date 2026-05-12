"use client";

import dynamic from "next/dynamic";

const DeadlineForm = dynamic(
  () =>
    import("@/components/deadline/DeadlineForm").then((m) => m.DeadlineForm),
  {
    ssr: false,
    loading: () => (
      <div className="mt-8 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-zinc-600">در حال بارگذاری فرم…</p>
      </div>
    ),
  },
);

export function DeadlineFormClient() {
  return <DeadlineForm />;
}

