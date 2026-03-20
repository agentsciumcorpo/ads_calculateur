"use client";

import { useCalculator } from "@/hooks/useCalculator";
import { computeScenarioResults, computeProjection6Months } from "@/lib/calculations";
import { SCENARIO_LABELS } from "@/lib/constants";
import ClientDataForm from "@/components/ClientDataForm";
import ScenarioTable from "@/components/ScenarioTable";
import Projection6Months from "@/components/Projection6Months";

export default function Home() {
  const { state, dispatch } = useCalculator();

  const selectedIndex = state.selectedScenario;
  const projection = selectedIndex !== null
    ? computeProjection6Months(
        computeScenarioResults(state.clientData, state.expertData, state.scenarios[selectedIndex].cpl)
      )
    : null;

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-gray-900">
          Simulateur de Profit — Pubs Meta + IA
        </h1>
        <p className="text-sm text-gray-500 mt-1">Montrez à vos clients combien de profit ils vont générer</p>
      </header>

      <ClientDataForm clientData={state.clientData} expertData={state.expertData} dispatch={dispatch} />
      <ScenarioTable state={state} dispatch={dispatch} />

      {projection && selectedIndex !== null && (
        <Projection6Months
          projections={projection}
          scenarioLabel={SCENARIO_LABELS[selectedIndex]}
        />
      )}
    </main>
  );
}
