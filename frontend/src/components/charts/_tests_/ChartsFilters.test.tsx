import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ChartFilters, ChartRange } from "../ChartsFilters";

describe("ChartFilters", () => {
  it("renders all chart range buttons", () => {
    const mockChange = vi.fn();
    render(<ChartFilters selectedRange="1D" onChange={mockChange} />);

    const ranges: ChartRange[] = ["1D", "7D", "1M", "6M", "1Y", "5Y", "ALL"];

    ranges.forEach((range) => {
      expect(screen.getByRole("button", { name: range })).toBeInTheDocument();
    });
  });

  it("applies selected style to the active range", () => {
    const mockChange = vi.fn();
    render(<ChartFilters selectedRange="1M" onChange={mockChange} />);

    const selectedButton = screen.getByRole("button", { name: "1M" });
    expect(selectedButton).toHaveStyle({
      background: "#007bff",
      color: "#fff",
    });

    const nonSelectedButton = screen.getByRole("button", { name: "7D" });
    expect(nonSelectedButton).toHaveStyle({
      background: "#f9f9f9",
      color: "#000",
    });
  });

  it("calls onChange with correct range when a button is clicked", () => {
    const mockChange = vi.fn();
    render(<ChartFilters selectedRange="1D" onChange={mockChange} />);

    const button = screen.getByRole("button", { name: "6M" });
    fireEvent.click(button);

    expect(mockChange).toHaveBeenCalledTimes(1);
    expect(mockChange).toHaveBeenCalledWith("6M");
  });
});
