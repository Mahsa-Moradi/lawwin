import type { ReactNode } from "react";
import { cn } from "./cn";

export type SectionHeadingProps = {
  children: ReactNode;
  id?: string;
  className?: string;
  centered?: boolean;
};

/** عنوان بخش‌های صفحه — `text-lg font-semibold` */
export function SectionHeading({
  children,
  id,
  className,
  centered = false,
}: SectionHeadingProps) {
  return (
    <h2
      id={id}
      className={cn(
        "text-lg font-semibold text-zinc-900",
        centered && "text-center",
        className,
      )}
    >
      {children}
    </h2>
  );
}
