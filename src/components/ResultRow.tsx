interface ResultRowProps {
  label: string;
  value: string;
  colorMode?: "positive-negative" | "none";
  rawValue?: number;
  bold?: boolean;
}

export default function ResultRow({ label, value, colorMode = "none", rawValue = 0, bold = false }: ResultRowProps) {
  let colorClass = "text-gray-900";
  if (colorMode === "positive-negative") {
    if (rawValue > 0) colorClass = "text-emerald-600";
    else if (rawValue < 0) colorClass = "text-red-600";
  }

  return (
    <div className="flex justify-between items-center py-1.5">
      <span className="text-sm text-gray-600">{label}</span>
      <span className={`text-sm ${bold ? "font-bold text-base" : "font-semibold"} ${colorClass}`}>
        {value}
      </span>
    </div>
  );
}
