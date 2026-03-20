"use client";

import { Dispatch } from "react";
import { ClientData, AppAction } from "@/lib/types";
import InputField from "./InputField";

interface ClientDataFormProps {
  clientData: ClientData;
  dispatch: Dispatch<AppAction>;
}

export default function ClientDataForm({ clientData, dispatch }: ClientDataFormProps) {
  const update = (field: keyof ClientData) => (value: number) => {
    dispatch({ type: "UPDATE_CLIENT_DATA", field, value });
  };

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Données client</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <InputField label="Panier moyen" value={clientData.panierMoyen} onChange={update("panierMoyen")} unit="€" />
        <InputField label="% Profit" value={clientData.profitPercent} onChange={update("profitPercent")} unit="%" />
        <InputField label="% Lead → RDV" value={clientData.leadToRdvPercent} onChange={update("leadToRdvPercent")} unit="%" />
        <InputField label="% RDV → Vente" value={clientData.rdvToVentePercent} onChange={update("rdvToVentePercent")} unit="%" />
        <InputField label="Budget ads mensuel" value={clientData.budgetAdsMensuel} onChange={update("budgetAdsMensuel")} unit="€" />
        <InputField label="Frais d'installation" value={clientData.fraisInstallation} onChange={update("fraisInstallation")} unit="€" />
      </div>
    </section>
  );
}
