import { Badge } from "@/components/ui/badge";
import { formatNaira, type QuoteResult, type InstallmentType } from "@/lib/calc";
import { Gift, TrendingUp } from "lucide-react";

type Props = {
  quote: QuoteResult;
  modelName: string;
  installmentType: InstallmentType;
  transportFee: number;
};

export function ResultCard({ quote, modelName, installmentType }: Props) {
  return (
    <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 p-5 shadow-lg shadow-indigo-900/25 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-indigo-200">
            {quote.paymentLabel}
          </p>
          <p className="mt-1 break-words font-serif text-3xl font-bold leading-tight text-white sm:text-4xl">
            {formatNaira(quote.periodicPayment)}
          </p>
          <p className="mt-1 text-sm font-medium text-indigo-100">
            {quote.frequencyLabel}
          </p>
        </div>
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/20 ring-1 ring-white/30">
          <TrendingUp className="h-5 w-5 text-white" />
        </div>
      </div>

      <div className="mt-4 flex items-start gap-2 rounded-xl bg-white/15 px-3 py-2 ring-1 ring-white/25">
        <Gift className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
        <p className="text-xs font-semibold leading-snug text-white">
          1st Month After Collection is FREE • Repayment begins after 30 days
        </p>
      </div>

      <div className="mt-4 space-y-2 border-t border-white/20 pt-4">
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm text-indigo-100">Loan Amount</span>
          <span className="text-sm font-bold text-white">
            {formatNaira(quote.loanAmount)}
          </span>
        </div>
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm text-indigo-100">Periods</span>
          <span className="text-sm font-bold text-white">
            {quote.frequencyLabel}
          </span>
        </div>
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm text-indigo-100">Model</span>
          <span className="max-w-[60%] truncate text-right text-sm font-bold text-white">
            {modelName}
          </span>
        </div>
      </div>

      <div className="mt-4">
        <Badge className="bg-white/20 text-white ring-1 ring-white/30 hover:bg-white/25">
          {installmentType === "Month" ? "Monthly plan" : "Weekly plan"}
        </Badge>
      </div>
    </div>
  );
}