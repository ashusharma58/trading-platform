import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { describe, it, expect, vi } from "vitest";
import tickerReducer, { setSelected } from "../../../api/slices/tickerSlice";
import TickerList from "../TickerList";

// Helper to render with a custom store
function renderWithStore(preloadedState: any, dispatchSpy?: any) {
  const store = configureStore({
    reducer: { tickers: tickerReducer },
    preloadedState,
  });

  // Spy on dispatch if needed
  if (dispatchSpy) {
    store.dispatch = dispatchSpy;
  }

  return render(
    <Provider store={store}>
      <TickerList />
    </Provider>
  );
}

describe("TickerList", () => {
  it("renders 'No data yet...' when no tickers", () => {
    renderWithStore({
      tickers: { data: {}, selected: "" },
    });

    expect(screen.getByText(/No data yet/i)).toBeInTheDocument();
  });

  it("renders ticker items", () => {
    renderWithStore({
      tickers: {
        data: {
          AAPL: { symbol: "AAPL", price: 150 },
          TSLA: { symbol: "TSLA", price: 700 },
        },
        selected: "",
      },
    });

    expect(screen.getByText("AAPL")).toBeInTheDocument();
    expect(screen.getByText("$150.00")).toBeInTheDocument();
    expect(screen.getByText("TSLA")).toBeInTheDocument();
    expect(screen.getByText("$700.00")).toBeInTheDocument();
  });

  it("dispatches setSelected when ticker clicked", () => {
    const dispatchSpy = vi.fn();

    renderWithStore(
      {
        tickers: {
          data: { BTC: { symbol: "BTC", price: 30000 } },
          selected: "",
        },
      },
      dispatchSpy
    );

    fireEvent.click(screen.getByText("BTC"));
    expect(dispatchSpy).toHaveBeenCalledWith(setSelected("BTC"));
  });

  it("applies 'active' class when ticker is selected", () => {
    renderWithStore({
      tickers: {
        data: { ETH: { symbol: "ETH", price: 2000 } },
        selected: "ETH",
      },
    });

    const ticker = screen.getByText("ETH").closest(".ticker-item");
    expect(ticker).toHaveClass("active");
  });
});
