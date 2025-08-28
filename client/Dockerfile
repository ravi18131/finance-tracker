# Build stage
FROM node:23-alpine AS builder

WORKDIR /app

COPY package*.json ./

# Install dependencies, ignoring peer dep conflicts
# RUN npm install --legacy-peer-deps

# Install dependencies, Use one of the below. Prefer `npm ci` if you have a lock file.
RUN npm ci --legacy-peer-deps

COPY . .

RUN npm run build

# Production stage
FROM nginx:alpine

# Copy the built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 4011

CMD ["nginx", "-g", "daemon off;"]