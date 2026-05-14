import * as React from "react";

import { cn } from "@/lib/utils";

export type BadgeVariant = "default" | "secondary" | "outline" | "destructive";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant;
}

function badgeClassName(variant: BadgeVariant = "default", className?: string) {
  const v: Record<BadgeVariant, string> = {
    default: "border-transparent bg-zinc-900 text-white hover:bg-zinc-800",
    secondary: "border-transparent bg-zinc-100 text-zinc-900 hover:bg-zinc-200",
    outline: "text-zinc-950 border-zinc-300",
    destructive: "border-transparent bg-red-600 text-white hover:bg-red-700",
  };
  return cn(
    "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2",
    v[variant],
    className
  );
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return <div className={badgeClassName(variant, className)} {...props} />;
}

export { Badge, badgeClassName };
