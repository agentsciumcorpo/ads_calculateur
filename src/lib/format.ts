import { Currency } from "./types";

const numberFormatter = new Intl.NumberFormat("fr-FR", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 1,
});

export function formatCurrency(value: number, currency: Currency = "EUR"): string {
  if (!isFinite(value)) return "—";
  const formatter = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return formatter.format(value);
}

export function formatNumber(value: number): string {
  if (!isFinite(value)) return "—";
  return numberFormatter.format(value);
}

export function currencySymbol(currency: Currency): string {
  return currency === "EUR" ? "€" : "$";
}
