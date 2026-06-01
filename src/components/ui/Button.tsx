import type { ButtonHTMLAttributes } from "react";
import { cn } from "./cn";
import { brandPrimaryButtonClassName } from "./brandButtonStyles";
import {
  primaryButtonClassName,
  secondaryButtonClassName,
} from "./buttonStyles";

export type ButtonVariant = "primary" | "secondary" | "brand";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

export function Button({
  variant = "primary",
  className,
  type = "button",
  ...props
}: ButtonProps) {
  const variantClass =
    variant === "brand"
      ? brandPrimaryButtonClassName
      : variant === "primary"
        ? primaryButtonClassName
        : secondaryButtonClassName;

  return (
    <button
      type={type}
      className={cn(variantClass, className)}
      {...props}
    />
  );
}
