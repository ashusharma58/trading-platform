import { createSlice, PayloadAction } from '@reduxjs/toolkit'
export type Ticker = { symbol: string; price: number; time: number }
interface TickerState { data: Record<string,Ticker>; selected: string }
const initialState: TickerState = { data: {}, selected: 'AAPL' }
const slice = createSlice({ name:'tickers', initialState, reducers:{
  updateTicker(state, action: PayloadAction<Ticker>){ state.data[action.payload.symbol] = action.payload },
  setSelected(state, action: PayloadAction<string>){ state.selected = action.payload }
}})
export const { updateTicker, setSelected } = slice.actions
export default slice.reducer
