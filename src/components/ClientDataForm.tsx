"use client";

import { Dispatch } from "react";
import { ClientData, ExpertData, AppAction, Currency } from "@/lib/types";
import { currencySymbol } from "@/lib/format";
import InputField from "./InputField";

interface ClientDataFormProps {
  clientData: ClientData;
  expertData: ExpertData;
  dispatch: Dispatch<AppAction>;
  currency: Currency;
  showExpertData?: boolean;
}

export default function ClientDataForm({ clientData, expertData, dispatch, currency, showExpertData = true }: ClientDataFormProps) {
  const updateClient = (field: keyof ClientData) => (value: number) => {
    dispatch({ type: "UPDATE_CLIENT_DATA", field, value });
  };

  const updateExpert = (field: keyof ExpertData) => (value: number) => {
    dispatch({ type: "UPDATE_EXPERT_DATA", field, value });
  };

  const sym = currencySymbol(currency);

  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Données client</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <InputField label="Budget ads mensuel" value={clientData.budgetAdsMensuel} onChange={updateClient("budgetAdsMensuel")} unit={sym} />
          <InputField label="Panier moyen" value={clientData.panierMoyen} onChange={updateClient("panierMoyen")} unit={sym} />
          <InputField label="Marge nette" value={clientData.margeNettePercent} onChange={updateClient("margeNettePercent")} unit="%" />
        </div>
      </section>

      {showExpertData && (
        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Expertise IA</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField label="Taux qualification IA" value={expertData.tauxQualificationPercent} onChange={updateExpert("tauxQualificationPercent")} unit="%" />
            <InputField label="Taux closing IA" value={expertData.tauxClosingPercent} onChange={updateExpert("tauxClosingPercent")} unit="%" />
          </div>
        </section>
      )}
    </div>
  );
}
