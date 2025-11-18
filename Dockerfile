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

# ===== Stage 2: Runtime (Medium, ~400–500MB) =====
FROM node:20-bullseye-slim

WORKDIR /usr/src/app

# Copy only prod dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Copy compiled output and minimal runtime files
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/wdio.conf.ts ./
COPY --from=builder /usr/src/app/src/config ./src/config
COPY --from=builder /usr/src/app/src/screens ./src/screens

# Expose Appium default port
EXPOSE 4723

# Entrypoint: install Appium & drivers dynamically, start Appium, then run tests
CMD ["sh", "-c", "\
  npm install -g appium appium-uiautomator2-driver allure-commandline && \
  appium & \
  wdio run wdio.conf.ts \
"]
