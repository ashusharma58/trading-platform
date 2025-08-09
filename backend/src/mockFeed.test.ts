import { describe, it, expect } from 'vitest'
import { listTickers, getHistory } from './mockFeed'

describe('mockFeed', ()=>{
  it('returns tickers array', ()=>{
    const t = listTickers()
    expect(Array.isArray(t)).toBeTruthy()
  })
  it('history is array', ()=>{
    const h = getHistory('AAPL')
    expect(Array.isArray(h)).toBeTruthy()
  })
})
