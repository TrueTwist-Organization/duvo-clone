# syntax=docker/dockerfile:1

# ---- deps: install once, reused by build ----
FROM node:20-alpine AS deps
WORKDIR /app
RUN apk add --no-cache libc6-compat openssl
COPY package.json package-lock.json ./
RUN npm ci

# ---- build: compile Next.js + generate Prisma client ----
FROM node:20-alpine AS build
WORKDIR /app
RUN apk add --no-cache libc6-compat openssl
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# DATABASE_URL is only required at runtime; provide a placeholder so prisma.config.ts loads.
ENV DATABASE_URL="postgresql://duvo:duvo@localhost:5432/duvo?schema=public"
RUN npx prisma generate
RUN npm run build

# ---- runtime: slim image, only what's needed to run ----
FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=4000

# Non-root user; wget is used by the compose healthcheck; openssl for Prisma engines
RUN addgroup -g 1001 -S nodejs \
  && adduser -S nextjs -u 1001 \
  && apk add --no-cache wget libc6-compat openssl

COPY package.json package-lock.json ./
# Install production deps only (tsx/concurrently/dotenv are in dependencies)
RUN npm ci --omit=dev && npm cache clean --force

# Build output + everything needed to run Next + Express + Prisma migrate
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/src/generated ./src/generated
COPY --from=build /app/next.config.ts ./next.config.ts
COPY --from=build /app/server ./server
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/prisma.config.ts ./prisma.config.ts
COPY --from=build /app/tsconfig.json ./tsconfig.json

USER nextjs

# Next.js web on 3000, Express API on 4000 (matches .env.example)
EXPOSE 3000 4000

# Apply pending migrations, then start both processes.
CMD ["sh", "-c", "npx prisma migrate deploy && npm run start:prod"]
