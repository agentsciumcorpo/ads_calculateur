import { ClientData, ExpertData, ScenarioInputs } from "./types";

export const DEFAULT_CLIENT_DATA: ClientData = {
  budgetAdsMensuel: 1000,
  panierMoyen: 250,
  margeNettePercent: 60,
};

export const DEFAULT_EXPERT_DATA: ExpertData = {
  tauxQualificationPercent: 50,
  tauxClosingPercent: 30,
};

export const DEFAULT_SCENARIOS: [ScenarioInputs, ScenarioInputs, ScenarioInputs] = [
  { cpl: 8 },
  { cpl: 5 },
  { cpl: 3 },
];

export const SCENARIO_LABELS = ["Prudent", "Réaliste", "Optimiste"] as const;

export const SCENARIO_COLORS = [
  { bg: "bg-amber-50", border: "border-amber-300", header: "bg-amber-100" },
  { bg: "bg-blue-50", border: "border-blue-300", header: "bg-blue-100" },
  { bg: "bg-emerald-50", border: "border-emerald-300", header: "bg-emerald-100" },
] as const;
