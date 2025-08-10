import React from "react";

export type ChartRange = "1D" | "7D" | "1M" | "6M" | "1Y" | "5Y" | "ALL" | "";

interface ChartFiltersProps {
  selectedRange: ChartRange;
  onChange: (range: ChartRange) => void;
}

const ranges: ChartRange[] = ["1D", "7D", "1M", "6M", "1Y", "5Y", "ALL"];

export const ChartFilters: React.FC<ChartFiltersProps> = ({ selectedRange, onChange }) => {
  return (
    <div style={{ display: "flex", gap: "8px", marginBottom: "1rem" }}>
      {ranges.map((range) => (
        <button
          key={range}
          onClick={() => onChange(range)}
          style={{
            padding: "6px 12px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            background: selectedRange === range ? "#007bff" : "#f9f9f9",
            color: selectedRange === range ? "#fff" : "#000",
            cursor: "pointer",
          }}
        >
          {range}
        </button>
      ))}
    </div>
  );
};
