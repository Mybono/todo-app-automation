# ==================================
# ===== Stage 1: Builder (Builds & Installs)
# ==================================
FROM node:20-bullseye AS builder

# Working directory
WORKDIR /usr/src/app

# Copy package.json and install all dependencies (dev + prod)
# Installing here creates the /usr/src/app/node_modules folder
COPY package*.json ./
RUN npm install

# Copy source and config
COPY tsconfig.json ./
COPY src ./src
COPY wdio.conf.ts ./

# Build TypeScript
# This compiles .ts files to .js files in the /dist folder
RUN npm run build

# ==================================
# ===== Stage 2: Runtime (Test Runner)
# ==================================
FROM node:20-bullseye-slim

WORKDIR /usr/src/app

# 1. Copy dependencies (node_modules) from the builder stage
# This avoids the slow and redundant 'npm install' command
COPY --from=builder /usr/src/app/node_modules ./node_modules

# 2. Copy compiled output and minimal runtime files (package.json is necessary for context)
COPY package*.json ./
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/wdio.conf.ts ./

# 3. Copy entire src folder (needed because wdio.conf.ts imports from it)
COPY --from=builder /usr/src/app/src ./src

# Install global Appium tools required for the runtime
RUN npm install -g appium appium-uiautomator2-driver @wdio/cli allure-commandline

# Expose Appium port
EXPOSE 4723

# Entrypoint: Start Appium in the background and run the tests
CMD ["sh", "-c", "appium & wdio run wdio.conf.ts"]