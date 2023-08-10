
FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app/client
COPY package*.json ./
RUN  npm install --production

FROM node:18-alpine AS builder
WORKDIR /app/client
COPY --from=deps /app/client/node_modules ./node_modules
COPY . .

RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app/client

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
RUN npm install --global pm2

COPY --from=builder --chown=nextjs:nodejs /app/client/.next ./.next
COPY --from=builder /app/client/node_modules ./node_modules
COPY --from=builder /app/client/package.json ./package.json
COPY --from=builder /app/client/next.config.js ./next.config.js

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD [ "pm2-runtime", "start", "npm", "--", "run", "start:prod"]