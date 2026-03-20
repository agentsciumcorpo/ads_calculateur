"use client";

import { MonthlyProjection, Currency } from "@/lib/types";
import { formatCurrency, formatNumber } from "@/lib/format";

interface Projection6MonthsProps {
  projections: MonthlyProjection[];
  scenarioLabel: string;
  currency: Currency;
}

export default function Projection6Months({ projections, scenarioLabel, currency }: Projection6MonthsProps) {
  const rows = [
    { label: "Leads cumulés", key: "leadsCumules" as const, format: (v: number) => formatNumber(v) },
    { label: "Clients cumulés", key: "clientsCumules" as const, format: (v: number) => formatNumber(v) },
    { label: "CA cumulé", key: "caCumule" as const, format: (v: number) => formatCurrency(v, currency) },
    { label: "Profit cumulé", key: "profitCumule" as const, format: (v: number) => formatCurrency(v, currency) },
  ];

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Projection 6 mois — Scénario {scenarioLabel}
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="text-left py-2 pr-4 font-medium text-gray-700 min-w-[160px]"></th>
              {projections.map((p) => (
                <th
                  key={p.mois}
                  className={`text-center py-2 px-3 font-bold text-gray-800 ${p.mois === 6 ? "bg-blue-50 rounded-t-md" : ""}`}
                >
                  Mois {p.mois}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.key} className="border-t border-gray-100">
                <td className="py-2.5 pr-4 text-gray-600 font-medium">{row.label}</td>
                {projections.map((p) => (
                  <td
                    key={p.mois}
                    className={`text-center py-2.5 px-3 font-semibold ${p.mois === 6 ? "bg-blue-50 font-bold text-blue-900" : "text-gray-900"}`}
                  >
                    {row.format(p[row.key])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
