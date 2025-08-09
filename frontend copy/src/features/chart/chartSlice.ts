import { createSlice, PayloadAction } from '@reduxjs/toolkit'
export type ChartPoint = { time:number; price:number }
interface ChartState { history: Record<string, ChartPoint[]> }
const initialState: ChartState = { history: {} }
const slice = createSlice({ name:'chart', initialState, reducers:{
  addChartData(state, action: PayloadAction<{symbol:string; point:ChartPoint}>){
    const {symbol, point} = action.payload
    if(!state.history[symbol]) state.history[symbol]=[]
    state.history[symbol].push(point)
    if(state.history[symbol].length>60) state.history[symbol].shift()
  }
}})
export const { addChartData } = slice.actions
export default slice.reducer
