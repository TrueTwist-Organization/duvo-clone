# CI/CD Setup — GitHub → Hostinger VPS

Push to GitHub and the app deploys itself. One-time setup below, then it's hands-off.

## How it works

1. Push to `main` or `develop` (or run the workflow manually).
2. GitHub Actions builds a Docker image (Next.js + Express + Prisma) and pushes it to
   GitHub Container Registry (`ghcr.io`) — free, no extra account needed.
3. Actions SSHes into your Hostinger VPS and runs `docker compose pull && up -d` with
   that exact image tag.
4. A health check hits `http://127.0.0.1:4000/health`; if it fails, the job fails and
   prints container logs.

Files involved:
- `Dockerfile` — production image for Next.js + Express + Prisma
- `.dockerignore` — keeps the build context small
- `docker-compose.prod.yml` — app + Postgres on the server
- `.github/workflows/deploy.yml` — the CI/CD pipeline
- `prisma/migrations/` — applied automatically via `prisma migrate deploy` on container start

Branch mapping:
| Branch | GitHub Environment | Typical use |
|---|---|---|
| `main` | `production` | live / demo2 |
| `develop` | `staging` | staging / demo1 |

---

## One-time VPS setup (run these on the Hostinger VPS)

SSH in as root or a sudo user, then run:

```bash
# 1) Install Docker + Compose plugin (Ubuntu/Debian)
curl -fsSL https://get.docker.com | sh
apt-get update
apt-get install -y docker-compose-plugin

# 2) Create a dedicated deploy user (do not deploy as root)
adduser --disabled-password --gecos "" deploy
usermod -aG docker deploy

# 3) Create the deploy directory
mkdir -p /opt/duvo-clone
chown deploy:deploy /opt/duvo-clone
```

### Place compose file on the server

From your laptop (or clone the repo once on the server):

```bash
# From your local machine, after this commit is on GitHub:
scp -P <SSH_PORT> docker-compose.prod.yml deploy@<SSH_HOST>:/opt/duvo-clone/
```

Or on the VPS:

```bash
su - deploy
cd /opt/duvo-clone
# Option A: copy just the compose file once (recommended)
# Option B: git clone and keep compose in sync manually when it changes
```

### Create `/opt/duvo-clone/.env.production` on the server

**Never commit this file.** Create it only on the VPS:

```bash
su - deploy
nano /opt/duvo-clone/.env.production
```

Template (fill in real values):

```bash
POSTGRES_USER=duvo
POSTGRES_PASSWORD=<generate-a-strong-password>
POSTGRES_DB=duvo
DATABASE_URL=postgresql://duvo:<same-password>@postgres:5432/duvo?schema=public

PORT=4000
CORS_ORIGIN=https://demo2.raufmedia.com
# Used by some tooling/docs; browser CRM/contact calls use same-origin Next.js /api routes.
NEXT_PUBLIC_API_URL=https://demo2.raufmedia.com
NEXT_PUBLIC_SITE_URL=https://demo2.raufmedia.com

GMAIL_USER=
GMAIL_APP_PASSWORD=
RESEND_API_KEY=
EMAIL_TO=
EMAIL_FROM=
MEET_LINK=
```

Notes:
- `DATABASE_URL` host must be `postgres` (the Docker Compose service name), not `localhost`.
- `NEXT_PUBLIC_*` values are baked into the **client bundle at image build time**. If you need
  different public API URLs per environment, either (a) build separate images per branch with
  build-args, or (b) keep the same public path pattern and only change CORS/server secrets here.
  For this repo, browser calls go to your domain `/api` via the reverse proxy, so the VPS
  `.env.production` CORS settings matter most at runtime for the Express API.

Lock down permissions:

```bash
chmod 600 /opt/duvo-clone/.env.production
chown deploy:deploy /opt/duvo-clone/.env.production
```

### Generate a deploy SSH key (on your laptop, not the server)

```bash
ssh-keygen -t ed25519 -f ./deploy_key -N "" -C "github-actions-deploy"
ssh-copy-id -i ./deploy_key.pub -p <SSH_PORT> deploy@<SSH_HOST>
```

Paste the **private** key (`deploy_key`) into GitHub secrets (below), then delete the local
key files:

```bash
rm ./deploy_key ./deploy_key.pub
```

### Reverse proxy + TLS (Caddy)

The app binds only to `127.0.0.1:3000` and `127.0.0.1:4000`. Put Caddy (or nginx) in front:

```bash
apt-get install -y caddy
```

`/etc/caddy/Caddyfile` (production example):

```
demo2.raufmedia.com {
    # Express API only (do NOT send all /api/* here — Next.js owns /api/crm/* etc.)
    handle /health {
        reverse_proxy localhost:4000
    }
    handle /api/leads* {
        reverse_proxy localhost:4000
    }
    handle {
        reverse_proxy localhost:3000
    }
}
```

