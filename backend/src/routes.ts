import { Request, Response } from 'express'
import { listTickers, getHistory, generateHistoricalData } from './mockFeed'

export function getTickersHandler(req: Request, res: Response){
  res.json(listTickers())
}

export function getHistoryHandler(req: Request, res: Response){
  const symbol = (req.params.symbol || '').toUpperCase()
  const limit = parseInt(req.query.limit as string) || 200
  const data = getHistory(symbol).slice(-limit)
  res.json(data)
}

export const getHistoryWithRangeHandler = (req: Request, res: Response) => {
const { ticker, range } = req.query;
const duration = typeof range === 'string' ? range : '1D';

  try {
    const limit = parseInt(req.query.limit as string) || 200
     const mockData = generateHistoricalData(duration, ticker).slice(-limit); // Generate based on range
  res.json(mockData);
  } catch (e) {
    res.status(400).json({ error: 'Invalid duration' });
  }


}