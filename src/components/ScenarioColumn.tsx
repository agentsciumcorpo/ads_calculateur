"use client";

import { Dispatch } from "react";
import { ClientData, ScenarioInputs, AppAction } from "@/lib/types";
import { computeScenarioResults } from "@/lib/calculations";
import { formatCurrency, formatNumber } from "@/lib/format";
import { SCENARIO_LABELS, SCENARIO_COLORS } from "@/lib/constants";
import InputField from "./InputField";
import ResultRow from "./ResultRow";

interface ScenarioColumnProps {
  index: number;
  scenario: ScenarioInputs;
  clientData: ClientData;
  dispatch: Dispatch<AppAction>;
}

export default function ScenarioColumn({ index, scenario, clientData, dispatch }: ScenarioColumnProps) {
  const results = computeScenarioResults(clientData, scenario);
  const colors = SCENARIO_COLORS[index];
  const label = SCENARIO_LABELS[index];

  const update = (field: keyof ScenarioInputs) => (value: number) => {
    dispatch({ type: "UPDATE_SCENARIO", index, field, value });
  };

  return (
    <div className={`rounded-lg border ${colors.border} ${colors.bg} p-4 flex flex-col gap-3`}>
      <div className={`-mx-4 -mt-4 px-4 py-2 rounded-t-lg ${colors.header}`}>
        <h3 className="text-sm font-bold text-gray-800 text-center">
          #{index + 1} — {label}
        </h3>
      </div>

      <div className="space-y-2">
        <InputField label="Coût par lead" value={scenario.cpl} onChange={update("cpl")} unit="€" />
        <InputField label="% Lead → RDV" value={scenario.leadToRdvOverride} onChange={update("leadToRdvOverride")} unit="%" />
        <InputField label="% RDV → Vente" value={scenario.rdvToVenteOverride} onChange={update("rdvToVenteOverride")} unit="%" />
      </div>

      <hr className="border-gray-200" />

      <div className="space-y-0">
        <ResultRow label="Leads" value={formatNumber(results.volumeLeads)} />
        <ResultRow label="RDV" value={formatNumber(results.volumeRdv)} />
        <ResultRow label="Transactions" value={formatNumber(results.volumeTransactions)} />
        <ResultRow label="CA généré" value={formatCurrency(results.caGenere)} />
        <ResultRow
          label="Profit généré"
          value={formatCurrency(results.profitGenere)}
          colorMode="positive-negative"
          rawValue={results.profitGenere}
          bold
        />
      </div>
    </div>
  );
}
