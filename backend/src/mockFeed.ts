import { WebSocketServer } from "ws";
import { PriceUpdate } from "../../shared/types";

const symbols = ["AAPL", "TSLA", "BTC", "ETH", "MSFT"];
// in-memory cache for historical data
const historyCache: Record<string, PriceUpdate[]> = {};

function emitRandom() {
  const symbol = symbols[Math.floor(Math.random() * symbols.length)];
  const price = +(100 + Math.random() * 500).toFixed(2);
  const update: PriceUpdate = { symbol, price, time: Date.now() };
  if (!historyCache[symbol]) historyCache[symbol] = [];
  historyCache[symbol].push(update);
  if (historyCache[symbol].length > 500) historyCache[symbol].shift();
  return update;
}

export function setupMockFeed(wss: WebSocketServer) {
  // emit initial snapshot
  symbols.forEach((s) => {
    const init = {
      symbol: s,
      price: +(100 + Math.random() * 500).toFixed(2),
      time: Date.now(),
    };
    if (!historyCache[s]) historyCache[s] = [];
    historyCache[s].push(init);
  });

  setInterval(() => {
    const u = emitRandom();
    const msg = JSON.stringify(u);
    wss.clients.forEach((c) => {
      if (c.readyState === 1) c.send(msg);
    });
  }, 1000);
}

export function getHistory(symbol: string) {
  return historyCache[symbol] || [];
}

export function listTickers() {
  return symbols.map((s) => {
    const hist = historyCache[s] || [];
    const latest = hist[hist.length - 1] || { price: 0, time: Date.now() };
    return { symbol: s, price: latest.price, time: latest.time };
  });
}
export const generateHistoricalData = (duration: string, ticker: string) => {
  const now = Date.now();
  const oneHourMs = 3600 * 1000;
  const oneDayMs = 24 * oneHourMs;

  // Number of points based on duration
  let points;
  let intervalMs;

  switch (duration) {
    case "1D": // hourly data points for last 24 hours
      points = 24;
      intervalMs = oneHourMs;
      break;
    case "7D": // daily points for 7 days
      points = 7;
      intervalMs = oneDayMs;
      break;
    case "1M": // daily points for 30 days
      points = 30;
      intervalMs = oneDayMs;
      break;
    case "6M": // daily points for 6 * 30 = 180 days approx
      points = 180;
      intervalMs = oneDayMs;
      break;
    case "1Y": // daily points for 365 days
      points = 365;
      intervalMs = oneDayMs;
      break;
    case "5Y": // daily points for 5*365=1825 days
      points = 1825;
      intervalMs = oneDayMs;
      break;
    case "ALL": // daily points for 5*365=1825 days
      points = 1825;
      intervalMs = oneDayMs;
      break;
    default:
      throw new Error("Unsupported duration");
  }

  const basePrice = 30000;
  let price = basePrice;
  let data = [];

for (let i = points - 1; i >= 0; i--) {
  const time = now - i * intervalMs;

  const changePercent = (Math.random() * 10 - 5) / 100;
  price = Math.max(1000, price * (1 + changePercent));

  data.push({
    time: duration === "1D"
      ? new Date(time).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false })
      : new Date(time).toISOString().slice(0, 10),
    price: parseFloat(price.toFixed(2)),
  });
}

  return data;
};
