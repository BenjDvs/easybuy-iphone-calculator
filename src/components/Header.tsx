import { Button } from "@/components/ui/button";
import { WHATSAPP_URL } from "@/data/models";
import { MessageCircle } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-indigo-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-500 shadow-md shadow-indigo-900/20">
            <span className="font-serif text-lg font-bold text-white">E</span>
          </div>
          <div className="min-w-0">
            <p className="font-serif text-lg font-bold leading-tight text-indigo-950">
              EasyBuy
            </p>
            <p className="truncate text-xs text-indigo-600">
              iPhone Loan &amp; Installment Calculator
            </p>
          </div>
        </div>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto"
        >
          <Button className="min-h-[44px] w-full bg-emerald-600 text-white shadow-sm hover:bg-emerald-700 sm:w-auto">
            <MessageCircle className="mr-2 h-4 w-4" />
            Chat on WhatsApp
          </Button>
        </a>
      </div>
    </header>
  );
}