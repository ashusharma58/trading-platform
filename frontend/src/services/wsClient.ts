import type { PriceUpdate } from '../../shared/types'

let ws: WebSocket | null = null

export function initWs(onMessage: (u: PriceUpdate) => void){
  const url = (import.meta.env.VITE_WS_URL) || 'ws://localhost:4000/ws'
  try {
    ws = new WebSocket(url)
    ws.onmessage = (ev) => {
      try { const data = JSON.parse(ev.data); onMessage(data) } catch(e) {}
    }
    ws.onopen = () => console.log('ws open', url)
    ws.onclose = () => console.log('ws closed')
  } catch(e){ console.error(e) }

  // fallback: if ws not connected, optionally return a no-op
  return () => { if(ws){ ws.close(); ws = null } }
}
