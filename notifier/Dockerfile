#Dockerfile for Notifier service

FROM node:20-alpine
# Set the working directory
WORKDIR /app

# Copy dependency manifests and install only production dependencies
COPY package.json package-lock.json ./
RUN npm ci --only=production

# Copy the rest of the application code
COPY . .

# Build/transpile the source code (e.g., TypeScript → JavaScript in dist/)
RUN npm run build

# Define the command to run the compiled worker when the container starts
CMD ["node", "dist/index.js"]
