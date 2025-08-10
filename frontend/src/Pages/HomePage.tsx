import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"; // path where your hook is stored
import TickerList from "../components/tickers/TickerList";
import TickerChart from "../components/charts/TickerChart";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { updateTicker } from "../api/slices/tickerSlice";
import { addChartData } from "../api/slices/chartSlice";
import { initWs } from '../api/services/wsClient'

const HomePage = () => {
  const { token, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>()

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }
  

  useEffect(()=>{
    const stop = initWs((update) => {
      dispatch(updateTicker(update))
      dispatch(addChartData({ symbol: update.symbol, point: { time: update.time, price: update.price } }))
    })
    return () => stop()
  }, [dispatch])



  return (
    <div style={{ padding: 20 }}>
          <div className="app">
      {/* <header><h1>Realtime Ticker Dashboard (Fullstack)</h1></header> */}
      <main className="container">
        <aside className="sidebar"><TickerList/></aside>
        <section className="content"><TickerChart/></section>
      </main>
    </div>
    </div>
  );
}
export default  HomePage