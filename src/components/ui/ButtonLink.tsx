import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "./cn";
import {
  brandOutlineButtonClassName,
  brandPrimaryButtonClassName,
} from "./brandButtonStyles";
import {
  primaryButtonClassName,
  secondaryButtonClassName,
} from "./buttonStyles";
import type { ButtonVariant } from "./Button";

export type ButtonLinkVariant = ButtonVariant | "brand" | "brandOutline";

export type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: ButtonLinkVariant;
};

const variantClasses: Record<ButtonLinkVariant, string> = {
  primary: primaryButtonClassName,
  secondary: secondaryButtonClassName,
  brand: brandPrimaryButtonClassName,
  brandOutline: brandOutlineButtonClassName,
};

export function ButtonLink({
  variant = "primary",
  className,
  ...props
}: ButtonLinkProps) {
  const variantClass = variantClasses[variant];

  return (
    <Link className={cn(variantClass, "no-underline", className)} {...props} />
  );
}
