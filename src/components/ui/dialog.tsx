import * as React from "react";

interface DialogContextType {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DialogContext = React.createContext<DialogContextType>({
  open: false,
  onOpenChange: () => {},
});

export function Dialog({
  open,
  onOpenChange,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}) {
  if (!open) return null;
  return (
    <DialogContext.Provider value={{ open, onOpenChange }}>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
        {children}
      </div>
    </DialogContext.Provider>
  );
}

export function DialogContent({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const { onOpenChange } = React.useContext(DialogContext);
  return (
    <div
      className={`relative w-full max-w-lg rounded-xl bg-white p-5 shadow-xl max-h-[85vh] overflow-y-auto ${className}`}
    >
      <button
        type="button"
        onClick={() => onOpenChange(false)}
        aria-label="Close"
        className="absolute right-3 top-3 rounded-md px-2 py-1 text-sm text-slate-500 hover:bg-slate-100 hover:text-slate-800"
      >
        ✕
      </button>
      {children}
    </div>
  );
}

export function DialogHeader({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`mb-3 pr-6 ${className}`} {...props} />;
}

export function DialogTitle({ className = "", ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={`text-lg font-semibold text-slate-900 ${className}`} {...props} />;
}

export function DialogDescription({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={`mt-1 text-sm text-slate-500 ${className}`} {...props} />;
}

export function DialogFooter({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`mt-4 flex flex-wrap items-center justify-end gap-2 ${className}`}
      {...props}
    />
  );
}
