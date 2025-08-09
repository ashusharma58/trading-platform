import { WebSocketServer } from 'ws'
import { PriceUpdate } from '../../shared/types'

const symbols = ['AAPL','TSLA','BTC','ETH','MSFT']
// in-memory cache for historical data
const historyCache: Record<string, PriceUpdate[]> = {}

function emitRandom(){
  const symbol = symbols[Math.floor(Math.random()*symbols.length)]
  const price = +(100 + Math.random()*500).toFixed(2)
  const update: PriceUpdate = { symbol, price, time: Date.now() }
  if(!historyCache[symbol]) historyCache[symbol] = []
  historyCache[symbol].push(update)
  if(historyCache[symbol].length>500) historyCache[symbol].shift()
  return update
}

export function setupMockFeed(wss: WebSocketServer){
  // emit initial snapshot
  symbols.forEach(s => {
    const init = { symbol: s, price: +(100+Math.random()*500).toFixed(2), time: Date.now() }
    if(!historyCache[s]) historyCache[s] = []
    historyCache[s].push(init)
  })

  setInterval(()=>{
    const u = emitRandom()
    const msg = JSON.stringify(u)
    wss.clients.forEach(c => { if(c.readyState===1) c.send(msg) })
  }, 1000)
}

export function getHistory(symbol: string){
  return historyCache[symbol] || []
}

export function listTickers(){
  return symbols.map(s => {
    const hist = historyCache[s] || []
    const latest = hist[hist.length-1] || { price: 0, time: Date.now() }
    return { symbol: s, price: latest.price, time: latest.time }
  })
}
