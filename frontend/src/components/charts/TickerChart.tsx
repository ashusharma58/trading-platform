import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChartFilters, ChartRange } from "./ChartsFilters";
import { initWs } from "../../api/services/wsClient";
type ChartPoint = {
  timeLabel: string;
  time: number;
  price: number;
};
const TickerChart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedTicker = useSelector((s: RootState) => s.tickers.selected);
  const history = useSelector(
    (s: RootState) => s.chart.history[selectedTicker] || []
  );
  const data = history.map((h) => ({
    ...h,
    timeLabel: new Date(h.time).toLocaleTimeString(),
  }));

  const [range, setRange] = useState<ChartRange | "">("");
  const [filteredRangeData, setFilteredRangeData] = useState<
    { time: number | string; price: number }[]
  >([]);

  useEffect(() => {
    if (range !== "") {
      getFilteredDataWithRange();
    }
  }, [range, selectedTicker]);
  const getFilteredDataWithRange = async () => {
    try {
      const res = await fetch(
        `http://localhost:4000/history-range?range=${range}&ticker=${selectedTicker}`
      );
      const data = await res.json();
      setFilteredRangeData(data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <h3 style={{ marginTop: 0 }}>{selectedTicker} Price</h3>
      <div style={{ width: "100%", height: 320 }}>
        <ChartFilters selectedRange={range} onChange={setRange} />
        <ResponsiveContainer>
          <LineChart data={range !== "" ? filteredRangeData : data}>
            <XAxis
              dataKey={range !== "" ? "time" : "timeLabel"}
              minTickGap={20}
            />
            <YAxis domain={["auto", "auto"]} />
            <Tooltip labelFormatter={(l) => `Time: ${l}`} />
            <Line
              type="monotone"
              dataKey="price"
              dot={false}
              stroke="#7c3aed"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default TickerChart