import { formatNaira, type QuoteResult, type InstallmentType } from "@/lib/calc";

export const WHATSAPP_LINK =
  "https://api.whatsapp.com/send/?phone=2348137114256&text=Hello%2C%20I%20am%20interested%20in%20your%20EasyBuy%20iPhone%20installment%20plans.";

export const CONTACT_BLOCK = [
  "Need More Information?",
  "Contact us today for enquiries, assistance and EasyBuy iPhone offers.",
  "Main WhatsApp & Call Line: 08137114256 (+234 813 711 4256)",
  "Alternative WhatsApp & Call Line: 07078156017 (+234 707 815 6017)",
  `WhatsApp Link: ${WHATSAPP_LINK}`,
].join("\n");

export function buildQuoteText(
  modelName: string,
  quote: QuoteResult,
  installmentType: InstallmentType,
  transportFee: number,
): string {
  const lines = [
    "EasyBuy — iPhone Installment Quote",
    `Model: ${modelName}`,
    `EasyBuy Cash Price: ${formatNaira(quote.cashPrice)}`,
    `Down Payment: ${formatNaira(quote.downPayment)} (${quote.downPaymentPct.toFixed(1)}%)`,
    `Loan Amount: ${formatNaira(quote.loanAmount)}`,
    `Total Repaid (Loan + Interest): ${formatNaira(quote.totalRepaid)}`,
    `Installments: ${quote.frequencyLabel}`,
    `${quote.paymentLabel}: ${formatNaira(quote.periodicPayment)}`,
    `Total Device Cost: ${formatNaira(quote.totalDeviceCost)}`,
    transportFee > 0 ? `Transport Fee: ${formatNaira(transportFee)}` : "",
    `Total Day-1 Payment: ${formatNaira(quote.totalDay1)}`,
    "Note: First month after collection is FREE — repayment starts Month 2.",
    "",
    CONTACT_BLOCK,
  ].filter(Boolean);
  return lines.join("\n");
}

function legacyCopy(text: string): boolean {
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.top = "0";
    ta.style.left = "0";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    ta.setSelectionRange(0, ta.value.length);
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

export type ShareOutcome = "shared" | "copied" | "failed";

export async function shareQuote(text: string): Promise<ShareOutcome> {
  const nav = navigator as Navigator & {
    share?: (data: { title?: string; text?: string }) => Promise<void>;
  };

  if (typeof nav.share === "function") {
    try {
      await nav.share({ title: "EasyBuy iPhone Quote", text });
      return "shared";
    } catch (err) {
      const name = (err as { name?: string })?.name;
      if (name === "AbortError") return "shared";
      // fall through to clipboard
    }
  }

  if (legacyCopy(text)) return "copied";

  try {
    if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
      await navigator.clipboard.writeText(text);
      return "copied";
    }
  } catch {
    // blocked by permissions policy — ignore
  }

  return "failed";
}