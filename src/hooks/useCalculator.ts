"use client";

import { useReducer } from "react";
import { AppState, AppAction } from "@/lib/types";
import { DEFAULT_CLIENT_DATA, DEFAULT_EXPERT_DATA, DEFAULT_SCENARIOS } from "@/lib/constants";

const initialState: AppState = {
  clientData: DEFAULT_CLIENT_DATA,
  expertData: DEFAULT_EXPERT_DATA,
  scenarios: DEFAULT_SCENARIOS,
  selectedScenario: null,
};

function reducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "UPDATE_CLIENT_DATA":
      return {
        ...state,
        clientData: { ...state.clientData, [action.field]: action.value },
      };
    case "UPDATE_EXPERT_DATA":
      return {
        ...state,
        expertData: { ...state.expertData, [action.field]: action.value },
      };
    case "UPDATE_SCENARIO_CPL": {
      const scenarios = [...state.scenarios] as AppState["scenarios"];
      scenarios[action.index] = { cpl: action.value };
      return { ...state, scenarios };
    }
    case "SELECT_SCENARIO":
      return { ...state, selectedScenario: action.index };
    default:
      return state;
  }
}

export function useCalculator() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return { state, dispatch };
}
