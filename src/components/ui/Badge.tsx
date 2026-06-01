import type { ReactNode } from "react";
import type { DeadlineCalculationStatus } from "@/types/deadline";
import { cn } from "./cn";

export type BadgeVariant =
  | "status-safe"
  | "status-warning"
  | "status-danger"
  | "status-expired"
  | "trust"
  | "neutral";

const statusLabels: Record<DeadlineCalculationStatus, string> = {
  safe: "هنوز فرصت دارید",
  warning: "موعد نزدیک است",
  danger: "موعد نزدیک است",
  expired: "موعد گذشته است",
};

const variantClassName: Record<BadgeVariant, string> = {
  "status-safe": "rounded-full border bg-emerald-100 text-emerald-800 border-emerald-200",
  "status-warning":
    "rounded-full border bg-amber-100 text-amber-800 border-amber-200",
  "status-danger":
    "rounded-full border bg-orange-100 text-orange-800 border-orange-200",
  "status-expired":
    "rounded-full border bg-rose-100 text-rose-800 border-rose-200",
  trust:
    "rounded-full border border-zinc-200 bg-zinc-50 text-zinc-800",
  neutral: "rounded-lg bg-zinc-100 text-zinc-700 border-transparent",
};

export function statusToBadgeVariant(
  status: DeadlineCalculationStatus,
): BadgeVariant {
  switch (status) {
    case "expired":
      return "status-expired";
    case "danger":
      return "status-danger";
    case "warning":
      return "status-warning";
    case "safe":
    default:
      return "status-safe";
  }
}

export type BadgeProps = {
  variant: BadgeVariant;
  children?: ReactNode;
  className?: string;
  icon?: ReactNode;
};

export function Badge({ variant, children, className, icon }: BadgeProps) {
  const sizeClass =
    variant === "trust" || variant === "neutral"
      ? "px-3 py-2 font-medium"
      : "px-2.5 py-1 font-semibold";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-xs",
        sizeClass,
        variantClassName[variant],
        className,
      )}
    >
      {icon ? (
        <span className="shrink-0" aria-hidden>
          {icon}
        </span>
      ) : null}
      {children}
    </span>
  );
}

export function StatusBadge({
  status,
  className,
}: {
  status: DeadlineCalculationStatus;
  className?: string;
}) {
  return (
    <Badge variant={statusToBadgeVariant(status)} className={className}>
      {statusLabels[status]}
    </Badge>
  );
}

function TrustCheckIcon() {
  return (
    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-800">
      ✓
    </span>
  );
}

export function TrustBadge({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <Badge variant="trust" icon={<TrustCheckIcon />} className={className}>
      {children}
    </Badge>
  );
}
