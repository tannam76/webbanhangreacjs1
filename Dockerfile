# Build stage
FROM node:18.20.8-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the app
RUN npm run build

# Production stage
FROM node:18.20.8-alpine

WORKDIR /app

# Install serve to run the production build
RUN npm install -g serve

# Copy built application from builder stage
COPY --from=builder /app/build ./build

# Expose port
EXPOSE 3000

# Set NODE_OPTIONS for memory management
ENV NODE_OPTIONS=--max-old-space-size=1536

# Start the application
CMD ["serve", "-s", "build", "-l", "tcp://0.0.0.0:3000"]
