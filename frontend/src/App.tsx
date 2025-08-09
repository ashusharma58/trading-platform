import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from './app/store'
import { initWs } from './services/wsClient'
import { updateTicker } from './features/tickers/tickerSlice'
import { addChartData } from './features/chart/chartSlice'
import TickerList from './features/tickers/TickerList'
import TickerChart from './features/chart/TickerChart'

export default function App(){
  const dispatch = useDispatch<AppDispatch>()

  useEffect(()=>{
    const stop = initWs((update) => {
      dispatch(updateTicker(update))
      dispatch(addChartData({ symbol: update.symbol, point: { time: update.time, price: update.price } }))
    })
    return () => stop()
  }, [dispatch])

  return (
    <div className="app">
      <header><h1>Realtime Ticker Dashboard (Fullstack)</h1></header>
      <main className="container">
        <aside className="sidebar"><TickerList/></aside>
        <section className="content"><TickerChart/></section>
      </main>
    </div>
  )
}
