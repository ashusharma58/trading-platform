import express from 'express'
import { createServer } from 'http'
import { WebSocketServer } from 'ws'
import cors from 'cors'
import { setupMockFeed } from './mockFeed'
import { getTickersHandler, getHistoryHandler, getHistoryWithRangeHandler } from './routes'

const app = express()
app.use(cors())
app.use(express.json())

app.get('/tickers', getTickersHandler)
app.get('/history/:symbol', getHistoryHandler)
app.get("/history-range", getHistoryWithRangeHandler )

const server = createServer(app)
const wss = new WebSocketServer({ server, path: '/ws' })

wss.on('connection', (socket) => {
  console.log('client connected ws')
  // send nothing here; mockFeed will broadcast
})

setupMockFeed(wss) // starts emitting updates

const port = process.env.PORT || 4000
server.listen(port, ()=> console.log('Backend listening on', port))
