import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export default function TickerChart(){
  const selected = useSelector((s: RootState)=>s.tickers.selected)
  const history = useSelector((s: RootState)=>s.chart.history[selected]||[])
  const data = history.map(h => ({ ...h, timeLabel: new Date(h.time).toLocaleTimeString() }))
  return (
    <div>
      <h3 style={{marginTop:0}}>{selected} Price</h3>
      <div style={{width:'100%', height:320}}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <XAxis dataKey="timeLabel" minTickGap={20} />
            <YAxis domain={['auto','auto']} />
            <Tooltip labelFormatter={(l)=>`Time: ${l}`} />
            <Line type="monotone" dataKey="price" dot={false} stroke="#7c3aed" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
