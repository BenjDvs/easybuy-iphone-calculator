import * as React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "outline";
}

export function Badge({ className = "", variant = "default", ...props }: BadgeProps) {
  const styles: Record<string, string> = {
    default: "bg-indigo-100 text-indigo-800",
    secondary: "bg-slate-100 text-slate-800",
    outline: "border border-slate-300 text-slate-700",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[variant] || styles.default} ${className}`}
      {...props}
    />
  );
}
