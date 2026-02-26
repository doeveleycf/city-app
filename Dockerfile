FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build Next.js
RUN pnpm build

# Expose ports
EXPOSE 3000 5000

# Start both Next.js and Express
CMD ["sh", "-c", "pnpm start & node server.ts"]
