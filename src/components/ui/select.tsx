import * as React from "react";

interface SelectContextType {
  value: string;
  onValueChange: (value: string) => void;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  labels: Record<string, string>;
  registerLabel: (value: string, label: string) => void;
}

const SelectContext = React.createContext<SelectContextType>({
  value: "",
  onValueChange: () => {},
  open: false,
  setOpen: () => {},
  labels: {},
  registerLabel: () => {},
});

export function Select({
  value = "",
  onValueChange = () => {},
  children,
}: {
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);
  const [labels, setLabels] = React.useState<Record<string, string>>({});
  const containerRef = React.useRef<HTMLDivElement>(null);

  const registerLabel = React.useCallback((val: string, text: string) => {
    setLabels((prev) => (prev[val] === text ? prev : { ...prev, [val]: text }));
  }, []);

  React.useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [open]);

  return (
    <SelectContext.Provider
      value={{ value, onValueChange, open, setOpen, labels, registerLabel }}
    >
      <div ref={containerRef} className="relative w-full">
        {children}
      </div>
    </SelectContext.Provider>
  );
}

export function SelectTrigger({
  className = "",
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { open, setOpen } = React.useContext(SelectContext);
  return (
    <button
      type="button"
      aria-expanded={open}
      onClick={() => setOpen((prev) => !prev)}
      className={`flex min-h-[44px] w-full items-center justify-between gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-left text-sm text-slate-900 shadow-xs hover:bg-slate-50 focus:border-indigo-500 focus:outline-none ${className}`}
      {...props}
    >
      {children}
      <span className="ml-2 shrink-0 text-xs text-slate-500">{open ? "▲" : "▼"}</span>
    </button>
  );
}

export function SelectValue({ placeholder = "Select an option" }: { placeholder?: string }) {
  const { value, labels } = React.useContext(SelectContext);
  const display = value ? labels[value] || value : "";
  return (
    <span className={`truncate ${display ? "text-slate-900" : "text-slate-400"}`}>
      {display || placeholder}
    </span>
  );
}

export interface SelectContentProps extends React.HTMLAttributes<HTMLDivElement> {
  position?: "popper" | "item-aligned";
  sideOffset?: number;
}

export function SelectContent({
  className = "",
  position: _position,
  sideOffset: _sideOffset,
  children,
  ...props
}: SelectContentProps) {
  const { open } = React.useContext(SelectContext);
  if (!open) return null;
  return (
    <div
      {...props}
      className={`absolute left-0 z-50 mt-1.5 w-full min-w-[280px] sm:min-w-[340px] max-h-80 overflow-y-auto rounded-xl border border-slate-200 bg-white py-1 shadow-xl ${className}`}
    >
      {children}
    </div>
  );
}

export function SelectItem({
  value,
  className = "",
  children,
}: {
  value: string;
  className?: string;
  children: React.ReactNode;
}) {
  const { value: selectedValue, onValueChange, setOpen, registerLabel } =
    React.useContext(SelectContext);

  const textLabel = React.useMemo(() => {
    if (typeof children === "string") return children;
    if (Array.isArray(children)) {
      return children
        .map((c) => (typeof c === "string" || typeof c === "number" ? String(c) : ""))
        .join("")
        .trim();
    }
    return String(value);
  }, [children, value]);

  React.useEffect(() => {
    registerLabel(value, textLabel);
  }, [value, textLabel, registerLabel]);

  const isSelected = selectedValue === value;

  return (
    <button
      type="button"
      onClick={() => {
        onValueChange(value);
        setOpen(false);
      }}
      className={`flex w-full items-center justify-between gap-3 px-3.5 py-2.5 text-left text-sm transition ${
        isSelected
          ? "bg-indigo-50 font-semibold text-indigo-700"
          : "text-slate-800 hover:bg-slate-100"
      } ${className}`}
    >
      <span className="break-words">{children}</span>
      {isSelected && <span className="shrink-0 text-xs font-bold text-indigo-600">✓</span>}
    </button>
  );
}
