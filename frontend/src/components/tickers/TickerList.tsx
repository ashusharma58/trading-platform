import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '../../store/store'
import { setSelected } from '../../api/slices/tickerSlice'

const TickerList = () => {
  const { data, selected } = useSelector((s: RootState)=>s?.tickers)
  const dispatch = useDispatch<AppDispatch>()
  const items = Object.values(data)
  return (
    <div>
      <h3 style={{marginTop:0}}>Tickers</h3>
      <div className="ticker-list">
        {items.length===0 && <div style={{color:'#94a3b8'}}>No data yet...</div>}
        {items.map(t => (
          <div key={t.symbol} className={`ticker-item ${selected===t.symbol?'active':''}`}
               onClick={()=>dispatch(setSelected(t.symbol))}>
            <div>{t.symbol}</div>
            <div style={{fontFamily:'monospace'}}>${t.price.toFixed(2)}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default TickerList