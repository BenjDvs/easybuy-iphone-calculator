import * as React from "react";

export function Separator({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`h-[1px] w-full bg-slate-200 my-2 ${className}`} {...props} />;
}
