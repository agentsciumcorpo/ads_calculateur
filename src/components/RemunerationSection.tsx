"use client";

import { Dispatch } from "react";
import { AppState, AppAction } from "@/lib/types";
import { computeScenarioResults, computeRemunerationResults } from "@/lib/calculations";
import { formatCurrency } from "@/lib/format";
import { SCENARIO_LABELS, SCENARIO_COLORS } from "@/lib/constants";
import InputField from "./InputField";

interface RemunerationSectionProps {
  state: AppState;
  dispatch: Dispatch<AppAction>;
}

export default function RemunerationSection({ state, dispatch }: RemunerationSectionProps) {
  const allResults = state.scenarios.map((scenario) => {
    const scenarioResults = computeScenarioResults(state.clientData, scenario);
    const remuResults = computeRemunerationResults(scenarioResults, state.clientData, state.commissionPercent);
    return { scenarioResults, remuResults };
  });

  const rows = [
    { label: "Commission performance", key: "commissionPerformance" as const },
    { label: "Rémunération totale", key: "remunerationTotale" as const },
    { label: "Coût marketing total", key: "coutMarketingTotal" as const },
    { label: "Profit net supplémentaire", key: "profitNetSupplementaire" as const, colored: true },
    { label: "Probabilité 50%", key: "probabilite50" as const, colored: true },
  ];

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Rémunération & ROI</h2>

      <div className="mb-6 max-w-xs">
        <InputField
          label="% de commission"
          value={state.commissionPercent}
          onChange={(value) => dispatch({ type: "UPDATE_COMMISSION", value })}
          unit="%"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="text-left py-2 pr-4 font-medium text-gray-700 min-w-[200px]"></th>
              {SCENARIO_LABELS.map((label, i) => (
                <th key={i} className={`text-center py-2 px-2 font-bold text-gray-800 ${SCENARIO_COLORS[i].header} rounded-t-md`}>
                  #{i + 1} {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.key} className="border-t border-gray-100">
                <td className="py-2.5 pr-4 text-gray-600 font-medium">{row.label}</td>
                {allResults.map(({ remuResults }, i) => {
                  const val = remuResults[row.key];
                  let colorClass = "text-gray-900";
                  if (row.colored) {
                    if (val > 0) colorClass = "text-emerald-600 font-bold";
                    else if (val < 0) colorClass = "text-red-600 font-bold";
                  }
                  return (
                    <td key={i} className={`text-center py-2.5 px-2 font-semibold ${colorClass} ${SCENARIO_COLORS[i].bg}`}>
                      {formatCurrency(val)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