If you prefer Express to own contact as well, add `handle /api/contact*` → `4000`, and stop using the Next.js contact route.

```bash
systemctl reload caddy
```

Use a second Caddy site block / second VPS for staging (`demo1.raufmedia.com`) with its own
`.env.production` and GitHub Environment secrets.

### Optional: allow the VPS to pull private GHCR images

If the package is private, create a GitHub PAT with `read:packages` and add it as
`GHCR_TOKEN` (plus `GHCR_USERNAME`) in each Environment. The deploy job will
`docker login ghcr.io` on the VPS before pull.

Alternatively, make the package public:
Repo → Packages → package settings → Change visibility → Public.

---

## GitHub setup

### 1. Create Environments

Repo → **Settings → Environments** → create:
- `production`
- `staging`

Put **different** SSH/host secrets in each environment if demo1 and demo2 are different servers.

### 2. Environment secrets (required)

Add these under **each** Environment (`production` and `staging`):

| Secret | Example / value |
|---|---|
| `SSH_HOST` | VPS IP or hostname |
| `SSH_PORT` | `22` (or your custom SSH port) |
| `SSH_USER` | `deploy` |
| `SSH_PRIVATE_KEY` | Full contents of `deploy_key` (private key) |
| `DEPLOY_PATH` | `/opt/duvo-clone` |

### 3. Optional Environment secrets (private GHCR)

| Secret | Value |
|---|---|
| `GHCR_USERNAME` | Your GitHub username (or org bot account) |
| `GHCR_TOKEN` | PAT with `read:packages` (and `write:packages` if needed) |

`GITHUB_TOKEN` for **pushing** the image from Actions is automatic — nothing to add for that.

### 4. First push / first deploy

```bash
git add Dockerfile .dockerignore docker-compose.prod.yml \
  .github/workflows/deploy.yml DEPLOYMENT.md package.json package-lock.json \
  prisma/migrations
git commit -m "Add Docker-based CI/CD to Hostinger VPS"
git push origin main
```

Also create and push `develop` if you want staging:

```bash
git checkout -b develop
git push -u origin develop
```

Watch the run under the repo **Actions** tab.

Manual deploy: **Actions → Build and Deploy → Run workflow** → pick `staging` or `production`.

---

## Commands you run on the Hostinger VPS (checklist)

Run these **once** (or when compose/env changes):

```bash
# Install Docker
curl -fsSL https://get.docker.com | sh
apt-get install -y docker-compose-plugin

# Deploy user + directory
adduser --disabled-password --gecos "" deploy
usermod -aG docker deploy
mkdir -p /opt/duvo-clone
chown deploy:deploy /opt/duvo-clone

# Place files (as deploy)
# - /opt/duvo-clone/docker-compose.prod.yml
# - /opt/duvo-clone/.env.production   (chmod 600)

# Reverse proxy
apt-get install -y caddy
# edit /etc/caddy/Caddyfile then:
systemctl reload caddy
```

Day-to-day: **you do not SSH to deploy**. Push to GitHub; Actions does the rest.

Useful debug commands on the VPS:

```bash
su - deploy
cd /opt/duvo-clone
docker compose -f docker-compose.prod.yml --env-file .image.env --env-file .env.production ps
docker compose -f docker-compose.prod.yml --env-file .image.env --env-file .env.production logs -f app
curl -fsS http://127.0.0.1:4000/health
```

---

## Original Hostinger checklist → where it lives now

| Item | Where it lives |
|---|---|
| Server IP/hostname | `SSH_HOST` environment secret |
| SSH port | `SSH_PORT` |
| SSH username | `SSH_USER` (`deploy`) |
| OS/version | Ubuntu 22.04/24.04 assumed |
| Project path | `DEPLOY_PATH` (`/opt/duvo-clone`) |
| Deployment method | Docker Compose via GitHub Actions |
| Prod / staging | GitHub Environments + `main` / `develop` |
| Domain name | Caddy/nginx + `CORS_ORIGIN` / `NEXT_PUBLIC_API_URL` |
| App env vars | `/opt/duvo-clone/.env.production` on the VPS |
| SSH auth | Ed25519 deploy key only |

---

## Notes specific to this repo

- Needs a **VPS** (Node + Docker). Hostinger shared hosting cannot run this stack.
- On container start: `prisma migrate deploy` then `next start` + `tsx server/index.ts`.
- Health endpoint: `GET /health` on the Express API (port 4000).
- Local Postgres for development still uses `docker-compose.yml` (dev-only passwords).
- Do not commit `.env`, `.env.production`, or SSH private keys.
