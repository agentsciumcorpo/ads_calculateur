export interface ClientData {
  panierMoyen: number;
  profitPercent: number;
  leadToRdvPercent: number;
  rdvToVentePercent: number;
  budgetAdsMensuel: number;
  fraisInstallation: number;
}

export interface ScenarioInputs {
  cpl: number;
  leadToRdvOverride: number;
  rdvToVenteOverride: number;
}

export interface ScenarioResults {
  volumeLeads: number;
  volumeRdv: number;
  volumeTransactions: number;
  caGenere: number;
  profitGenere: number;
}

export interface RemunerationResults {
  commissionPerformance: number;
  remunerationTotale: number;
  coutMarketingTotal: number;
  profitNetSupplementaire: number;
  probabilite50: number;
}

export interface AppState {
  clientData: ClientData;
  scenarios: [ScenarioInputs, ScenarioInputs, ScenarioInputs, ScenarioInputs, ScenarioInputs];
  commissionPercent: number;
}

export type AppAction =
  | { type: "UPDATE_CLIENT_DATA"; field: keyof ClientData; value: number }
  | { type: "UPDATE_SCENARIO"; index: number; field: keyof ScenarioInputs; value: number }
  | { type: "UPDATE_COMMISSION"; value: number };
