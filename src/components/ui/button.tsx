import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "destructive" | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "default", type = "button", ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition focus:outline-none disabled:opacity-50 disabled:pointer-events-none cursor-pointer";
    const variants: Record<string, string> = {
      default: "bg-indigo-600 text-white hover:bg-indigo-700",
      outline: "border border-slate-300 bg-white text-slate-800 hover:bg-slate-50",
      ghost: "text-slate-700 hover:bg-slate-100",
      destructive: "bg-red-600 text-white hover:bg-red-700",
      secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200",
    };
    const sizes: Record<string, string> = {
      default: "h-10 px-4 py-2 text-sm",
      sm: "h-8 px-3 text-xs",
      lg: "h-11 px-6 text-base",
      icon: "h-9 w-9",
    };
    return (
      <button
        ref={ref}
        type={type}
        className={`${base} ${variants[variant] || variants.default} ${sizes[size] || sizes.default} ${className}`}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
