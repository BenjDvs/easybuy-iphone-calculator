export type CashOnlyModel = {
  id: string;
  name: string;
  basePrice: number;
  cashPrice: number;
};

export type EasyBuyModel = {
  id: string;
  name: string;
  price: number;
};

export const CASH_ONLY_MODELS: CashOnlyModel[] = [
  { id: "se2-64", name: "iPhone SE2 64GB", basePrice: 165000, cashPrice: 160000 },
  { id: "se3-128", name: "iPhone SE3 128GB", basePrice: 225000, cashPrice: 220000 },
  { id: "7-32", name: "iPhone 7 32GB", basePrice: 105000, cashPrice: 100000 },
  { id: "7-128", name: "iPhone 7 128GB", basePrice: 115000, cashPrice: 110000 },
  { id: "7p-32", name: "iPhone 7 Plus 32GB", basePrice: 125000, cashPrice: 120000 },
  { id: "7p-128", name: "iPhone 7 Plus 128GB", basePrice: 145000, cashPrice: 140000 },
  { id: "xr-64", name: "iPhone XR 64GB", basePrice: 225000, cashPrice: 220000 },
  { id: "xr-128", name: "iPhone XR 128GB", basePrice: 240000, cashPrice: 235000 },
];

export const EASYBUY_MODELS: EasyBuyModel[] = [
  { id: "11-64", name: "iPhone 11 64GB", price: 255000 },
  { id: "11-128", name: "iPhone 11 128GB", price: 295000 },
  { id: "11p-64", name: "iPhone 11 Pro 64GB", price: 325000 },
  { id: "11pm-64", name: "iPhone 11 Pro Max 64GB", price: 360000 },
  { id: "12-64", name: "iPhone 12 64GB", price: 290000 },
  { id: "12-128", name: "iPhone 12 128GB", price: 330000 },
  { id: "12p-128", name: "iPhone 12 Pro 128GB", price: 390000 },
  { id: "12p-256", name: "iPhone 12 Pro 256GB", price: 440000 },
  { id: "12p-512", name: "iPhone 12 Pro 512GB", price: 460000 },
  { id: "12pm-128", name: "iPhone 12 Pro Max 128GB", price: 490000 },
  { id: "12pm-256", name: "iPhone 12 Pro Max 256GB", price: 535000 },
  { id: "13-128", name: "iPhone 13 128GB", price: 400000 },
  { id: "13p-128", name: "iPhone 13 Pro 128GB", price: 540000 },
  { id: "13p-256", name: "iPhone 13 Pro 256GB", price: 575000 },
  { id: "13pm-128", name: "iPhone 13 Pro Max 128GB", price: 570000 },
  { id: "14-128", name: "iPhone 14 128GB", price: 490000 },
  { id: "14p-128", name: "iPhone 14 Pro 128GB", price: 695000 },
  { id: "14pm-128", name: "iPhone 14 Pro Max 128GB", price: 790000 },
  { id: "15-128", name: "iPhone 15 128GB", price: 840000 },
  { id: "15p-128", name: "iPhone 15 Pro 128GB", price: 899000 },
  { id: "15pm-256", name: "iPhone 15 Pro Max 256GB", price: 1000000 },
];

export const CASH_SAVINGS = 5000;

export const ALL_CASH_PRICE_ROWS = [
  ...CASH_ONLY_MODELS.map((m) => ({
    id: m.id,
    name: m.name,
    cashPrice: m.cashPrice,
    eligible: false,
  })),
  ...EASYBUY_MODELS.map((m) => ({
    id: m.id,
    name: m.name,
    cashPrice: m.price - CASH_SAVINGS,
    eligible: true,
  })),
];

export const WHATSAPP_NUMBER = "2348137114256";
export const WHATSAPP_MESSAGE =
  "Hello, I am interested in your EasyBuy iPhone installment plans.";
export const WHATSAPP_URL = `https://api.whatsapp.com/send/?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(
  WHATSAPP_MESSAGE,
)}`;

export const CONTACTS = [
  {
    label: "Main WhatsApp & Call Line",
    display: "08137114256",
    intl: "+234 813 711 4256",
    tel: "tel:+2348137114256",
    wa: WHATSAPP_URL,
  },
  {
    label: "Alternative WhatsApp & Call Line",
    display: "07078156017",
    intl: "+234 707 815 6017",
    tel: "tel:+2347078156017",
    wa: `https://api.whatsapp.com/send/?phone=2347078156017&text=${encodeURIComponent(
      WHATSAPP_MESSAGE,
    )}`,
  },
];