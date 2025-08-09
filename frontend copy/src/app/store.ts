import { configureStore } from '@reduxjs/toolkit'
import tickerReducer from '../features/tickers/tickerSlice'
import chartReducer from '../features/chart/chartSlice'

export const store = configureStore({ reducer: { tickers: tickerReducer, chart: chartReducer } })
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
