import type { DeadlineCalculationStatus } from "@/types/deadline";
import { StatusBadge } from "@/components/ui/Badge";

type DeadlineStatusBadgeProps = {
  status: DeadlineCalculationStatus;
};

/** @deprecated ترجیحاً از `StatusBadge` در `@/components/ui/Badge` استفاده کنید. */
export function DeadlineStatusBadge({ status }: DeadlineStatusBadgeProps) {
  return <StatusBadge status={status} />;
}
