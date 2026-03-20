export interface ClientData {
  budgetAdsMensuel: number;
  panierMoyen: number;
  margeNettePercent: number;
}

export interface ExpertData {
  tauxQualificationPercent: number;
  tauxClosingPercent: number;
}

export interface ScenarioInputs {
  cpl: number;
}

export interface ScenarioResults {
  volumeLeads: number;
  prospectsQualifies: number;
  clientsMois: number;
  caGenere: number;
  profitGenere: number;
}

export interface MonthlyProjection {
  mois: number;
  leadsCumules: number;
  clientsCumules: number;
  caCumule: number;
  profitCumule: number;
}

export interface AppState {
  clientData: ClientData;
  expertData: ExpertData;
  scenarios: [ScenarioInputs, ScenarioInputs, ScenarioInputs];
  selectedScenario: number | null;
  currency: Currency;
}

export type Currency = "EUR" | "CAD";

export type AppAction =
  | { type: "UPDATE_CLIENT_DATA"; field: keyof ClientData; value: number }
  | { type: "UPDATE_EXPERT_DATA"; field: keyof ExpertData; value: number }
  | { type: "UPDATE_SCENARIO_CPL"; index: number; value: number }
  | { type: "SELECT_SCENARIO"; index: number }
  | { type: "SET_CURRENCY"; currency: Currency };
