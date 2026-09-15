# Duvo-style demo

Marketing site inspired by [duvo.ai](https://www.duvo.ai/) — Next.js frontend, Express (Node) API, PostgreSQL, Three.js hero.

## Run

```bash
# 1) Install
npm install

# 2) Env
cp .env.example .env

# 3) Postgres (optional — API falls back to memory if DB is down)
docker compose up -d
npm run db:push

# 4) App + API together
npm run dev
```

- Web: http://localhost:3000  
- API: http://localhost:4000/health  

## Stack

| Layer | Tech |
|-------|------|
| Frontend | Next.js (App Router) + Tailwind + Framer Motion |
| 3D | Three.js via `@react-three/fiber` |
| Backend | Express on Node (`server/index.ts`) |
| DB | PostgreSQL + Prisma |

## Scripts

- `npm run dev` — Next + Express
- `npm run dev:web` / `npm run dev:api` — separately
- `npm run db:push` — sync Prisma schema to Postgres
