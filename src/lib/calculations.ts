import { ClientData, ExpertData, ScenarioResults, MonthlyProjection } from "./types";

export function computeScenarioResults(
  clientData: ClientData,
  expertData: ExpertData,
  cpl: number
): ScenarioResults {
  if (cpl <= 0) {
    return { volumeLeads: 0, prospectsQualifies: 0, clientsMois: 0, caGenere: 0, profitGenere: 0 };
  }

  const volumeLeads = clientData.budgetAdsMensuel / cpl;
  const prospectsQualifies = volumeLeads * (expertData.tauxQualificationPercent / 100);
  const clientsMois = prospectsQualifies * (expertData.tauxClosingPercent / 100);
  const caGenere = clientsMois * clientData.panierMoyen;
  const profitGenere = caGenere * (clientData.margeNettePercent / 100);

  return { volumeLeads, prospectsQualifies, clientsMois, caGenere, profitGenere };
}

export function computeProjection6Months(monthlyResults: ScenarioResults): MonthlyProjection[] {
  return Array.from({ length: 6 }, (_, i) => ({
    mois: i + 1,
    leadsCumules: monthlyResults.volumeLeads * (i + 1),
    clientsCumules: monthlyResults.clientsMois * (i + 1),
    caCumule: monthlyResults.caGenere * (i + 1),
    profitCumule: monthlyResults.profitGenere * (i + 1),
  }));
}
