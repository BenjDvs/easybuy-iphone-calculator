import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EASYBUY_MODELS } from "@/data/models";
import { formatNaira, type InstallmentType, type QuoteResult } from "@/lib/calc";
import { buildQuoteText, shareQuote } from "@/lib/share";
import { generateQuotePdf } from "@/lib/pdf";
import { FileText, RotateCcw, Share2, Upload, X } from "lucide-react";

type Props = {
  modelId: string;
  onModelChange: (id: string) => void;
  cashPrice: number;
  onCashPriceChange: (v: number) => void;
  downPayment: number;
  onDownPaymentChange: (v: number) => void;
  onPercent: (pct: number) => void;
  extraFee: number;
  onExtraFeeChange: (v: number) => void;
  transportFee: number;
  onTransportFeeChange: (v: number) => void;
  installmentType: InstallmentType;
  onInstallmentTypeChange: (t: InstallmentType) => void;
  periods: number;
  onPeriodsChange: (p: number) => void;
  receiptImage: string | null;
  onReceiptImageChange: (v: string | null) => void;
  quote: QuoteResult;
  onReset: () => void;
};

const PERCENT_OPTIONS = [55, 60, 65, 70];

export function CalculatorForm(props: Props) {
  const {
    modelId,
    onModelChange,
    cashPrice,
    onCashPriceChange,
    downPayment,
    onDownPaymentChange,
    onPercent,
    extraFee,
    onExtraFeeChange,
    transportFee,
    onTransportFeeChange,
    installmentType,
    onInstallmentTypeChange,
    periods,
    onPeriodsChange,
    receiptImage,
    onReceiptImageChange,
    quote,
    onReset,
  } = props;

  const fileRef = useRef<HTMLInputElement>(null);
  const [shareMsg, setShareMsg] = useState("");
  const [busy, setBusy] = useState(false);

  const modelName =
    modelId === "custom"
      ? "Custom Price"
      : EASYBUY_MODELS.find((m) => m.id === modelId)?.name ?? "iPhone";

  const periodOptions =
    installmentType === "Month"
      ? [
          { value: 1, label: "1 Month" },
          { value: 2, label: "2 Months" },
          { value: 3, label: "3 Months" },
        ]
      : [
          { value: 4, label: "4 Weeks (1 Month)" },
          { value: 8, label: "8 Weeks (2 Months)" },
          { value: 12, label: "12 Weeks (3 Months)" },
        ];

  function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onReceiptImageChange(String(reader.result));
    reader.readAsDataURL(file);
  }

  async function handleShare() {
    const text = buildQuoteText(modelName, quote, installmentType, transportFee);
    try {
      const result = await shareQuote(text);
      if (result === "shared") setShareMsg("Quote shared!");
      else if (result === "copied") setShareMsg("Quote copied to clipboard!");
      else setShareMsg("Could not share — please copy manually.");
    } catch {
      setShareMsg("Could not share — please copy manually.");
    }
    window.setTimeout(() => setShareMsg(""), 3000);
  }

  async function handlePdf() {
    if (busy) return;
    setBusy(true);
    setShareMsg("Preparing PDF…");
    try {
      const ok = await generateQuotePdf(
        modelName,
        quote,
        installmentType,
        transportFee,
      );
      setShareMsg(ok ? "Quotation PDF downloaded!" : "Could not generate PDF — try again.");
    } catch {
      setShareMsg("Could not generate PDF — try again.");
    } finally {
      setBusy(false);
      window.setTimeout(() => setShareMsg(""), 3000);
    }
  }

  return (
    <Card className="border-indigo-100 bg-white shadow-md">
      <CardHeader className="border-b border-indigo-50">
        <CardTitle className="font-serif text-lg text-indigo-950">
          Build Your Plan
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5 pt-5">
        <div className="space-y-2">
          <Label htmlFor="model">Select iPhone Model</Label>
          <Select value={modelId} onValueChange={onModelChange}>
            <SelectTrigger id="model" className="min-h-[44px] w-full">
              <SelectValue placeholder="Choose a model" />
            </SelectTrigger>
            <SelectContent
              position="popper"
              sideOffset={4}
              className="max-h-80 w-[var(--radix-select-trigger-width)] min-w-[260px] overflow-y-auto sm:min-w-[300px]"
            >
              {EASYBUY_MODELS.map((m) => (
                <SelectItem
                  key={m.id}
                  value={m.id}
                  className="min-h-[44px] whitespace-nowrap pr-8"
                >
                  {m.name}
                </SelectItem>
              ))}
              <SelectItem value="custom" className="min-h-[44px] whitespace-nowrap pr-8">
                Custom Price
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="cashPrice">EasyBuy Cash Price (₦)</Label>
          <Input
            id="cashPrice"
            type="number"
            inputMode="numeric"
            min={0}
            value={cashPrice}
            onChange={(e) => onCashPriceChange(Number(e.target.value))}
            className="min-h-[44px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="downPayment">Down Payment Amount (₦)</Label>
          <Input
            id="downPayment"
            type="number"
            inputMode="numeric"
            min={quote.minDownPayment}
            value={downPayment}
            onChange={(e) => onDownPaymentChange(Number(e.target.value))}
            className="min-h-[44px]"
          />
          <p className="text-xs text-muted-foreground">
            Minimum 55% ({formatNaira(quote.minDownPayment)}). You may pay more.
          </p>
          <div className="grid grid-cols-4 gap-2">
            {PERCENT_OPTIONS.map((pct) => {
              const active = Math.round(quote.downPaymentPct) === pct;
              return (
                <button
                  key={pct}
                  type="button"
                  onClick={() => onPercent(pct)}
                  className={
                    "min-h-[44px] rounded-xl border text-sm font-semibold transition-colors " +
                    (active
                      ? "border-indigo-600 bg-indigo-600 text-white"
                      : "border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100")
                  }
                >
                  {pct}%
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="extraFee">Extra Upfront Fee / Markup (₦)</Label>
            <Input
              id="extraFee"
              type="number"
              inputMode="numeric"
              min={0}
              value={extraFee}
              onChange={(e) => onExtraFeeChange(Number(e.target.value))}
              className="min-h-[44px]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="transportFee">Transport Fee (₦)</Label>
            <Input
              id="transportFee"
              type="number"
              inputMode="numeric"
              min={0}
              value={transportFee}
              onChange={(e) => onTransportFeeChange(Number(e.target.value))}
              className="min-h-[44px]"
            />
          </div>
        </div>

        <div className="rounded-xl bg-indigo-50 px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm font-medium text-indigo-900">Loan Amount</span>
            <span className="text-base font-bold text-indigo-700">
              {formatNaira(quote.loanAmount)}
            </span>
          </div>
          <p className="mt-1 text-xs text-indigo-700/80">
            Effective upfront: {quote.effectiveUpfrontPct.toFixed(1)}% (fees excluded from
            loan balance)
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="type">* Installment Type</Label>
            <Select
              value={installmentType}
              onValueChange={(v) => {
                const t = v as InstallmentType;
                onInstallmentTypeChange(t);
                onPeriodsChange(t === "Month" ? 3 : 12);
              }}
            >
              <SelectTrigger id="type" className="min-h-[44px] w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent position="popper" sideOffset={4}>
                <SelectItem value="Month" className="min-h-[44px]">
                  Month
                </SelectItem>
                <SelectItem value="Week" className="min-h-[44px]">
                  Week
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="periods">* Installment Periods</Label>
            <Select
              value={String(periods)}
              onValueChange={(v) => onPeriodsChange(Number(v))}
            >
              <SelectTrigger id="periods" className="min-h-[44px] w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent position="popper" sideOffset={4}>
                {periodOptions.map((o) => (
                  <SelectItem
                    key={o.value}
                    value={String(o.value)}
                    className="min-h-[44px] whitespace-nowrap pr-8"
                  >
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Customer ID / Device Receipt Image (optional)</Label>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="hidden"
          />
          {receiptImage ? (
            <div className="relative overflow-hidden rounded-xl border border-indigo-100">
              <img
                src={receiptImage}
                alt="Receipt preview"
                className="max-h-56 w-full object-contain"
              />
              <button
                type="button"
                onClick={() => {
                  onReceiptImageChange(null);
                  if (fileRef.current) fileRef.current.value = "";
                }}
                className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-sm hover:bg-white"
                aria-label="Remove image"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl border border-dashed border-indigo-300 bg-indigo-50/50 px-4 py-3 text-sm font-medium text-indigo-700 hover:bg-indigo-50"
            >
              <Upload className="h-4 w-4" />
              Upload receipt image
            </button>
          )}
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <Button
            onClick={handlePdf}
            disabled={busy}
            className="min-h-[44px] w-full bg-emerald-600 text-white shadow-sm hover:bg-emerald-700 sm:flex-1"
          >
            <FileText className="mr-2 h-4 w-4" />
            {busy ? "Preparing PDF…" : "Generate Quotation PDF"}
          </Button>
          <Button
            variant="outline"
            onClick={handleShare}
            className="min-h-[44px] w-full border-indigo-200 text-indigo-700 hover:bg-indigo-50 sm:w-auto"
          >
            <Share2 className="mr-2 h-4 w-4" />
            Share Quote
          </Button>
          <Button
            variant="outline"
            onClick={onReset}
            className="min-h-[44px] w-full border-slate-200 text-slate-700 hover:bg-slate-50 sm:w-auto"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>

        {shareMsg ? (
          <p className="text-center text-xs font-medium text-emerald-700">{shareMsg}</p>
        ) : null}
      </CardContent>
    </Card>
  );
}
