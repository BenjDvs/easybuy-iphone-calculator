import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatNaira, type CalcResult } from "@/lib/calc";

type ItemizedBreakdownProps = {
  result: CalcResult;
  modelName: string;
  transportFee: number;
  extraUpfrontFee: number;
};

function Row({
  label,
  value,
  muted,
  strong,
}: {
  label: string;
  value: string;
  muted?: boolean;
  strong?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-2">
      <span
        className={
          muted ? "text-sm text-muted-foreground" : "text-sm text-slate-700"
        }
      >
        {label}
      </span>
      <span
        className={
          strong
            ? "text-right text-base font-bold text-slate-900"
            : "text-right text-sm font-semibold text-slate-900"
        }
      >
        {value}
      </span>
    </div>
  );
}

export function ItemizedBreakdown({
  result,
  modelName,
  transportFee,
  extraUpfrontFee,
}: ItemizedBreakdownProps) {
  const downPaymentPercent =
    typeof result?.downPaymentPercent === "number" &&
    Number.isFinite(result.downPaymentPercent)
      ? result.downPaymentPercent
      : 0;

  return (
    <Card className="rounded-2xl border-slate-200 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold text-slate-900">
          Itemized Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <Row label="Selected Model" value={modelName} />
        <Row label="EasyBuy Cash Price" value={formatNaira(result?.cashPrice ?? 0)} />
        <Separator className="my-2" />
        <Row
          label={`Down Payment (${downPaymentPercent.toFixed(1)}% of cash price)`}
          value={formatNaira(result?.downPaymentAmount ?? 0)}
        />
        <Row label="Remaining Loan Amount" value={formatNaira(result?.loanAmount ?? 0)} />
        <Row
          label="Total Repaid (Loan + Interest)"
          value={formatNaira(result?.totalRepaid ?? 0)}
        />
        <Separator className="my-2" />
        <Row
          label="Total Device Cost (Down Payment + Total Repaid)"
          value={formatNaira(result?.totalDeviceCost ?? 0)}
          strong
        />
        {extraUpfrontFee > 0 && (
          <Row
            label="Extra Upfront Fee / Markup"
            value={formatNaira(extraUpfrontFee)}
            muted
          />
        )}
        {transportFee > 0 && (
          <Row
            label="Miscellaneous / Transport Fee (not in device cost)"
            value={formatNaira(transportFee)}
            muted
          />
        )}
        <Separator className="my-2" />
        <Row
          label="Total Day-1 Upfront Payment Required"
          value={formatNaira(result?.totalDay1 ?? 0)}
          strong
        />
      </CardContent>
    </Card>
  );
}