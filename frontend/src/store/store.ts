import { configureStore } from "@reduxjs/toolkit";
import tickerReducer from "../api/slices/tickerSlice";
import chartReducer from "../api/slices/chartSlice";
import authReducer from "../api/slices/authSlice";

export const store = configureStore({
  reducer: { tickers: tickerReducer, chart: chartReducer, auth: authReducer },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
