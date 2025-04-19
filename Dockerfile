# Single stage build for simplicity
FROM node:20-alpine

WORKDIR /app

# Install pnpm and PostgreSQL client
RUN npm install -g pnpm && \
    apk add --no-cache postgresql-client

# Copy package files first (for better layer caching)
COPY package.json pnpm-lock.yaml ./

# Install dependencies with retry logic
RUN pnpm install --no-frozen-lockfile || \
    (sleep 3 && pnpm install --no-frozen-lockfile) || \
    (sleep 10 && pnpm install --no-frozen-lockfile)

# Copy application code
COPY . .

# Run the build
RUN pnpm build

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Expose the port
EXPOSE 3000

# Start the application
CMD ["pnpm", "start"] 


