# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* yarn.lock* ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Install serve to run the production build
RUN npm install -g serve

# Copy built files from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./

# Expose port
EXPOSE 5173

# Health check
HEALTHCHECK --interval=10s --timeout=5s --retries=5 \
    CMD wget --quiet --tries=1 --spider http://localhost:5173 || exit 1

# Start the application in development mode for hot reload during development
CMD ["npm", "run", "dev", "--", "--host"]
