"use client";

import { Dispatch } from "react";
import { Currency, AppAction } from "@/lib/types";

interface CurrencyToggleProps {
  currency: Currency;
  dispatch: Dispatch<AppAction>;
}

export default function CurrencyToggle({ currency, dispatch }: CurrencyToggleProps) {
  return (
    <div className="inline-flex rounded-lg border border-gray-300 overflow-hidden text-sm">
      <button
        onClick={() => dispatch({ type: "SET_CURRENCY", currency: "EUR" })}
        className={`px-3 py-1.5 font-medium transition-colors ${
          currency === "EUR"
            ? "bg-blue-600 text-white"
            : "bg-white text-gray-600 hover:bg-gray-50"
        }`}
      >
        € EUR
      </button>
      <button
        onClick={() => dispatch({ type: "SET_CURRENCY", currency: "CAD" })}
        className={`px-3 py-1.5 font-medium transition-colors ${
          currency === "CAD"
            ? "bg-blue-600 text-white"
            : "bg-white text-gray-600 hover:bg-gray-50"
        }`}
      >
        $CA
      </button>
    </div>
  );
}
