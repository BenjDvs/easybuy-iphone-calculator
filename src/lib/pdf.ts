import { formatNaira, type QuoteResult, type InstallmentType } from "@/lib/calc";
import { WHATSAPP_LINK } from "@/lib/share";

type JsPdfInstance = {
  setFillColor: (r: number, g: number, b: number) => void;
  setDrawColor: (r: number, g: number, b: number) => void;
  rect: (x: number, y: number, w: number, h: number, style?: string) => void;
  line: (x1: number, y1: number, x2: number, y2: number) => void;
  setTextColor: (r: number, g: number, b: number) => void;
  setFontSize: (size: number) => void;
  text: (text: string, x: number, y: number) => void;
  save: (filename: string) => void;
};

type JsPdfCtor = new (options?: unknown) => JsPdfInstance;

declare global {
  interface Window {
    jspdf?: { jsPDF: JsPdfCtor };
  }
}

const CDN_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";

let loading: Promise<JsPdfCtor | null> | null = null;

function loadJsPdf(): Promise<JsPdfCtor | null> {
  if (typeof window === "undefined") return Promise.resolve(null);
  if (window.jspdf?.jsPDF) return Promise.resolve(window.jspdf.jsPDF);
  if (loading) return loading;

  loading = new Promise<JsPdfCtor | null>((resolve) => {
    const existing = document.querySelector<HTMLScriptElement>(
      'script[data-jspdf="true"]',
    );
    if (existing) {
      existing.addEventListener("load", () => resolve(window.jspdf?.jsPDF ?? null));
      existing.addEventListener("error", () => resolve(null));
      return;
    }
    const script = document.createElement("script");
    script.src = CDN_URL;
    script.async = true;
    script.dataset.jspdf = "true";
    script.addEventListener("load", () => resolve(window.jspdf?.jsPDF ?? null));
    script.addEventListener("error", () => resolve(null));
    document.head.appendChild(script);
  });

  return loading;
}

export async function generateQuotePdf(
  modelName: string,
  quote: QuoteResult,
  installmentType: InstallmentType,
  transportFee: number,
): Promise<boolean> {
  try {
    const JsPDF = await loadJsPdf();
    if (!JsPDF) return false;

    const doc = new JsPDF();
    const quoteId = "EB-" + Date.now().toString().slice(-8);

    doc.setFillColor(79, 70, 229);
    doc.rect(0, 0, 210, 34, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.text("EasyBuy", 14, 16);
    doc.setFontSize(10);
    doc.text("iPhone Loan & Installment Quotation", 14, 24);
    doc.setFontSize(9);
    doc.text(`Quote ID: ${quoteId}`, 150, 16);
    doc.text(`Date: ${new Date().toLocaleDateString("en-NG")}`, 150, 22);

    doc.setTextColor(30, 30, 30);
    let y = 48;
    const row = (label: string, value: string) => {
      doc.setFontSize(11);
      doc.text(label, 14, y);
      doc.text(value, 110, y);
      y += 9;
    };

    row("Selected iPhone Model", modelName);
    row("EasyBuy Cash Price", formatNaira(quote.cashPrice));
    row(
      "Down Payment",
      `${formatNaira(quote.downPayment)} (${quote.downPaymentPct.toFixed(1)}%)`,
    );
    row("Remaining Loan Amount", formatNaira(quote.loanAmount));
    row("Total Repaid (Loan + Interest)", formatNaira(quote.totalRepaid));
    row(
      "Installment Plan",
      `${installmentType === "Month" ? "Monthly" : "Weekly"} — ${quote.frequencyLabel}`,
    );
    row(quote.paymentLabel, formatNaira(quote.periodicPayment));
    if (transportFee > 0) row("Transport Fee (separate)", formatNaira(transportFee));
    row("Total Device Cost", formatNaira(quote.totalDeviceCost));
    row("Total Day-1 Payment", formatNaira(quote.totalDay1));

    y += 6;
    doc.setFillColor(220, 252, 231);
    doc.rect(14, y - 7, 182, 16, "F");
    doc.setTextColor(22, 101, 52);
    doc.setFontSize(11);
    doc.text(
      "First month after collection is FREE — repayment starts Month 2.",
      18,
      y + 3,
    );

    y += 24;
    doc.setDrawColor(199, 210, 254);
    doc.line(14, y - 8, 196, y - 8);
    doc.setTextColor(49, 46, 129);
    doc.setFontSize(13);
    doc.text("Need More Information?", 14, y);
    y += 8;
    doc.setTextColor(60, 60, 60);
    doc.setFontSize(10);
    doc.text(
      "Contact us today for enquiries, assistance and EasyBuy iPhone offers.",
      14,
      y,
    );
    y += 8;
    doc.text("Main WhatsApp & Call Line: 08137114256 (+234 813 711 4256)", 14, y);
    y += 7;
    doc.text("Alternative WhatsApp & Call Line: 07078156017 (+234 707 815 6017)", 14, y);
    y += 7;
    doc.setTextColor(37, 99, 235);
    doc.setFontSize(8);
    doc.text(`WhatsApp Link: ${WHATSAPP_LINK}`, 14, y);

    doc.save(`EasyBuy-Quote-${quoteId}.pdf`);
    return true;
  } catch {
    return false;
  }
}