"use client";

import { useReducer } from "react";
import { AppState, AppAction } from "@/lib/types";
import { DEFAULT_CLIENT_DATA, DEFAULT_SCENARIOS, DEFAULT_COMMISSION_PERCENT } from "@/lib/constants";

const initialState: AppState = {
  clientData: DEFAULT_CLIENT_DATA,
  scenarios: DEFAULT_SCENARIOS,
  commissionPercent: DEFAULT_COMMISSION_PERCENT,
};

function reducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "UPDATE_CLIENT_DATA":
      return {
        ...state,
        clientData: { ...state.clientData, [action.field]: action.value },
      };
    case "UPDATE_SCENARIO": {
      const scenarios = [...state.scenarios] as AppState["scenarios"];
      scenarios[action.index] = { ...scenarios[action.index], [action.field]: action.value };
      return { ...state, scenarios };
    }
    case "UPDATE_COMMISSION":
      return { ...state, commissionPercent: action.value };
    default:
      return state;
  }
}

export function useCalculator() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return { state, dispatch };
}
