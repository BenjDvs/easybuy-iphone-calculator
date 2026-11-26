import { useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ALL_CASH_PRICE_ROWS } from "@/data/models";
import { formatNaira } from "@/lib/calc";
import { Search } from "lucide-react";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function CashPriceModal({ open, onOpenChange }: Props) {
  const [query, setQuery] = useState("");

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ALL_CASH_PRICE_ROWS;
    return ALL_CASH_PRICE_ROWS.filter((r) => r.name.toLowerCase().includes(q));
  }, [query]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] w-full max-w-2xl overflow-hidden p-0">
        <DialogHeader className="border-b border-indigo-100 px-4 py-4 text-left sm:px-5">
          <DialogTitle className="font-serif text-lg text-indigo-950">
            Immediate Cash Prices
          </DialogTitle>
          <DialogDescription className="text-xs leading-relaxed text-muted-foreground">
            Save ₦5,000 when you pay cash immediately. EasyBuy installments apply strictly
            to iPhone 11 and above.
          </DialogDescription>
          <div className="relative mt-3">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search iPhone model..."
              className="min-h-[44px] pl-9"
            />
          </div>
        </DialogHeader>

        <div className="max-h-[55vh] overflow-y-auto px-4 py-3 sm:px-5">
          <div className="space-y-2">
            {rows.map((r) => (
              <div
                key={r.id}
                className="flex items-center justify-between gap-3 rounded-xl border border-indigo-50 bg-indigo-50/40 px-3 py-2.5"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-indigo-950">
                    {r.name}
                  </p>
                  <Badge
                    className={
                      r.eligible
                        ? "mt-1 bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                        : "mt-1 bg-slate-200 text-slate-700 hover:bg-slate-200"
                    }
                  >
                    {r.eligible ? "EasyBuy eligible" : "Cash only"}
                  </Badge>
                </div>
                <p className="shrink-0 text-sm font-bold text-indigo-700">
                  {formatNaira(r.cashPrice)}
                </p>
              </div>
            ))}
            {rows.length === 0 && (
              <p className="py-8 text-center text-sm text-muted-foreground">
                No models match your search.
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}