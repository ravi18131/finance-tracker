# ----------- Build stage -----------
FROM node:20-alpine AS builder

WORKDIR /app

# Install required dependencies
RUN apk add --no-cache python3 make g++

# Copy only necessary files first (optimizes caching)
COPY package*.json ./
COPY prisma ./prisma/

# Install all dependencies including dev
RUN npm ci --legacy-peer-deps

# Copy rest of the application code
COPY . .

# Generate Prisma client
RUN npm run db:generate

# Build TypeScript app
RUN npm run build

# ----------- Production stage -----------
FROM node:20-alpine

WORKDIR /app

# Copy only necessary package files and install production dependencies
COPY package*.json ./
RUN npm ci --only=production --legacy-peer-deps

# Copy built app and prisma client from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# Copy your environment config
COPY .env.production .env

RUN npm run db:generate

# Ensure production env is set
ENV NODE_ENV=production
ENV PORT=4012

# Expose port to ECS
EXPOSE 4012

# Start the app using node (more direct and safe in ECS)
CMD ["node", "dist/server.js"]
