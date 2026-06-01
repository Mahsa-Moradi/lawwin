import type { ReactNode } from "react";
import { cn } from "@/components/ui/cn";

export function PageContainer({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6", className)}>
      {children}
    </div>
  );
}

export function SectionLight({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("py-14 sm:py-16", className)}>
      <PageContainer>{children}</PageContainer>
    </section>
  );
}

export function SectionMuted({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn("bg-zinc-100/80 py-14 sm:py-16", className)}
    >
      <PageContainer>{children}</PageContainer>
    </section>
  );
}

export function SectionDark({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "bg-lawwin-navy-deepest py-14 text-lawwin-on-navy sm:py-16",
        className,
      )}
    >
      <PageContainer>{children}</PageContainer>
    </section>
  );
}

export function PremiumCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-sm",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** کارت ویژگی — سایه و hover premium */
export function FeaturePremiumCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group h-full rounded-2xl border border-zinc-200/90 bg-white p-6 shadow-sm shadow-zinc-900/5 transition-all duration-200 sm:p-7",
        "hover:-translate-y-1 hover:border-lawwin-gold/35 hover:shadow-lg hover:shadow-lawwin-gold/10",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** کارت میانبر موعد — قابل کلیک */
export function DeadlineActionCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200/90 bg-white p-5 shadow-sm shadow-zinc-900/5 transition-all duration-200",
        "hover:-translate-y-1 hover:border-lawwin-gold/50 hover:shadow-xl hover:shadow-lawwin-gold/15",
        "focus-within:ring-2 focus-within:ring-lawwin-gold/40",
        className,
      )}
    >
      <span
        className="absolute inset-y-0 start-0 w-1 bg-lawwin-gold/0 transition-colors duration-200 group-hover:bg-lawwin-gold"
        aria-hidden
      />
      {children}
    </div>
  );
}
