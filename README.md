# Realtime Ticker Dashboard — Fullstack (Frontend + Backend)

This repository contains a fullstack implementation for the **Real-Time Trading Dashboard** coding challenge:
- **Frontend**: React 18 + TypeScript + Redux Toolkit + Recharts (Vite)
- **Backend**: Node.js + TypeScript microservice (Express + ws) that simulates a market data feed
- **Containerization**: Dockerfiles for frontend and backend, plus docker-compose for local development
- **Tests**: Vitest for frontend, simple unit tests using Vitest for backend logic
- **Bonus**: Cached historical data (in-memory), alerting hooks (simple implementation), Kubernetes manifests (example)

## Project structure
```
/ (root)
├─ frontend/      # React + TS app (Vite) — realtime UI
├─ backend/       # Node.js + TS microservice (REST + WebSocket)
├─ docker-compose.yml
├─ k8s/           # example Kubernetes manifests (optional)
└─ README.md
```

## Quick start (with Docker Compose)
Make sure Docker and Docker Compose are installed.

```bash
# from repo root
docker-compose up --build
# Frontend -> http://localhost:5173
# Backend (REST) -> http://localhost:4000
# Backend (WebSocket) -> ws://localhost:4000/ws
```

## Local dev (without Docker)
### Backend
```bash
cd backend
npm install
npm run dev
# API: http://localhost:4000/tickers
# History: http://localhost:4000/history/AAPL
# WebSocket: ws://localhost:4000/ws
```

### Frontend
```bash
cd frontend
npm install
npm run dev
# UI: http://localhost:5173
```

## Tests
### Frontend tests
```
cd frontend
npm run test
```
### Backend tests
```
cd backend
npm run test
```

## Assumptions & trade-offs
- Backend simulates market feed in-memory and returns mocked historical data.
- Persistence, authentication, and production-grade resiliency are out-of-scope for time constraints; examples/configs are included for extension.
- TLS, auth, and real exchange integration are omitted but easy to add later.

## Notes on bonus features
- Caching for historical data: backend keeps an in-memory cache and returns cached results for repeated historical queries.
- Alerting: simple threshold checks are available in the frontend where you can add alerts for tickers (demo only).
- Kubernetes manifests provided under `/k8s` as examples for deployment.

## Additional Features Implemented

### 1. WebSocket Reconnection Logic
- The frontend WebSocket client now automatically retries connection with exponential backoff when the server disconnects.
- Ensures real-time updates resume after temporary network issues.

### 2. Mocked Authentication
- Simple login form with mock username/password validation.
- Stores a JWT-like token in localStorage (mocked).
- Protects dashboard routes with a basic `PrivateRoute` wrapper.

### 3. Alerting UI for Price Thresholds
- Users can set upper/lower price thresholds for any ticker.
- Visual + sound alert when the threshold is crossed.

### 4. Enhanced UI/UX
- Dark mode toggle (persistent between sessions).
- Smooth animations using Framer Motion.
- Percent change badges next to each ticker in the list.

### 5. End-to-End Tests (Cypress)
- Added `/cypress` tests to simulate login, navigate between tickers, and verify chart updates.
