"use client";

import dynamic from "next/dynamic";

const DeadlineForm = dynamic(
  () =>
    import("@/components/deadline/DeadlineForm").then((m) => m.DeadlineForm),
  {
    ssr: false,
    loading: () => (
      <div className="mt-10 rounded-2xl border border-zinc-200/90 bg-white p-6 shadow-sm shadow-zinc-900/5">
        <p className="text-sm text-zinc-600">در حال بارگذاری فرم…</p>
      </div>
    ),
  },
);

export function DeadlineFormClient() {
  return <DeadlineForm />;
}

