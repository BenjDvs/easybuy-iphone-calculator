import { useMemo, useState } from "react";
import { Header } from "@/components/Header";
import { HeroBanner } from "@/components/HeroBanner";
import { CalculatorForm } from "@/components/CalculatorForm";
import { ResultCard } from "@/components/ResultCard";
import { Breakdown } from "@/components/Breakdown";
import { PlanComparison } from "@/components/PlanComparison";
import { CashPriceModal } from "@/components/CashPriceModal";
import { Footer } from "@/components/Footer";
import { EASYBUY_MODELS } from "@/data/models";
import { calculateQuote, type InstallmentType } from "@/lib/calc";

const DEFAULT_MODEL = EASYBUY_MODELS[0];

export default function App() {
  const [modelId, setModelId] = useState(DEFAULT_MODEL.id);
  const [cashPrice, setCashPrice] = useState(DEFAULT_MODEL.price);
  const [downPayment, setDownPayment] = useState(
    Math.round(DEFAULT_MODEL.price * 0.55),
  );
  const [extraFee, setExtraFee] = useState(0);
  const [transportFee, setTransportFee] = useState(0);
  const [installmentType, setInstallmentType] = useState<InstallmentType>("Month");
  const [periods, setPeriods] = useState(3);
  const [receiptImage, setReceiptImage] = useState<string | null>(null);
  const [cashModalOpen, setCashModalOpen] = useState(false);

  const quote = useMemo(
    () =>
      calculateQuote({
        cashPrice,
        downPayment,
        extraFee,
        transportFee,
        installmentType,
        periods,
      }),
    [cashPrice, downPayment, extraFee, transportFee, installmentType, periods],
  );

  const modelName =
    modelId === "custom"
      ? "Custom Price"
      : EASYBUY_MODELS.find((m) => m.id === modelId)?.name ?? "iPhone";

  function handleModelChange(id: string) {
    setModelId(id);
    if (id === "custom") return;
    const model = EASYBUY_MODELS.find((m) => m.id === id);
    if (!model) return;
    setCashPrice(model.price);
    setDownPayment(Math.round(model.price * 0.55));
  }

  function handleCashPriceChange(v: number) {
    const next = Number.isFinite(v) ? Math.max(0, v) : 0;
    setCashPrice(next);
    setDownPayment(Math.round(next * 0.55));
  }

  function handleDownPaymentChange(v: number) {
    const next = Number.isFinite(v) ? Math.max(0, v) : 0;
    const min = Math.round(cashPrice * 0.55);
    setDownPayment(Math.max(min, next));
  }

  function handlePercent(pct: number) {
    setDownPayment(Math.round(cashPrice * (pct / 100)));
  }

  function handleReset() {
    setModelId(DEFAULT_MODEL.id);
    setCashPrice(DEFAULT_MODEL.price);
    setDownPayment(Math.round(DEFAULT_MODEL.price * 0.55));
    setExtraFee(0);
    setTransportFee(0);
    setInstallmentType("Month");
    setPeriods(3);
    setReceiptImage(null);
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-b from-indigo-50 via-slate-50 to-emerald-50">
      <Header />

      <main className="mx-auto w-full max-w-6xl px-4 pb-16 pt-4 sm:px-6 sm:pt-8">
        <HeroBanner onOpenCashPrices={() => setCashModalOpen(true)} />

        <div className="mt-5 grid grid-cols-1 gap-5 sm:mt-6 sm:gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <CalculatorForm
              modelId={modelId}
              onModelChange={handleModelChange}
              cashPrice={cashPrice}
              onCashPriceChange={handleCashPriceChange}
              downPayment={downPayment}
              onDownPaymentChange={handleDownPaymentChange}
              onPercent={handlePercent}
              extraFee={extraFee}
              onExtraFeeChange={setExtraFee}
              transportFee={transportFee}
              onTransportFeeChange={setTransportFee}
              installmentType={installmentType}
              onInstallmentTypeChange={setInstallmentType}
              periods={periods}
              onPeriodsChange={setPeriods}
              receiptImage={receiptImage}
              onReceiptImageChange={setReceiptImage}
              quote={quote}
              onReset={handleReset}
            />
          </div>

          <div className="space-y-5 sm:space-y-6 lg:col-span-2">
            <ResultCard
              quote={quote}
              modelName={modelName}
              installmentType={installmentType}
              transportFee={transportFee}
            />
            <Breakdown
              quote={quote}
              modelName={modelName}
              transportFee={transportFee}
            />
          </div>
        </div>

        <div className="mt-6 sm:mt-8">
          <PlanComparison
            cashPrice={cashPrice}
            downPayment={downPayment}
            modelName={modelName}
          />
        </div>
      </main>

      <Footer />

      <CashPriceModal open={cashModalOpen} onOpenChange={setCashModalOpen} />
    </div>
  );
}