import * as React from "react";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className = "", type = "text", ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={`flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none disabled:opacity-50 ${className}`}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
