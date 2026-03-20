import { ClientData, ScenarioInputs, ScenarioResults, RemunerationResults } from "./types";

export function computeScenarioResults(
  clientData: ClientData,
  scenario: ScenarioInputs
): ScenarioResults {
  if (scenario.cpl <= 0) {
    return { volumeLeads: 0, volumeRdv: 0, volumeTransactions: 0, caGenere: 0, profitGenere: 0 };
  }

  const volumeLeads = clientData.budgetAdsMensuel / scenario.cpl;
  const volumeRdv = volumeLeads * (scenario.leadToRdvOverride / 100);
  const volumeTransactions = volumeRdv * (scenario.rdvToVenteOverride / 100);
  const caGenere = volumeTransactions * clientData.panierMoyen;
  const profitGenere = caGenere * (clientData.profitPercent / 100);

  return { volumeLeads, volumeRdv, volumeTransactions, caGenere, profitGenere };
}

export function computeRemunerationResults(
  scenarioResults: ScenarioResults,
  clientData: ClientData,
  commissionPercent: number
): RemunerationResults {
  const commissionPerformance = scenarioResults.profitGenere * (commissionPercent / 100);
  const remunerationTotale = commissionPerformance + clientData.fraisInstallation;
  const coutMarketingTotal = clientData.budgetAdsMensuel + commissionPerformance;
  const profitNetSupplementaire = scenarioResults.profitGenere - coutMarketingTotal;
  const probabilite50 = profitNetSupplementaire * 0.5;

  return { commissionPerformance, remunerationTotale, coutMarketingTotal, profitNetSupplementaire, probabilite50 };
}
