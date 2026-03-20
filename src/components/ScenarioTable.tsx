"use client";

import { Dispatch } from "react";
import { AppState, AppAction } from "@/lib/types";
import ScenarioColumn from "./ScenarioColumn";

interface ScenarioTableProps {
  state: AppState;
  dispatch: Dispatch<AppAction>;
}

export default function ScenarioTable({ state, dispatch }: ScenarioTableProps) {
  return (
    <section>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Scénarios</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 min-w-0">
        {state.scenarios.map((scenario, i) => (
          <ScenarioColumn
            key={i}
            index={i}
            scenario={scenario}
            clientData={state.clientData}
            dispatch={dispatch}
          />
        ))}
      </div>
    </section>
  );
}
