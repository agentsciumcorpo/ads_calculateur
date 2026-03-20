import { ClientData, ScenarioInputs } from "./types";

export const DEFAULT_CLIENT_DATA: ClientData = {
  panierMoyen: 5000,
  profitPercent: 30,
  leadToRdvPercent: 30,
  rdvToVentePercent: 10,
  budgetAdsMensuel: 1000,
  fraisInstallation: 1500,
};

export const DEFAULT_SCENARIOS: [ScenarioInputs, ScenarioInputs, ScenarioInputs, ScenarioInputs, ScenarioInputs] = [
  { cpl: 10, leadToRdvOverride: 30, rdvToVenteOverride: 10 },
  { cpl: 20, leadToRdvOverride: 30, rdvToVenteOverride: 10 },
  { cpl: 50, leadToRdvOverride: 30, rdvToVenteOverride: 10 },
  { cpl: 70, leadToRdvOverride: 30, rdvToVenteOverride: 10 },
  { cpl: 100, leadToRdvOverride: 20, rdvToVenteOverride: 10 },
];

export const DEFAULT_COMMISSION_PERCENT = 10;

export const SCENARIO_LABELS = ["Excellent", "Bon", "Moyen", "Difficile", "Pessimiste"] as const;

export const SCENARIO_COLORS = [
  { bg: "bg-emerald-50", border: "border-emerald-300", header: "bg-emerald-100" },
  { bg: "bg-emerald-50/60", border: "border-emerald-200", header: "bg-emerald-50" },
  { bg: "bg-amber-50", border: "border-amber-200", header: "bg-amber-100" },
  { bg: "bg-orange-50", border: "border-orange-200", header: "bg-orange-100" },
  { bg: "bg-red-50", border: "border-red-200", header: "bg-red-100" },
] as const;
