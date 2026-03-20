const currencyFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const numberFormatter = new Intl.NumberFormat("fr-FR", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 1,
});

export function formatCurrency(value: number): string {
  if (!isFinite(value)) return "—";
  return currencyFormatter.format(value);
}

export function formatNumber(value: number): string {
  if (!isFinite(value)) return "—";
  return numberFormatter.format(value);
}
