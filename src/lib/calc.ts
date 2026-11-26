export type InstallmentType = "Month" | "Week";

export type QuoteInput = {
  cashPrice: number;
  downPayment: number;
  extraFee: number;
  transportFee: number;
  installmentType: InstallmentType;
  periods: number;
};

export type QuoteResult = {
  cashPrice: number;
  downPayment: number;
  downPaymentAmount: number;
  downPaymentPct: number;
  downPaymentPercent: number;
  minDownPayment: number;
  standardLoanBase: number;
  loanAmount: number;
  multiplier: number;
  totalRepaid: number;
  numberOfInstallments: number;
  periodicPayment: number;
  paymentLabel: string;
  frequencyLabel: string;
  totalDeviceCost: number;
  totalDay1: number;
  effectiveUpfrontPct: number;
};

export type CalcResult = QuoteResult;

export const MIN_DOWN_PAYMENT_PCT = 55;

export function formatNaira(value: number): string {
  const safe = Number.isFinite(value) ? Math.round(value) : 0;
  return "₦" + safe.toLocaleString("en-NG");
}

export function multiplierFor(
  installmentType: InstallmentType,
  periods: number,
): number {
  const months = installmentType === "Month" ? periods : Math.round(periods / 4);
  if (months <= 1) return 1.25;
  if (months === 2) return 1.5;
  return 1.6;
}

export function calculateQuote(input: QuoteInput): QuoteResult {
  const cashPrice = Math.max(0, Number(input.cashPrice) || 0);
  const minDownPayment = Math.round(cashPrice * (MIN_DOWN_PAYMENT_PCT / 100));
  const downPayment = Math.max(minDownPayment, Number(input.downPayment) || 0);
  const extraFee = Math.max(0, Number(input.extraFee) || 0);
  const transportFee = Math.max(0, Number(input.transportFee) || 0);

  const standardLoanBase = cashPrice * 0.5;
  const loanAmount = Math.max(0, cashPrice - downPayment);
  const multiplier = multiplierFor(input.installmentType, input.periods);
  const totalRepaid = Math.round(standardLoanBase * multiplier);
  const numberOfInstallments = input.periods;
  const periodicPayment =
    numberOfInstallments > 0 ? Math.round(totalRepaid / numberOfInstallments) : 0;

  const totalDeviceCost = downPayment + totalRepaid;
  const totalDay1 = downPayment + extraFee + transportFee;
  const downPaymentPct = cashPrice > 0 ? (downPayment / cashPrice) * 100 : 0;
  const effectiveUpfrontPct =
    cashPrice > 0 ? ((downPayment + extraFee) / cashPrice) * 100 : 0;

  const isMonth = input.installmentType === "Month";
  const paymentLabel = isMonth ? "Monthly Payment" : "Weekly Payment";
  const frequencyLabel = `${numberOfInstallments}x ${isMonth ? "monthly" : "weekly"}`;

  return {
    cashPrice,
    downPayment,
    downPaymentAmount: downPayment,
    downPaymentPct,
    downPaymentPercent: downPaymentPct,
    minDownPayment,
    standardLoanBase,
    loanAmount,
    multiplier,
    totalRepaid,
    numberOfInstallments,
    periodicPayment,
    paymentLabel,
    frequencyLabel,
    totalDeviceCost,
    totalDay1,
    effectiveUpfrontPct,
  };
}
