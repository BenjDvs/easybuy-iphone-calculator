import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type ShareQuoteDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  quoteText: string;
};

export function ShareQuoteDialog({
  open,
  onOpenChange,
  quoteText,
}: ShareQuoteDialogProps) {
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (open) setCopied(false);
  }, [open]);

  const handleManualCopy = () => {
    const el = textareaRef.current;
    if (!el) return;
    try {
      el.focus();
      el.select();
      const ok = document.execCommand("copy");
      setCopied(ok);
    } catch {
      setCopied(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg rounded-2xl">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl text-slate-900">
            Copy Quote Text
          </DialogTitle>
          <DialogDescription>
            Your browser blocked automatic clipboard access. Select the text below
            and copy it manually — it's ready to paste into WhatsApp.
          </DialogDescription>
        </DialogHeader>

        <Textarea
          ref={textareaRef}
          readOnly
          value={quoteText}
          className="h-56 resize-none rounded-xl bg-slate-50 font-mono text-xs"
          onFocus={(e) => e.currentTarget.select()}
        />

        <DialogFooter className="gap-2 sm:gap-2">
          <Button
            type="button"
            variant="outline"
            className="rounded-xl"
            onClick={handleManualCopy}
          >
            {copied ? "Copied!" : "Select & Copy"}
          </Button>
          <Button
            type="button"
            className="rounded-xl bg-emerald-600 text-white hover:bg-emerald-700"
            onClick={() => onOpenChange(false)}
          >
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}