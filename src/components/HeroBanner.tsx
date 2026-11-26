import { Button } from "@/components/ui/button";
import { Sparkles, ShieldCheck, Clock, Wallet } from "lucide-react";

type Props = {
  onOpenCashPrices: () => void;
};

export function HeroBanner({ onOpenCashPrices }: Props) {
  return (
    <section className="overflow-hidden rounded-2xl border border-indigo-100 bg-white shadow-sm">
      <div className="bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-500 px-4 py-6 sm:px-8 sm:py-8">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/30">
          <Sparkles className="h-3.5 w-3.5" />
          EasyBuy Installments
        </span>
        <h1 className="mt-3 font-serif text-2xl font-bold leading-tight text-white sm:text-4xl">
          Smart iPhone Installment Plans Made Simple
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-indigo-100 sm:text-base">
          Pick your iPhone, pay 55% or more upfront, and spread the balance over 1 to 3
          months — with the first month after collection completely free.
        </p>
      </div>

      <div className="px-4 py-4 sm:px-8 sm:py-5">
        <div className="flex w-full items-start gap-2 rounded-2xl bg-amber-100 px-4 py-3 text-sm font-bold text-amber-900 ring-1 ring-amber-300 sm:w-auto sm:items-center">
          <span className="text-base leading-none">🎉</span>
          <span className="leading-snug">
            First Month After Collection is FREE — Repayment Starts Month 2!
          </span>
        </div>

        <div className="mt-4">
          <Button
            variant="outline"
            onClick={onOpenCashPrices}
            className="min-h-[44px] w-full whitespace-normal border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 sm:w-auto"
          >
            <Wallet className="mr-2 h-4 w-4 shrink-0" />
            <span className="text-left leading-tight">
              View Immediate Cash Prices (Save ₦5,000)
            </span>
          </Button>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="flex items-center gap-3 rounded-xl bg-indigo-50 px-4 py-3">
            <ShieldCheck className="h-5 w-5 shrink-0 text-indigo-600" />
            <p className="text-xs font-medium text-indigo-900">
              55% minimum down payment
            </p>
          </div>
          <div className="flex items-center gap-3 rounded-xl bg-emerald-50 px-4 py-3">
            <Clock className="h-5 w-5 shrink-0 text-emerald-600" />
            <p className="text-xs font-medium text-emerald-900">
              1–3 month plans (or weekly)
            </p>
          </div>
          <div className="flex items-center gap-3 rounded-xl bg-fuchsia-50 px-4 py-3">
            <Sparkles className="h-5 w-5 shrink-0 text-fuchsia-600" />
            <p className="text-xs font-medium text-fuchsia-900">
              EasyBuy starts at iPhone 11
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}