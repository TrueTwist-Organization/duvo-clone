# Duvo-style demo

Marketing site inspired by [duvo.ai](https://www.duvo.ai/) — Next.js frontend with a Three.js hero,
plus a CRM demo app. Single Next.js app, no separate backend server.

## Run

```bash
# 1) Install
npm install

# 2) Env
cp .env.example .env

# 3) Run
npm run dev
```

- Web: http://localhost:3000

## Stack

| Layer | Tech |
|-------|------|
| Frontend | Next.js (App Router) + Tailwind + Framer Motion |
| 3D | Three.js via `@react-three/fiber` |
| API | Next.js route handlers (`src/app/api/**`) |
| CRM data | In-memory store, seeded on boot (`src/lib/crm-store.ts`) — resets on restart |

## Scripts

- `npm run dev` — Next.js dev server
- `npm run build` — production build
- `npm run start` — run the production build
- `npm run lint` — eslint

## Deploy

Deployed via Hostinger's Node.js hosting panel, connected directly to this GitHub repo
(auto-deploy on push to `main`). Set environment variables in the Hostinger dashboard's
Environment Variables tab (see `.env.example` for the list). No Docker, SSH keys, or GitHub
Actions deploy pipeline needed.
