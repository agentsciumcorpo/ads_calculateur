"use client";

import { useCalculator } from "@/hooks/useCalculator";
import ClientDataForm from "@/components/ClientDataForm";
import ScenarioTable from "@/components/ScenarioTable";
import RemunerationSection from "@/components/RemunerationSection";

export default function Home() {
  const { state, dispatch } = useCalculator();

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-gray-900">
          Calculateur de Rentabilité SMMA/IA
        </h1>
        <p className="text-sm text-gray-500 mt-1">Agentscium — Simulateur de scénarios</p>
      </header>

      <ClientDataForm clientData={state.clientData} dispatch={dispatch} />
      <ScenarioTable state={state} dispatch={dispatch} />
      <RemunerationSection state={state} dispatch={dispatch} />
    </main>
  );
}
