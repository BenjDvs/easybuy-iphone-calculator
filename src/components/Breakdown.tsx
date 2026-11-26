import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatNaira, type QuoteResult } from "@/lib/calc";

type Props = {
  quote: QuoteResult;
  modelName: string;
  transportFee: number;
};

type RowProps = {
  label: string;
  value: string;
  hint?: string;
  emphasis?: boolean;
};

function Row({ label, value, hint, emphasis }: RowProps) {
  return (
    <div className="flex items-start justify-between gap-3 py-2">
      <div className="min-w-0">
        <p
          className={
            emphasis
              ? "text-sm font-semibold text-indigo-950"
              : "text-sm text-slate-600"
          }
        >
          {label}
        </p>
        {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
      </div>
      <p
        className={
          emphasis
            ? "shrink-0 text-sm font-bold text-indigo-700"
            : "shrink-0 text-sm font-semibold text-slate-900"
        }
      >
        {value}
      </p>
    </div>
  );
}

export function Breakdown({ quote, modelName, transportFee }: Props) {
  return (
    <Card className="border-indigo-100 bg-white shadow-md">
      <CardHeader className="border-b border-indigo-50">
        <CardTitle className="font-serif text-lg text-indigo-950">
          Itemized Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <Row label="Selected Model" value={modelName} />
        <Row label="EasyBuy Cash Price" value={formatNaira(quote.cashPrice)} />
        <Separator className="my-1" />
        <Row
          label="Down Payment"
          hint={`${quote.downPaymentPct.toFixed(1)}% of cash price`}
          value={formatNaira(quote.downPayment)}
        />
        <Row label="Remaining Loan Amount" value={formatNaira(quote.loanAmount)} />
        <Row
          label="Total Repaid (Loan + Interest)"
          hint={`${quote.multiplier.toFixed(2)}x multiplier`}
          value={formatNaira(quote.totalRepaid)}
        />
        <Separator className="my-1" />
        <Row
          label="Total Device Cost"
          hint="Down Payment + Total Repaid"
          value={formatNaira(quote.totalDeviceCost)}
          emphasis
        />
        <Row
          label="Miscellaneous / Transport Fee"
          hint="Listed separately — not added to device cost"
          value={formatNaira(transportFee)}
        />
        <Separator className="my-1" />
        <Row
          label="Total Day-1 Upfront Payment Required"
          value={formatNaira(quote.totalDay1)}
          emphasis
        />
      </CardContent>
    </Card>
  );
}