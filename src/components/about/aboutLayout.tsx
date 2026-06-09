import type { ReactNode } from "react";
import { cn } from "@/components/ui/cn";
import { PageContainer } from "@/components/home/homeLayout";

export { PageContainer };

export function AboutSection({
  children,
  className,
  id,
  muted = false,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  muted?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "py-12 text-lawwin-on-navy sm:py-14",
        muted ? "bg-lawwin-navy/40" : "bg-lawwin-navy-deepest",
        className,
      )}
    >
      <PageContainer>{children}</PageContainer>
    </section>
  );
}

export function AboutSectionHeading({
  children,
  className,
  centered = true,
}: {
  children: ReactNode;
  className?: string;
  centered?: boolean;
}) {
  return (
    <h2
      className={cn(
        "text-xl font-bold text-lawwin-on-navy sm:text-2xl",
        centered && "text-center",
        className,
      )}
    >
      {children}
    </h2>
  );
}

export function AboutPremiumCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "h-full rounded-2xl border border-white/10 bg-lawwin-navy/50 p-5 shadow-lg shadow-black/25 sm:p-6",
        "transition-all duration-200 hover:border-lawwin-gold/30 hover:shadow-xl hover:shadow-lawwin-gold/10",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function AboutIconBox({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "flex size-12 items-center justify-center rounded-xl border border-lawwin-gold/30 bg-lawwin-gold/10 text-lawwin-gold sm:size-14",
        className,
      )}
      aria-hidden
    >
      {children}
    </span>
  );
}
