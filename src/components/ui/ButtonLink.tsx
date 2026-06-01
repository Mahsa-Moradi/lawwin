import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "./cn";
import {
  primaryButtonClassName,
  secondaryButtonClassName,
} from "./buttonStyles";
import type { ButtonVariant } from "./Button";

export type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: ButtonVariant;
};

export function ButtonLink({
  variant = "primary",
  className,
  ...props
}: ButtonLinkProps) {
  const variantClass =
    variant === "primary"
      ? primaryButtonClassName
      : secondaryButtonClassName;

  return (
    <Link className={cn(variantClass, "no-underline", className)} {...props} />
  );
}
