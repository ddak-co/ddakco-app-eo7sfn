import * as React from "react";

import { cn } from "@/lib/utils";

type ButtonVariant = "default" | "secondary" | "outline" | "ghost";
type ButtonSize = "default" | "sm" | "lg";

function buttonClassName(
  variant: ButtonVariant = "default",
  size: ButtonSize = "default",
  className?: string
) {
  const v: Record<ButtonVariant, string> = {
    default: "bg-zinc-900 text-white shadow hover:bg-zinc-800",
    secondary: "bg-zinc-100 text-zinc-900 shadow-sm hover:bg-zinc-200",
    outline: "border border-zinc-300 bg-white shadow-sm hover:bg-zinc-50",
    ghost: "hover:bg-zinc-100",
  };
  const s: Record<ButtonSize, string> = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3 text-sm",
    lg: "h-11 rounded-md px-8 text-base",
  };
  return cn(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
    v[variant],
    s[size],
    className
  );
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** 단일 React 엘리먼트 자식일 때 className만 합쳐서 복제 (radix Slot 단순화) */
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild, children, ...props }, ref) => {
    const merged = buttonClassName(variant, size, className);
    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<{ className?: string }>;
      return React.cloneElement(child, {
        className: cn(merged, child.props.className),
      });
    }
    return (
      <button type="button" className={merged} ref={ref} {...props}>
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonClassName };
