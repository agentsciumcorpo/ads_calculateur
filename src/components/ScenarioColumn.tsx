"use client";

import { Dispatch } from "react";
import { ClientData, ExpertData, ScenarioInputs, AppAction, Currency } from "@/lib/types";
import { computeScenarioResults } from "@/lib/calculations";
import { formatCurrency, formatNumber, currencySymbol } from "@/lib/format";
import { SCENARIO_LABELS, SCENARIO_COLORS } from "@/lib/constants";
import InputField from "./InputField";
import ResultRow from "./ResultRow";

interface ScenarioColumnProps {
  index: number;
  scenario: ScenarioInputs;
  clientData: ClientData;
  expertData: ExpertData;
  isSelected: boolean;
  onSelect: () => void;
  dispatch: Dispatch<AppAction>;
  currency: Currency;
  showExpertRows?: boolean;
}

export default function ScenarioColumn({ index, scenario, clientData, expertData, isSelected, onSelect, dispatch, currency, showExpertRows = true }: ScenarioColumnProps) {
  const results = computeScenarioResults(clientData, expertData, scenario.cpl);
  const colors = SCENARIO_COLORS[index];
  const label = SCENARIO_LABELS[index];
  const sym = currencySymbol(currency);

  return (
    <div
      onClick={onSelect}
      className={`rounded-lg border-2 ${colors.border} ${colors.bg} p-4 flex flex-col gap-3 cursor-pointer transition-all ${isSelected ? "ring-2 ring-offset-2 ring-blue-500 shadow-lg" : "hover:shadow-md"}`}
    >
      <div className={`-mx-4 -mt-4 px-4 py-2 rounded-t-lg ${colors.header}`}>
        <h3 className="text-sm font-bold text-gray-800 text-center">
          {label}
        </h3>
      </div>

      <div className="space-y-2" onClick={(e) => e.stopPropagation()}>
        <InputField
          label="Coût par lead"
          value={scenario.cpl}
          onChange={(value) => dispatch({ type: "UPDATE_SCENARIO_CPL", index, value })}
          unit={sym}
        />
      </div>

      <hr className="border-gray-200" />

      <div className="space-y-0">
        <ResultRow label="Leads" value={formatNumber(results.volumeLeads)} />
        {showExpertRows && (
          <>
            <ResultRow label="Prospects qualifiés" value={formatNumber(results.prospectsQualifies)} />
            <ResultRow label="Clients / mois" value={formatNumber(results.clientsMois)} />
          </>
        )}
        <ResultRow label="CA généré" value={formatCurrency(results.caGenere, currency)} />
        <ResultRow
          label="Profit généré"
          value={formatCurrency(results.profitGenere, currency)}
          colorMode="positive-negative"
          rawValue={results.profitGenere}
          bold
        />
      </div>
    </div>
  );
}
