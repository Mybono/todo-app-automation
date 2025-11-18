# ===== Stage 1: Builder =====
FROM node:20-bullseye AS builder

# Working directory
WORKDIR /usr/src/app

# Copy package.json and install all dependencies (dev + prod)
COPY package*.json ./
RUN npm install

# Copy source and config
COPY tsconfig.json ./
COPY src ./src
COPY wdio.conf.ts ./

# Build TypeScript
RUN npm run build

# ===== Stage 2: Runtime (Medium, ~450MB) =====
FROM node:20-bullseye-slim

WORKDIR /usr/src/app

# Copy all dependencies including dev (we need wdio)
COPY package*.json ./
RUN npm install

# Copy compiled output and minimal runtime files
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/wdio.conf.ts ./

# Copy entire src folder to include utils and everything else
COPY --from=builder /usr/src/app/src ./src

# Install global tools
RUN npm install -g appium appium-uiautomator2-driver @wdio/cli allure-commandline

# Expose Appium port
EXPOSE 4723

# Entrypoint
CMD ["sh", "-c", "appium & wdio run wdio.conf.ts"]
