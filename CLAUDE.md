# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project overview

Marketing site clone inspired by duvo.ai: a single Next.js (App Router) app with a Three.js hero
plus a CRM demo. There is no separate backend server — everything is Next.js route handlers.

## Commands

```bash
npm run dev     # Next.js dev server (port 3000)
npm run build   # production build
npm run start   # run the production build
npm run lint    # eslint
```

There is no test runner configured in this repo.

## Architecture

### Single app, in-memory data

All API routes live under `src/app/api/` (`crm/*`, `contact`) and share one process-local,
non-persistent store: `src/lib/crm-store.ts` (`globalThis.__duvoCrmStore`), seeded on first
access via `ensureSeeded()`. This is the entire "database" — leads, users, invoices, payments,
activities, and a log of sent emails — and it **resets whenever the process restarts**. There is
no Postgres/Prisma and no separate Express server; those existed earlier in this repo's history
but were unused by the actual frontend and have been removed. If you're asked to add persistence,
that's new work, not restoring old code.

### CRM auth

`src/lib/crm-auth.ts` implements CRM session auth independently of any real auth provider:
a JWT (via `jose`) is signed with `CRM_AUTH_SECRET` (falls back to an insecure dev default if
unset) and stored in an httpOnly cookie (`duvo_crm_session`). Roles are `ADMIN` / `SALES` /
`ACCOUNTING` (see `src/lib/crm-types.ts`); `requireRole()` gates access. Seeded demo users and
their plaintext passwords live in `ensureSeeded()` in `crm-store.ts` (e.g.
`admin@duvo.ai` / `admin123`).

### Email

`src/lib/email.ts` picks a delivery mode at send time, in priority order: Gmail SMTP
(`GMAIL_APP_PASSWORD` set) → Resend (`RESEND_API_KEY` set) → `mock` (logs to console only).
On the free Resend tier, mail can only be delivered to the owner inbox — that's why
`sendLeadEmails()` always sends the full confirmation to `ownerEmail()` and only *additionally*
emails the actual customer/guests when Gmail SMTP is configured (`hasGmailSmtp()`). Every send
attempt is recorded to `store.emails` (visible at `/crm/emails`) regardless of mode or outcome.

### Frontend structure

- `src/app/` — App Router pages; most marketing pages are thin wrappers that pass content into
  shared layout components (`PageShell`, `LegalPage`, `OutcomePage`, `StoryPage`) rather than
  each owning bespoke layout.
- `src/app/crm/**` — CRM demo UI, each route paired with a `*-client.tsx` for the interactive
  parts, fetching the `/api/crm/*` route handlers.
- `src/components/automation/` — the animated automation/orb scene (Three.js/`@react-three/fiber`
  + hand-rolled scene math in `live-scene-math.ts`), used on the automation/home hero.
- `src/components/ui/` — shadcn/radix-ui primitives (see `components.json`: style `radix-nova`,
  aliases `@/components`, `@/lib`, `@/components/ui`). Generate/update these via the shadcn CLI
  rather than hand-rolling new primitives.

### Deployment

Deployed via Hostinger's Node.js hosting panel, connected directly to this GitHub repo with
auto-deploy on push to `main`. There's no Docker image, SSH deploy key, or GitHub Actions deploy
job — Hostinger builds and runs the Next.js app itself. Environment variables (see
`.env.example`) are set in the Hostinger dashboard, not in a committed `.env.production`.
`.github/workflows/ci.yml` only runs `npm ci && npm run build` as a PR/push sanity check.

## Planned next step: real backend

Decided direction for replacing the in-memory `crm-store.ts` with a production-grade backend:

- **Database**: Neon or Supabase (Postgres) — not yet chosen between the two, and not yet wired
  up. Prisma/Drizzle would sit on top for schema + queries.
- **Auth**: Clerk, replacing the hand-rolled `src/lib/crm-auth.ts` JWT/bcrypt session system.
- **Email**: Resend as the sole provider, replacing the current Gmail-SMTP/Resend/mock fallback
  chain in `src/lib/email.ts`.

None of this is implemented yet — `crm-store.ts` is still the live data layer as of this note.
When picking this up, treat it as a real migration (schema design, auth session/role mapping from
`CrmRole`, data seeding) rather than a drop-in swap.
