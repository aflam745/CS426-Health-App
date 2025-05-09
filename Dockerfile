# Dockerfile (repo root)

# 1. Build stage

FROM node:22-alpine AS builder
WORKDIR /app

# Copy project into the image
COPY . .

# Install all deps 
RUN npm ci

# Build the Vite front end
RUN npm run build      # this will look for vite.config.ts, index.html, public/, src/, etc.

# 2. Serve stage
FROM node:22-alpine AS serve
WORKDIR /app

# Attach only the built assets
COPY --from=builder /app/dist ./dist

# Serve them
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
