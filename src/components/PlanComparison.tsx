import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { calculateQuote, formatNaira } from "@/lib/calc";
import { Check } from "lucide-react";

type Props = {
  cashPrice: number;
  downPayment: number;
  modelName: string;
};

const PLANS = [
  { months: 1, label: "1 Month Plan", tag: "Fastest" },
  { months: 2, label: "2 Month Plan", tag: "Balanced" },
  { months: 3, label: "3 Month Plan", tag: "Most flexible" },
];

export function PlanComparison({ cashPrice, downPayment, modelName }: Props) {
  return (
    <section className="rounded-2xl border border-indigo-100 bg-white p-4 shadow-sm sm:p-6">
      <div className="flex flex-col gap-1">
        <h2 className="font-serif text-xl font-bold text-indigo-950 sm:text-2xl">
          How It Works &amp; 1–3 Month Plan Comparison
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Comparing plans for{" "}
          <span className="font-semibold text-indigo-700">{modelName}</span>. EasyBuy
          installments start at iPhone 11, and the first month after collection is free.
        </p>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {PLANS.map((plan) => {
          const q = calculateQuote({
            cashPrice,
            downPayment,
            extraFee: 0,
            transportFee: 0,
            installmentType: "Month",
            periods: plan.months,
          });
          return (
            <Card
              key={plan.months}
              className="border-indigo-100 bg-gradient-to-b from-indigo-50/60 to-white shadow-sm"
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between gap-2">
                  <CardTitle className="text-base font-bold text-indigo-950">
                    {plan.label}
                  </CardTitle>
                  <Badge className="bg-indigo-100 text-indigo-700 hover:bg-indigo-100">
                    {plan.tag}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">
                    Monthly Payment
                  </p>
                  <p className="font-serif text-2xl font-bold text-indigo-700">
                    {formatNaira(q.periodicPayment)}
                  </p>
                  <p className="text-xs text-muted-foreground">{q.frequencyLabel}</p>
                </div>
                <div className="space-y-1 text-xs text-slate-600">
                  <p className="flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
                    Loan: {formatNaira(q.loanAmount)}
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
                    Total repaid: {formatNaira(q.totalRepaid)}
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
                    Device cost: {formatNaira(q.totalDeviceCost)}
                  </p>
                </div>
                <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                  🎉 First month free
                </Badge>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-5 rounded-xl bg-emerald-50 px-4 py-3 ring-1 ring-emerald-200">
        <p className="text-sm font-semibold leading-snug text-emerald-900">
          🎉 First month after collection is FREE — repayment starts Month 2.
        </p>
        <p className="mt-1 text-xs leading-relaxed text-emerald-800">
          Transport and miscellaneous fees are kept separate from the loan balance and
          total device cost.
        </p>
      </div>
    </section>
  );
}