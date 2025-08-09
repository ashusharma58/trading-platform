import { Request, Response } from 'express'
import { listTickers, getHistory } from './mockFeed'

export function getTickersHandler(req: Request, res: Response){
  res.json(listTickers())
}

export function getHistoryHandler(req: Request, res: Response){
  const symbol = (req.params.symbol || '').toUpperCase()
  const limit = parseInt(req.query.limit as string) || 200
  const data = getHistory(symbol).slice(-limit)
  res.json(data)
}
