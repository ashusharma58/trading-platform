// TickerChart.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { describe, it, expect, vi } from "vitest";
import TickerChart from "../TickerChart";
import tickersReducer from "../../../api/slices/tickerSlice";
import chartReducer from "../../../api/slices/chartSlice";

// Helper: render with mock Redux state
function renderWithStore(preloadedState: any) {
  const store = configureStore({
    reducer: {
      tickers: tickersReducer,
      chart: chartReducer,
    },
    preloadedState,
  });

  return render(
    <Provider store={store}>
      <TickerChart />
    </Provider>
  );
}

describe("TickerChart", () => {
  it("renders selected ticker title", () => {
    renderWithStore({
      tickers: { selected: "AAPL" },
      chart: {
        history: {
          AAPL: [
            { time: Date.now(), price: 150 },
            { time: Date.now() + 1000, price: 151 },
          ],
        },
      },
    });

    expect(screen.getByText(/AAPL Price/i)).toBeInTheDocument();
  });

  it("renders chart filters", () => {
    renderWithStore({
      tickers: { selected: "TSLA" },
      chart: { history: { TSLA: [] } },
    });

    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(7); // "1D", "7D", etc.
    expect(buttons[0]).toHaveTextContent("1D");
  });

  it("changes range when filter clicked", () => {
    renderWithStore({
      tickers: { selected: "BTC" },
      chart: { history: { BTC: [] } },
    });

    const sevenDayBtn = screen.getByRole("button", { name: "7D" });
    fireEvent.click(sevenDayBtn);

    // This checks UI style change (because selectedRange updates)
    expect(sevenDayBtn).toHaveStyle({ background: "#007bff" });
  });
});
