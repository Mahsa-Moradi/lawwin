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
        "rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-sm transition-shadow hover:shadow-md",
        className,
      )}
    >
      {children}
    </div>
  );
}
