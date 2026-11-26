import { CONTACTS } from "@/data/models";
import { Phone, MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-indigo-100 bg-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <h2 className="font-serif text-xl font-bold text-indigo-950 sm:text-2xl">
          Need More Information?
        </h2>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          Contact us today for enquiries, assistance and EasyBuy iPhone offers.
        </p>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {CONTACTS.map((c) => (
            <div
              key={c.tel}
              className="rounded-2xl border border-indigo-100 bg-indigo-50/50 p-4 shadow-sm"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
                {c.label}
              </p>
              <p className="mt-1 font-serif text-lg font-bold text-indigo-950">
                {c.display}
              </p>
              <p className="text-xs text-muted-foreground">{c.intl}</p>

              <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                <a href={c.tel} className="w-full sm:w-auto">
                  <span className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 sm:w-auto">
                    <Phone className="h-4 w-4" />
                    Call
                  </span>
                </a>
                <a
                  href={c.wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <span className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 sm:w-auto">
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </span>
                </a>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          EasyBuy iPhone Loan &amp; Installment Calculator
        </p>
      </div>
    </footer>
  );
}