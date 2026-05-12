import type { DeadlineCalculationStatus } from "@/types/deadline";

type DeadlineStatusBadgeProps = {
  status: DeadlineCalculationStatus;
};

const badgeMap: Record<
  DeadlineCalculationStatus,
  { label: string; className: string }
> = {
  safe: {
    label: "هنوز فرصت دارید",
    className: "bg-emerald-100 text-emerald-800 border-emerald-200",
  },
  warning: {
    label: "موعد نزدیک است",
    className: "bg-amber-100 text-amber-800 border-amber-200",
  },
  danger: {
    label: "موعد نزدیک است",
    className: "bg-orange-100 text-orange-800 border-orange-200",
  },
  expired: {
    label: "موعد گذشته است",
    className: "bg-rose-100 text-rose-800 border-rose-200",
  },
};

export function DeadlineStatusBadge({ status }: DeadlineStatusBadgeProps) {
  const item = badgeMap[status];
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${item.className}`}
    >
      {item.label}
    </span>
  );
}
